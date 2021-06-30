import { Request, Response, NextFunction, response } from "express";
import { Comment } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { NumberHelpers, PAGE_SIZE } from "../../utils";

export async function getCommentOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		if (id) {
			const comment = await Comment.query()
				.findById(id)
				.withGraphFetched(Comment.relationships);
			if (!comment) return res.status(404).end();
			res.comment = comment.sanitize();
		} else {
			return res.status(400).json({ error: "Expected id query parameter." });
		}
		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
