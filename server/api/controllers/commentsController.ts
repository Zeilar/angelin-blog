import { Request, Response } from "express";
import { Comment } from "../../db/models";
import { ValidateService } from "../../services";
import { Controller } from "./Controller";

export class CommentsController extends Controller {
	constructor(public readonly validateService: ValidateService) {
		super();
	}

	public async create(req: Request, res: Response) {
		const { post_id, body } = req.body;

		if (!this.validateService.requestBody("body", req.body)) {
			res.status(400).json({ error: this.ErrorMessages.MISSING_INPUT });
			return;
		}

		// TODO: validate

		const comment = await Comment.query().insert({
			post_id,
			user_id: req.user?.id,
			body,
		});

		res.status(200).json({ data: comment });
	}

	public async edit(req: Request, res: Response) {
		const { body } = req.body;

		// TODO: validate
		res.status(200).json({ data: await res.comment!.$query().patchAndFetch({ body }) });
	}

	public async delete(req: Request, res: Response) {
		await res.comment!.$query().delete();
		res.status(200).end();
	}
}
