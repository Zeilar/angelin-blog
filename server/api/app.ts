import "dotenv/config";
import bootstrap from "../db/bootstrap";
import express, { Express, Response } from "express";
import { admin, loggedIn } from "./middlewares/auth";
import session from "express-session";
import { ENV } from "../../types/env";

bootstrap();
const app: Express = express();
const { PORT, SESSION_SECRET }: ENV = process.env;

import usersRoutes from "./routes/usersRoutes";
import postsRoutes from "./routes/postsRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import { getPostOrFail } from "./middlewares/post/request";

const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
const oneWeekFromNow: Date = new Date(new Date().getTime() + WEEK_IN_MILLISECONDS);

// Middlewares
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			expires: oneWeekFromNow,
		},
	})
);

app.get("/test/:id", getPostOrFail, async (req: any, res: Response) => {
	res.json(res.post);
});

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", loggedIn, commentsRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
