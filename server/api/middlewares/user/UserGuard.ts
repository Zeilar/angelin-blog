import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export class UserGuard {
	public static async delete(req: Request, res: Response, next: NextFunction) {
		if (!User.can(req.user!, res.user!, "delete")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}

	public static async edit(req: Request, res: Response, next: NextFunction) {
		if (!User.can(req.user!, res.user!, "edit")) {
			res.status(403).json({ error: ErrorMessages.FORBIDDEN });
			return;
		}
		next();
	}
}
