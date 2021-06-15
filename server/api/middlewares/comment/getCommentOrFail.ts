import { Request, Response, NextFunction } from "express";
import { Comment } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { sanitizeComment } from "../../utils/comment";

export async function getCommentOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		if (id) {
			const comment = await Comment.query()
				.findById(id)
				.withGraphFetched(Comment.relationships);
			if (!comment) return res.status(404).end();

			res.comment = sanitizeComment(comment);
		} else {
			const comments = await Comment.query().withGraphFetched(Comment.relationships);
			res.comments = comments;
		}
		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
