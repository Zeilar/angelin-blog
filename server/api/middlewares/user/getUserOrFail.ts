import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../../repositories";
import errorlog from "../../../utils/errorlog";

export async function getUserOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(400).json({ error: "Expected id query parameter." });
		}

		const user = await new UserRepository().findById(id);
		if (!user) return res.status(404).end();
		res.user = user;

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
