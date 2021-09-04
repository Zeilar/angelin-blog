import { HTTPError } from "./../../../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export class PostGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		try {
			if (!Post.can(req.user!, res.post!, "create")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		try {
			if (!Post.can(req.user!, res.post!, "delete")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		try {
			if (!Post.can(req.user!, res.post!, "edit")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}
}
