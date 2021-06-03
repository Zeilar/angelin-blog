import "dotenv/config";
import bootstrap from "../db/bootstrap";
import express, { Express } from "express";
import { loggedIn } from "./middlewares/auth";
import session from "express-session";
import { ENV } from "../types/env";
import path from "path";
import cors from "cors";

bootstrap();
const app: Express = express();
const { PORT, SESSION_SECRET }: ENV = process.env;

import usersRoutes from "./routes/usersRoutes";
import postsRoutes from "./routes/postsRoutes";
import commentsRoutes from "./routes/commentsRoutes";

const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
const oneWeekFromNow: Date = new Date(new Date().getTime() + WEEK_IN_MILLISECONDS);

// Middlewares
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
		cookie: {
			expires: oneWeekFromNow,
		},
	})
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", loggedIn, commentsRoutes);

// app.use(express.static(path.join(__dirname, "../../build/ui")));

// app.get("/*", (req: Request, res: Response) => {
// 	res.sendFile(path.join(__dirname, "../../build/ui/index.html"));
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
