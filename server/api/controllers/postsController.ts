import { Request, Response } from "express";
import { Post, Tag } from "../../db/models";
import errorlog from "../../utils/errorlog";
import PostPolicy from "../policies/PostPolicy";
import { ErrorMessages } from "../utils/constants";
import { validateBody } from "../middlewares/validateBody";

export async function createPost(req: Request, res: Response) {
	if (!validateBody(["body", "title"], req.body)) {
		res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
		return;
	}

	const { user } = req.session;
	const { body, title, tags } = req.body;

	try {
		let query = Tag.query();

		tags.forEach((tag: string, i: number) => {
			query = i === 0 ? query.where("name", tag) : query.orWhere("name", tag);
		});
		const dbTags: Tag[] = await query.execute();

		const post: Post = await Post.query().insert({ user_id: user, title, body });

		for (let i: number = 0; i < dbTags.length; i++) {
			await post.$relatedQuery("tags").relate(dbTags[i]);
		}

		res.status(200).json({ data: { ...post, tags } });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export function getAllPosts(req: Request, res: Response) {
	res.status(200).json({ data: res.posts });
}

export function getPostById(req: Request, res: Response) {
	res.status(200).json({ data: res.post });
}

export async function editPost(req: Request, res: Response) {
	const { title, body } = req.body;
	try {
		res.status(200).json(await res.post!.$query().patchAndFetch({ body, title }));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function deletePost(req: Request, res: Response) {
	if (!new PostPolicy(res.user!, res.post!).can("delete")) {
		return res.status(403).end();
	}

	try {
		await res.post!.$relatedQuery("tags").unrelate();
		await res.post!.$query().delete();
		res.status(200).end();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
