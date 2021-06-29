import "dotenv/config";
import bootstrap from "../db/bootstrap";
import express, { Request, Response } from "express";
import { AuthGuard } from "./middlewares";
import session from "express-session";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { usersRoutes, postsRoutes, commentsRoutes } from "./routes";

const limiter = rateLimit({
	windowMs: 1000 * 60 * 10, // 10 minutes
	max: 1000,
	handler: (req, res) => {
		res.status(429).send({ error: "Too many requests, try again later." });
	},
});

bootstrap();
const app = express();
const { PORT, SESSION_SECRET } = process.env;

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
		cookie: { expires: oneWeekFromNow },
	})
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", AuthGuard.user, commentsRoutes);

app.use(express.static(path.join(__dirname, "../../ui")));

app.get("/*", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../../ui/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
