import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import errorlog from "../../../utils/errorlog";

export async function getUserOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		if (!id) {
			return res.status(400).json({ error: "Expected id query parameter." });
		}

		const user = await User.query().findById(id).withGraphFetched(User.relationships);
		console.log("find user by id", id, user);
		if (!user) return res.status(404).end();
		res.user = user;

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
