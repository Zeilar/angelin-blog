import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { getPortPromise } from "portfinder";

import errorlog from "../utils/errorlog";
import { app } from "../bootstrap";
import { NumberHelpers } from "./utils";

(async () => {
	try {
		const port = await getPortPromise({ port: NumberHelpers.int(process.env.PORT) });
		app.listen(port, () => console.log(`Listening on port ${port}`));
	} catch (error) {
		errorlog(error);
	}
})();

const uiPath = path.join(__dirname, "../../ui");

app.use(express.static(uiPath));

app.get("/*", (req, res) => {
	res.sendFile(`${uiPath}/index.html`);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	errorlog(error);
	res.status(500).json({ error: "Could not find ui build." });
});
