import { HTTPError } from "./../../../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export class UserGuard {
	public static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			if (!User.can(req.user!, res.user!, "delete")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static async edit(req: Request, res: Response, next: NextFunction) {
		try {
			if (!User.can(req.user!, res.user!, "edit")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}
}
