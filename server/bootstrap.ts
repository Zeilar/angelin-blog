import { Container } from "inversify";
import knex from "knex";
import { Model } from "objection";
import { development } from "../knexfile";
import { UserRepository } from "./repositories";
import { AuthService, CommentService, PostService, UserService, ValidateService } from "./services";
import { User } from "./db/models";
import { InversifyExpressServer } from "inversify-express-utils";
import { json, urlencoded } from "body-parser";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";
import errorlog from "./utils/errorlog";
import cors from "cors";

import "./api/controllers/UserController";
import "./api/controllers/PostController";
import "./api/controllers/CommentController";
import "./api/controllers/GitHubController";

const { SESSION_SECRET } = process.env,
	WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7,
	oneWeekFromNow = new Date(new Date().getTime() + WEEK_IN_MILLISECONDS);

function bootstrap() {
	Model.knex(knex(development));

	const container = new Container();

	// Repositories
	container.bind(UserRepository).toSelf();

	// Services
	container.bind(PostService).toSelf();
	container.bind(UserService).toSelf();
	container.bind(CommentService).toSelf();
	container.bind(AuthService).toSelf();
	container.bind(ValidateService).toSelf();

	const server = new InversifyExpressServer(container);

	server.setConfig(app => {
		app.use(
			urlencoded({
				extended: true,
			})
		);
		app.use(json());
		app.use(
			session({
				secret: SESSION_SECRET!,
				resave: false,
				saveUninitialized: true,
				cookie: { expires: oneWeekFromNow, httpOnly: true },
			})
		);
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(
			rateLimit({
				windowMs: 1000 * 60 * 10, // 10 minutes
				max: 1000,
				handler: (req, res) => {
					res.status(429).send({ error: "Too many requests, try again later." });
				},
			})
		);
		app.use(
			cors({
				origin: "*", // TODO: change in production?
				credentials: true,
			})
		);
	});

	server.setErrorConfig(app => {
		app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
			console.log("crashed");
			errorlog(error);
			res.status(500).end();
		});
	});

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser<User>(async ({ id }, done) => {
		done(null, await new UserRepository().findById(id));
	});

	return server.build();
}

export const app = bootstrap();
