import { Request, Response } from "express";
import { Post, Tag } from "../../db/models";
import { ValidateService } from "../../services";
import { Controller } from "./Controller";
import * as inversify from "inversify-express-utils";
import { AuthGuard, getPostOrFail, PostGuard } from "../middlewares";
import { z } from "zod";

@inversify.controller("/api/posts")
export class PostController extends Controller {
	constructor(public readonly validateService: ValidateService) {
		super();
	}

	@inversify.httpPost("/", AuthGuard.admin)
	public async create(req: Request, res: Response) {
		if (!this.validateService.requestBody(["body", "title"], req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { body, title, tags } = req.body;

		// TODO: validate

		const post = await Post.query().insertGraphAndFetch({
			user_id: req.user?.id,
			title,
			body,
		});

		const fetchedTags = await Tag.findOrCreate(tags);

		for (const tag of fetchedTags) {
			await post.$relatedQuery("tags").relate(tag);
		}

		return this.json({ data: { ...post, tags } });
	}

	@inversify.httpGet("/", getPostOrFail)
	public async index(@inversify.request() req: Request, @inversify.response() res: Response) {
		res.status(200).json({ data: res.posts });
	}

	@inversify.httpGet("/:id", getPostOrFail)
	public single(@inversify.request() req: Request, @inversify.response() res: Response) {
		res.status(200).json({ data: res.post });
	}

	@inversify.httpPut("/:id", getPostOrFail, PostGuard.edit)
	public async edit(@inversify.request() req: Request, @inversify.response() res: Response) {
		if (!this.validateService.requestBody(["body", "title"], req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { title, body, tags } = req.body;

		if (tags) {
			await res.post?.$relatedQuery("tags").unrelate();
			const fetchedTags = await Tag.findOrCreate(tags);
			for (const tag of fetchedTags) {
				await res.post?.$relatedQuery("tags").relate(tag);
			}
		}

		return this.json(
			await res.post?.$query().patchAndFetch({ body, title }).withGraphFetched("tags")
		);
	}

	public async delete(req: Request, res: Response) {
		await res.post!.$relatedQuery("tags").unrelate();
		await res.post!.$query().delete();
		res.status(200).end();
	}
}
