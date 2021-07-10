import { Request, Response, NextFunction } from "express";
import { Comment } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export class CommentGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		if (!Comment.can(req.user!, res.comment!, "create")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		if (!Comment.can(req.user!, res.comment!, "delete")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		if (!Comment.can(req.user!, res.comment!, "edit")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}
}
