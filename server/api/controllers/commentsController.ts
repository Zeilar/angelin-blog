import { Request, Response } from "express";
import { Comment } from "../../db/models";
import errorlog from "../../utils/errorlog";

export async function createComment(req: Request, res: Response): Promise<void> {
	const { post_id, body } = req.body;
	const { user } = req.session;

	try {
		const comment: Comment | null = await Comment.query().insert({
			post_id,
			user_id: user,
			body,
		});
		res.status(200).json({ data: comment });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function editComment(req: Request, res: Response): Promise<void> {
	const { body } = req.body;
	try {
		res.status(200).json({ data: await res.comment!.$query().patchAndFetch({ body }) });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
	try {
		await res.comment!.$query().delete();
		res.status(200).end();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
