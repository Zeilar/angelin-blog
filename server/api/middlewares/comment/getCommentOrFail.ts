import { Request, Response, NextFunction } from "express";
import { Comment } from "../../../db/models";
import { ErrorMessages } from "../../utils";

export async function getCommentOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ error: "Expected id query parameter." });
		return;
	}

	const comment = await Comment.query().findById(id).withGraphFetched(Comment.relationships);

	if (!comment) {
		res.status(404).json({ error: ErrorMessages.NOT_FOUND });
		return;
	}

	res.comment = comment;

	next();
}
