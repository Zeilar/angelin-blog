import { Request, Response, NextFunction } from "express";
import errorlog from "../../../utils/errorlog";
import { PostPolicy, PostAction } from "../../policies";

export class PostGuard {
	private static can(res: Response, action: PostAction) {
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

	public static create(req: Request, res: Response, next: NextFunction) {
		if (PostGuard.can(res, "create")) next();
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		if (PostGuard.can(res, "delete")) next();
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		if (PostGuard.can(res, "edit")) next();
	}
}
