import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export class PostGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		if (!Post.can(req.user!, res.post!, "create")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		if (!Post.can(req.user!, res.post!, "delete")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		if (!Post.can(req.user!, res.post!, "edit")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}
}
