import { HTTPError } from "./../../../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { Comment } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export async function getCommentOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	try {
		if (!id) {
			throw new HTTPError("Expected id parameter.", 400);
		}

		const comment = await Comment.query().findById(id).withGraphFetched(Comment.relationships);

		if (!comment) {
			throw new HTTPError(ErrorMessages.NOT_FOUND, 404);
		}

		res.comment = comment;

		next();
	} catch (error) {
		next(error);
	}
}
