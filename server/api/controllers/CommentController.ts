import { Request, Response } from "express";
import { Comment } from "../../db/models";
import { ValidateService } from "../../services";
import { Controller } from "./Controller";
import * as inversify from "inversify-express-utils";
import { AuthGuard, CommentGuard } from "../middlewares";

@inversify.controller("/api/commments", AuthGuard.user)
export class CommentController extends Controller {
	constructor(public readonly validateService: ValidateService) {
		super();
	}

	@inversify.httpPost("/")
	public async create(@inversify.request() req: Request, @inversify.response() res: Response) {
		if (!this.validateService.requestBody("body", req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { post_id, body } = req.body;

		// TODO: validate

		const comment = await Comment.query().insert({
			post_id,
			user_id: req.user?.id,
			body,
		});

		return this.json({ data: comment });
	}

	@inversify.httpPut("/:id", CommentGuard.edit)
	public async edit(req: Request, res: Response) {
		const { body } = req.body;

		// TODO: validate
		return this.json({ data: await res.comment!.$query().patchAndFetch({ body }) });
	}

	@inversify.httpDelete("/:id", CommentGuard.delete)
	public async delete(@inversify.request() req: Request, @inversify.response() res: Response) {
		await res.comment!.$query().delete();
		res.status(200).end();
	}
}
