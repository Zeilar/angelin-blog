import { Request, Response, NextFunction } from "express";

export class PostGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		if (res.post?.can(res.user!, "create")) {
			return next();
		}
		res.status(403).end();
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		if (res.post?.can(res.user!, "delete")) {
			return next();
		}
		res.status(403).end();
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		if (res.post?.can(res.user!, "edit")) {
			return next();
		}
		res.status(403).end();
	}
}
