import { Request, Response } from "express";
import { Comment } from "../../db/models/Comment";
import { count } from "../../db/utils/query";
import errorlog from "../../utils/errorlog";

export async function createComment(req: Request, res: Response) {
	const { post_id, body } = req.body;
	const { user } = req.session;

	try {
		const comment: Comment = await Comment.query().insert({
			post_id,
			user_id: user,
			body,
		});
		res.status(200).json(comment);
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function editComment(req: Request, res: Response) {
	const { body } = req.body;
	const { id } = req.params;

	try {
		const comment: Comment = await Comment.query().findById(id);
		if (!comment) return res.status(404).end();

		res.status(200).json(await comment.$query().patchAndFetch({ body }));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function deleteComment(req: Request, res: Response) {
	const { id } = req.params;

	try {
		if ((await count(Comment.query().findById(id))) === 0) {
			return res.status(404).end();
		}

		await Comment.query().deleteById(id);

		res.status(200).json();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
