import { Request, Response, NextFunction } from "express";
import { Comment } from "../../../db/models";

export class CommentGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		if (Comment.can(req.user!, res.comment!, "create")) {
			return next();
		}
		res.status(403).end();
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		if (Comment.can(req.user!, res.comment!, "delete")) {
			return next();
		}
		res.status(403).end();
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		if (Comment.can(req.user!, res.comment!, "edit")) {
			return next();
		}
		res.status(403).end();
	}
}
