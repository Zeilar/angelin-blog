import { Request, Response, NextFunction } from "express";
import errorlog from "../../../utils/errorlog";
import PostPolicy, { Action } from "../../policies/PostPolicy";

function can(res: Response, action: Action) {
	try {
		const authorized = new PostPolicy(res.user, res.post).can(action);

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

export function canCreatePost(req: Request, res: Response, next: NextFunction) {
	if (can(res, "create")) next();
}

export function canDeletePost(req: Request, res: Response, next: NextFunction) {
	if (can(res, "delete")) next();
}

export function canEditPost(req: Request, res: Response, next: NextFunction) {
	if (can(res, "edit")) next();
}
