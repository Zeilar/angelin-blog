import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { sanitizePost } from "../../utils/post";

export async function getPostOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	try {
		if (id) {
			const post: Post | null = await Post.query()
				.findById(id)
				.withGraphFetched(Post.relationships);
			if (!post) return res.status(404).end();

			res.post = sanitizePost(post);
		} else {
			const posts: Post[] | [] = await Post.query().withGraphFetched(Post.relationships);
			res.posts = posts.map((post: Post) => sanitizePost(post));
		}

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
