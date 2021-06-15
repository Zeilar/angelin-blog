import { Request, Response, NextFunction } from "express";
import errorlog from "../../../utils/errorlog";
import TagPolicy, { Action } from "../../policies/TagPolicy";

function can(res: Response, action: Action) {
	try {
		const authorized = new TagPolicy(res.user, res.tag).can(action);

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

export function canCreateTag(req: Request, res: Response, next: NextFunction) {
	if (can(res, "create")) next();
}

export function canDeleteTag(req: Request, res: Response, next: NextFunction) {
	if (can(res, "delete")) next();
}
