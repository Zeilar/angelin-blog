import { User } from "../../../db/models";
import { Request, Response, NextFunction } from "express";

export class AuthGuard {
	public static async user(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.isAuthenticated()) {
				return res.status(401).end();
			}
			res.user = await User.query().findById(req.user);
			next();
		} catch (error) {
			res.status(500).end();
		}
	}

	public static async admin(req: Request, res: Response, next: NextFunction) {
		if (!res.user?.is_admin) {
			return res.status(403).end();
		}
		next();
	}
}
