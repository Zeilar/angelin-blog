import { Container } from "inversify";
import knex from "knex";
import { Model } from "objection";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { json, urlencoded } from "body-parser";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import cookieParser from "cookie-parser";
import path from "path";

import errorlog from "./utils/errorlog";
import * as services from "./services";
import { User } from "./db/models";
import { development } from "../knexfile";
import { PasswordResetRepository, UserRepository } from "./repositories";
import { DateHelpers, ErrorMessages } from "./api/utils";

import "./api/controllers";

type GitHubProfile = Profile & { _json: any };

const { GITHUB_CLIENT, GITHUB_SECRET, GITHUB_CALLBACK, PORT, SESSION_SECRET } = process.env;
const uiPath = path.join(__dirname, "../../ui");

function bootstrap() {
	Model.knex(knex(development));

	const container = new Container();

	// Repositories
	container.bind(UserRepository).toSelf();
	container.bind(PasswordResetRepository).toSelf();

	// Services
	container.bind(services.PostService).toSelf();
	container.bind(services.UserService).toSelf();
	container.bind(services.CommentService).toSelf();
	container.bind(services.AuthService).toSelf();
	container.bind(services.ValidateService).toSelf();
	container.bind(services.MailService).toSelf();

	const server = new InversifyExpressServer(container);

	server.setConfig(app => {
		app.use(
			cookieParser(),
			urlencoded({ extended: true }),
			cors({
				origin: "http://localhost:3000",
				credentials: true,
			}),
			json(),
			session({
				secret: SESSION_SECRET,
				resave: false,
				saveUninitialized: false,
				cookie: {
					maxAge: DateHelpers.DAY_IN_MILLISECONDS * 7,
					httpOnly: true,
					secure: false, // TODO: setup env variable for is prod
					sameSite: "strict",
				},
			}),
			rateLimit({
				windowMs: DateHelpers.MINUTE_IN_MILLISECONDS * 10,
				max: 1000,
				handler: (req, res) => {
					res.status(429).send({ error: "Too many requests, try again later." });
				},
			}),
			passport.initialize(),
			passport.session()
		);
	});

	const userRepository = container.get(UserRepository);

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser<User>(async ({ id }, done) => {
		done(null, await userRepository.findById(id));
	});

	passport.use(
		new GitHubStrategy(
			{
				clientID: GITHUB_CLIENT,
				clientSecret: GITHUB_SECRET,
				callbackURL: GITHUB_CALLBACK,
			},
			async (
				accessToken: string,
				refreshToken: string,
				profile: GitHubProfile,
				done: (err: Error | null, profile: GitHubProfile | User | null) => void
			) => {
				if (!profile) return done(new Error(ErrorMessages.DEFAULT), null);

				let user = await userRepository.findOne("github_id", profile.id);

				if (!user) {
					if ((await userRepository.countWhere("email", profile._json.email)) > 0) {
						return done(new Error(ErrorMessages.EMAIL_TAKEN), null);
					}

					user = await userRepository.create({
						email: profile._json.email,
						avatar: profile._json.avatar_url,
						github_id: profile.id,
					});
				}

				done(null, user);
			}
		)
	);

	server.setErrorConfig(app => {
		app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
			errorlog(error);
			res.status(500).json({ error: ErrorMessages.DEFAULT });
		});
	});

	// Runs Monday-Saturday 00:00
	cron.schedule("0 0 * * 1-6", async () => {
		await container.get(PasswordResetRepository).deleteInactive();
	});

	const app = server.build();

	app.use(express.static(uiPath));

	app.get("/*", (req, res) => {
		res.sendFile(`${uiPath}/index.html`);
	});

	app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
		errorlog(error);
		res.status(500).json({ error: "Could not find ui build." });
	});

	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

bootstrap();
