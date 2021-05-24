require("dotenv").config();
require("../db/bootstrap")();
const express = require("express");
const app = express();
const session = require("express-session");
const { PORT, SESSION_SECRET } = process.env;

const usersRoutes = require("./routes/usersRoutes");

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
