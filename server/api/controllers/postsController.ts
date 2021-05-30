import { Request, Response } from "express";
import { Post } from "../../db/models/Post";
import { Tag } from "../../db/models/Tag";
import errorlog from "../../utils/errorlog";
import { sanitizePost } from "../utils/post";
import { validateBody, idsMatch } from "../utils/request";

export async function createPost(req: Request, res: Response) {
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
		const result: Tag[] = await query.execute();

		const post: Post = await Post.query()
			.insertGraphAndFetch({ user_id: user, title, body })
			.first();

		for (let i: number = 0; i < result.length; i++) {
			await post.$relatedQuery("tags").relate(result[i]);
		}

		res.status(200).json(post);
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function getAllPosts(req: Request, res: Response) {
	try {
		const posts: Post[] = await Post.query().withGraphFetched({
			author: true,
			comments: true,
			tags: true,
		});
		res.status(200).json(posts.map(post => sanitizePost(post)));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function getPostById(req: Request, res: Response) {
	try {
		const post: Post = await Post.query().findById(req.params.id).withGraphFetched({
			author: true,
			comments: true,
			tags: true,
		});
		res.status(200).json(sanitizePost(post));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function editPost(req: Request, res: Response) {
	const { title, body } = req.body;
	const { id } = req.params;

	try {
		const post: Post = await Post.query().findById(id);
		if (!post) return res.status(404).end();

		res.status(200).json(await post.$query().patchAndFetch({ body, title }));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function deletePost(req: Request, res: Response) {
	const { id } = req.params;

	if (!idsMatch(res.user.id, Number(id))) {
		return res.status(403).end();
	}

	try {
		const post: Post = await Post.query().findById(id);

		if (!post) return res.status(404).end();

		await post.$relatedQuery("comments").delete();
		await post.$relatedQuery("tags").unrelate();
		await post.$query().delete();

		res.status(200).end();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
