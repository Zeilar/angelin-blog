import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import errorlog from "../../../utils/errorlog";

export class UserGuard {
	public static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			if (User.can(req.user!, res.user!, "delete")) {
				return next();
			}
			res.status(403).end();
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async edit(req: Request, res: Response, next: NextFunction) {
		try {
			if (User.can(req.user!, res.user!, "edit")) {
				return next();
			}
			res.status(403).end();
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}
}
