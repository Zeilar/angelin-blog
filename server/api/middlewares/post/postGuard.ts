import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";

export class PostGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		if (Post.can(res.user!, res.post!, "create")) {
			return next();
		}
		res.status(403).end();
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		if (Post.can(res.user!, res.post!, "delete")) {
			return next();
		}
		res.status(403).end();
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		if (Post.can(res.user!, res.post!, "edit")) {
			return next();
		}
		res.status(403).end();
	}
}
