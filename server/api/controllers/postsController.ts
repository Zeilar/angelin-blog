import { Request, Response } from "express";
import { Post, Tag } from "../../db/models";
import { ErrorMessages } from "../utils";
import { ValidateService } from "../../services";
import { Controller } from "./Controller";
import { z } from "zod";

export class PostsController extends Controller {
	constructor(public readonly validateService: ValidateService) {
		super();
	}

	public async create(req: Request, res: Response) {
		if (!this.validateService.requestBody(["body", "title"], req.body)) {
			res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
			return;
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
		res.status(200).json({ data: { ...post, tags } });
	}

	public async index(req: Request, res: Response) {
		res.status(200).json({ data: res.posts });
	}

	public single(req: Request, res: Response) {
		res.status(200).json({ data: res.post });
	}

	public async edit(req: Request, res: Response) {
		if (!this.validateService.requestBody(["body", "title"], req.body)) {
			res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
			return;
		}

		const { title, body, tags } = req.body;

		if (tags) {
			await res.post!.$relatedQuery("tags").unrelate();
			const fetchedTags = await Tag.findOrCreate(tags);
			for (const tag of fetchedTags) {
				await res.post!.$relatedQuery("tags").relate(tag);
			}
		}
		res.status(200).json(
			await res.post!.$query().patchAndFetch({ body, title }).withGraphFetched("tags")
		);
	}

	public async delete(req: Request, res: Response) {
		await res.post!.$relatedQuery("tags").unrelate();
		await res.post!.$query().delete();
		res.status(200).end();
	}
}
