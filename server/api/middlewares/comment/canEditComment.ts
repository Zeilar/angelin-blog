import { Request, Response, NextFunction } from "express";
import errorlog from "../../../utils/errorlog";
import CommentPolicy from "../../policies/CommentPolicy";

export async function canEditComment(req: Request, res: Response, next: NextFunction) {
	try {
		const authorized = new CommentPolicy(res.user, res.comment).can("edit");

		if (!authorized) {
			res.status(403).end();
			return;
		}

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
