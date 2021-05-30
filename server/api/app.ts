import "dotenv/config";
import bootstrap from "../db/bootstrap";
import express from "express";
import { Express } from "express";
import { loggedIn } from "./middlewares/auth";
import session from "express-session";

bootstrap();
const app: Express = express();
const { PORT, SESSION_SECRET } = process.env;

import usersRoutes from "./routes/usersRoutes";
import postsRoutes from "./routes/postsRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import { User } from "../db/models/User";

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

app.get("/test", async (req, res: any) => {
	res.json(await User.query().findById(1));
});

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", loggedIn, commentsRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
