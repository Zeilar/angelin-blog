import { HTTPError } from "./../../../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { ErrorMessages } from "../../utils";

export class AuthGuard {
	public static async user(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.isAuthenticated()) {
				throw new HTTPError(ErrorMessages.UNAUTHORIZED, 401);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static async guest(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.isAuthenticated()) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static async admin(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user?.is_admin) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}
}
