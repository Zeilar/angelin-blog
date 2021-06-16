import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import errorlog from "../../../utils/errorlog";

export async function getUserOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		if (id) {
			const user = await User.query().findById(id).withGraphFetched(User.relationships);
			if (!user) return res.status(404).end();
			res.user = user;
		} else {
			res.users = await User.query().withGraphFetched(User.relationships);
		}
		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
