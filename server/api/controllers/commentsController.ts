import { Request, Response } from "express";
import { Comment } from "../../db/models";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../middlewares/validateBody";
import { ErrorMessages } from "../utils";

export class CommentsController {
	public static async create(req: Request, res: Response) {
		const { post_id, body } = req.body;

		if (!validateBody("body", req.body)) {
			res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
			return;
		}

		// TODO: validate

		try {
			const comment = await Comment.query().insert({
				post_id,
				user_id: req.user?.id,
				body,
			});
			res.status(200).json({ data: comment });
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async edit(req: Request, res: Response) {
		const { body } = req.body;

		// TODO: validate

		try {
			res.status(200).json({ data: await res.comment!.$query().patchAndFetch({ body }) });
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			await res.comment!.$query().delete();
			res.status(200).end();
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}
}
