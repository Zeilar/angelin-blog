require("dotenv").config();
require("../db/bootstrap")();
const express = require("express");
const app = express();
const session = require("express-session");
const { PORT, SESSION_SECRET } = process.env;

const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const tagsRoutes = require("./routes/tagsRoutes");
const { Post } = require("../db/models/Post");
const { Comment } = require("../db/models/Comment");
const { User } = require("../db/models/User");

// Middlewares
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/tags", tagsRoutes);

app.get("/test", async (req, res) => {
	const s = await User.query().withGraphFetched({
		posts: {
			comments: true,
		},
	});
	res.json(s);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
