import { Request, Response, NextFunction } from "express";

export class AuthGuard {
	public static async user(req: Request, res: Response, next: NextFunction) {
		if (!req.isAuthenticated()) {
			return res.status(401).end();
		}
		next();
	}

	public static async admin(req: Request, res: Response, next: NextFunction) {
		if (!req.user?.is_admin) {
			return res.status(403).end();
		}
		next();
	}
}
