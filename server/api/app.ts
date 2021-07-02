import "dotenv/config";
import bootstrap from "../db/bootstrap";
import express, { Request, Response } from "express";
import { AuthGuard } from "./middlewares";
import session from "express-session";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "passport";
import * as routes from "./routes";
import { User } from "../db/models";

const limiter = rateLimit({
	windowMs: 1000 * 60 * 10, // 10 minutes
	max: 1000,
	handler: (req, res) => {
		res.status(429).send({ error: "Too many requests, try again later." });
	},
});

bootstrap();
const app = express();
const { PORT, SESSION_SECRET, GITHUB_CLIENT, GITHUB_SECRET } = process.env;

const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
const oneWeekFromNow = new Date(new Date().getTime() + WEEK_IN_MILLISECONDS);

// Global middlewares
app.use(limiter);
app.use(
	cors({
		origin: "*", // TODO: change in production?
		credentials: true,
	})
);
app.use(express.json());
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

// No reason to repeat these in every OAuth service
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser<User>(async (user, done) => {
	done(null, await User.query().findById(user.id));
});

// Routes
app.use("/api/oauth", routes.oauth);
app.use("/api/users", routes.usersRoutes);
app.use("/api/posts", routes.postsRoutes);
app.use("/api/comments", AuthGuard.user, routes.commentsRoutes);

app.use(express.static(path.join(__dirname, "../../ui")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../ui/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
