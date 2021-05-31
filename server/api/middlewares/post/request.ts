import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models/Post";
import errorlog from "../../../utils/errorlog";
import { sanitizePost } from "../../utils/post";

export async function getPostOrFail(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { id } = req.params;

	const relationships: object = {
		author: true,
		comments: true,
		tags: true,
	};

	try {
		if (id) {
			const post: Post | null = await Post.query()
				.findById(id)
				.withGraphFetched(relationships);
			if (!post) return res.status(404).end();

			res.post = sanitizePost(post);
		} else {
			const posts: Post[] | [] = await Post.query().withGraphFetched(relationships);
			res.posts = posts.map(post => sanitizePost(post));
		}

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
