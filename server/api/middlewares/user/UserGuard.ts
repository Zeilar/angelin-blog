import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";

export class UserGuard {
	public static async delete(req: Request, res: Response, next: NextFunction) {
		if (!User.can(req.user!, res.user!, "delete")) {
			return res.status(403).end();
		}
		next();
	}

	public static async edit(req: Request, res: Response, next: NextFunction) {
		if (!User.can(req.user!, res.user!, "edit")) {
			return res.status(403).end();
		}
		next();
	}
}
