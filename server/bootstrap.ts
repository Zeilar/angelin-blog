import { Container } from "inversify";
import knex from "knex";
import { Model } from "objection";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { json, urlencoded } from "body-parser";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";

import errorlog from "./utils/errorlog";
import * as services from "./services";
import { User } from "./db/models";
import { development } from "../knexfile";
import { UserRepository } from "./repositories";
import { ErrorMessages } from "./api/utils";

import "./api/controllers";

const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7,
	oneWeekFromNow = new Date(new Date().getTime() + WEEK_IN_MILLISECONDS);

function bootstrap() {
	Model.knex(knex(development));
	const container = new Container();

	// Repositories
	container.bind(UserRepository).toSelf();

	// Services
	container.bind(services.PostService).toSelf();
	container.bind(services.UserService).toSelf();
	container.bind(services.CommentService).toSelf();
	container.bind(services.AuthService).toSelf();
	container.bind(services.ValidateService).toSelf();

	const server = new InversifyExpressServer(container);

	server.setConfig(app => {
		app.use(
			urlencoded({ extended: true }),
			json(),
			session({
				secret: process.env.SESSION_SECRET,
				resave: false,
				saveUninitialized: true,
				cookie: { expires: oneWeekFromNow, httpOnly: true },
			}),
			passport.initialize(),
			passport.session(),
			rateLimit({
				windowMs: 1000 * 60 * 10, // 10 minutes
				max: 1000,
				handler: (req, res) => {
					res.status(429).send({ error: "Too many requests, try again later." });
				},
			}),
			cors({
				origin: "*", // TODO: change in production?
				credentials: true,
			})
		);
	});

	server.setErrorConfig(app => {
		app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
			errorlog(error);
			res.status(500).json({ error: ErrorMessages.DEFAULT });
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
