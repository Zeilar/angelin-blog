import { Request, Response } from "express";
import { Post, Tag } from "../../db/models";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../middlewares/validateBody";
import { ErrorMessages } from "../utils";
import { z } from "zod";

export class PostsController {
	public static async create(req: Request, res: Response) {
		if (!validateBody(["body", "title"], req.body)) {
			res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
			return;
		}

		const { user } = req.session;
		const { body, title, tags } = req.body;

		// TODO: validate

		try {
			const post = await Post.query().insertGraphAndFetch({ user_id: user, title, body });
			const fetchedTags = await Tag.findOrCreate(tags);
			for (const tag of fetchedTags) {
				await post.$relatedQuery("tags").relate(tag);
			}
			res.status(200).json({ data: { ...post, tags } });
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async index(req: Request, res: Response) {
		res.status(200).json({ data: res.posts });
	}

	public static single(req: Request, res: Response) {
		res.status(200).json({ data: res.post });
	}

	public static async edit(req: Request, res: Response) {
		if (!validateBody(["body", "title"], req.body)) {
			res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
			return;
		}

		const { title, body, tags } = req.body;

		try {
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
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			await res.post!.$relatedQuery("tags").unrelate();
			await res.post!.$query().delete();
			res.status(200).end();
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}
}
