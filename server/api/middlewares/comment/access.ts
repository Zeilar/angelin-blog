import { Request, Response, NextFunction } from "express";
import errorlog from "../../../utils/errorlog";
import { CommentPolicy, CommentAction } from "../../policies";

function can(res: Response, action: CommentAction) {
	try {
		const authorized = new CommentPolicy(res.user, res.comment).can(action);

		if (!authorized) {
			res.status(403).end();
			return false;
		}

		return true;
	} catch (error) {
		errorlog(error);
		res.status(500).end();
		return null;
	}
}

export function canCreateComment(req: Request, res: Response, next: NextFunction) {
	if (can(res, "create")) next();
}

export function canDeleteComment(req: Request, res: Response, next: NextFunction) {
	if (can(res, "delete")) next();
}

export function canEditComment(req: Request, res: Response, next: NextFunction) {
	if (can(res, "edit")) next();
}
