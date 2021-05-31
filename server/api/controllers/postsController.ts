import { Request, Response } from "express";
import { Post, Tag, User } from "../../db/models";
import errorlog from "../../utils/errorlog";
import PostPolicy from "../policies/PostPolicy";
import { validateBody, idsMatch } from "../utils/request";

export async function createPost(req: Request, res: Response): Promise<void | Response> {
	if (!validateBody(req.body, ["body", "title"])) {
		return res.status(400).json({ error: "Please provide a body and title." });
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

		res.status(200).json({ ...post, tags });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export function getAllPosts(req: Request, res: Response): void {
	res.status(200).json(res.posts);
}

export function getPostById(req: Request, res: Response): void {
	res.status(200).json(res.post);
}

export async function editPost(req: Request, res: Response): Promise<void> {
	const { title, body } = req.body;
	try {
		res.status(200).json(await res.post.$query().patchAndFetch({ body, title }));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function deletePost(req: Request, res: Response): Promise<void> {
	const { id } = req.params;

	if (!idsMatch(req.session.user, Number(id))) {
		return res.status(403).end();
	}

	try {
		const post: Post | null = await Post.query().findById(id);

		if (!post) return res.status(404).end();

		await post.$relatedQuery("tags").unrelate();
		await post.$query().delete();

		res.status(200).end();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
