import "reflect-metadata";
import "dotenv/config";
import express from "express";
import path from "path";
import { app } from "../bootstrap";

const { PORT } = process.env;

app.use(express.static(path.join(__dirname, "../../ui")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../ui/index.html"));
});

try {
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} catch (error) {
	console.log("exit");
	process.exit(1);
}
