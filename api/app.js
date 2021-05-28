require("dotenv").config();
require("../db/bootstrap")();
const express = require("express");
const app = express();
const session = require("express-session");
const { PORT, SESSION_SECRET } = process.env;
const { loggedIn } = require("./middlewares/auth");

const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;

// Middlewares
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		expires: new Date(new Date().getTime() + WEEK_IN_MILLISECONDS),
	})
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", loggedIn, commentsRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
