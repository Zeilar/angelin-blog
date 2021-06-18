import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { PAGE_SIZE, sanitizePost, NumberHelpers } from "../../utils";

export async function getPostOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const { page, perPage } = req.query;
	try {
		if (id) {
			const post = await Post.query().findById(id).withGraphFetched(Post.relationships);
			if (!post) return res.status(404).end();
			res.post = sanitizePost(post);
		} else {
			res.posts = (
				await Post.query()
					.withGraphFetched(Post.relationships)
					.page(
						NumberHelpers.clamp(Number(page) - 1) || 0,
						NumberHelpers.clamp(Number(perPage)) || PAGE_SIZE
					)
			).results;
		}
		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
