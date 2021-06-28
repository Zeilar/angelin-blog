import { Request, Response } from "express";
import { Post, Tag } from "../../db/models";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../middlewares/validateBody";
import { ErrorMessages } from "../utils";

export async function createPost(req: Request, res: Response) {
	if (!validateBody(["body", "title"], req.body)) {
		res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
		return;
	}

	const { user } = req.session;
	const { body, title, tags } = req.body;

	try {
		const post = await Post.query().insertGraphAndFetch({ user_id: user, title, body });
		const fetchedTags = await Tag.findOrCreate(tags);
		for (let i = 0; i < fetchedTags.length; i++) {
			await post.$relatedQuery("tags").relate(fetchedTags[i]);
		}
		res.status(200).json({ data: { ...post, tags } });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export function getAllPosts(req: Request, res: Response) {
	res.status(200).json({ data: res.posts?.map(post => post.sanitize()) });
}

export function getPostById(req: Request, res: Response) {
	res.status(200).json({ data: res.post?.sanitize() });
}

export async function editPost(req: Request, res: Response) {
	if (!validateBody(["body", "title"], req.body)) {
		res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
		return;
	}

	const { title, body, tags } = req.body;

	try {
		if (tags) {
			await res.post!.$relatedQuery("tags").unrelate();
			const fetchedTags = await Tag.findOrCreate(tags);
			for (let i = 0; i < fetchedTags.length; i++) {
				await res.post!.$relatedQuery("tags").relate(fetchedTags[i]);
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

export async function deletePost(req: Request, res: Response) {
	try {
		await res.post!.$relatedQuery("tags").unrelate();
		await res.post!.$query().delete();
		res.status(200).end();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
