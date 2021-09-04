import { HTTPError } from "./../../../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { Comment } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export class CommentGuard {
	public static create(req: Request, res: Response, next: NextFunction) {
		try {
			if (!Comment.can(req.user!, res.comment!, "create")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static delete(req: Request, res: Response, next: NextFunction) {
		try {
			if (!Comment.can(req.user!, res.comment!, "delete")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	public static edit(req: Request, res: Response, next: NextFunction) {
		try {
			if (!Comment.can(req.user!, res.comment!, "edit")) {
				throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	}
}
