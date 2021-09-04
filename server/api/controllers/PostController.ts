import { HTTPError } from "./../../utils/HTTPError";
import { PostRepository } from "./../../repositories/PostRepository";
import { TagRepository } from "./../../repositories/TagRepository";
import { Request, Response } from "express";
import { Post, Tag } from "../../db/models";
import { PostService, ValidateService } from "../../services";
import { Controller } from "./Controller";
import * as inversify from "inversify-express-utils";
import { AuthGuard, filterPosts, getPostOrFail, PostGuard } from "../middlewares";
import { z } from "zod";

@inversify.controller("/api/posts")
export class PostController extends Controller {
	constructor(
		public readonly validateService: ValidateService,
		public readonly tagRepository: TagRepository,
		public readonly postService: PostService
	) {
		super();
	}

	@inversify.httpPost("/", AuthGuard.user, AuthGuard.admin)
	public async create(@inversify.request() req: Request) {
		if (!this.validateService.requestBody(["body", "title"], req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { body, title, tags } = req.body;

		// TODO: validate (don't forget to validate so tags are not empty etc)

		const post = await Post.query().insertGraphAndFetch({
			user_id: req.user?.id,
			title,
			body,
		});

		const fetchedTags = await this.tagRepository.findOrCreate(tags);

		for (const tag of fetchedTags) {
			await this.postService.postRepository.relateTag(post, tag);
		}

		return this.json({ data: { ...post, tags } });
	}

	@inversify.httpGet("/", filterPosts, getPostOrFail)
	public async index(@inversify.response() res: Response) {
		return this.json({ data: res.posts });
	}

	@inversify.httpGet("/:id", getPostOrFail)
	public single(@inversify.response() res: Response) {
		return this.json({ data: res.post });
	}

	@inversify.httpPut("/:id", getPostOrFail, PostGuard.edit)
	public async edit(@inversify.request() req: Request, @inversify.response() res: Response) {
		if (!this.validateService.requestBody(["body", "title"], req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { title, body, tags } = req.body;

		if (tags) {
			await this.postService.postRepository.addTags(res.post, tags);
		}

		// TODO: refactor to only graph fetch if tags were affected
		return this.json({
			data: await res.post.$query().patchAndFetch({ body, title }).withGraphFetched("tags"),
		});
	}

	@inversify.httpDelete("/:id", getPostOrFail, PostGuard.delete)
	public async delete(@inversify.response() res: Response) {
		await this.postService.deleteById(res.post.id);
	}
}
