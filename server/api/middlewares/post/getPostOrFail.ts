import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import { PAGE_SIZE, NumberHelpers } from "../../utils";

export async function getPostOrFail(req: Request, res: Response, next: NextFunction) {
	// throw new Error("sdfjipdfs");
	const { id } = req.params;
	if (id) {
		const post = await Post.query().findById(id).withGraphFetched(Post.relationships);
		if (!post) return res.status(404).end();
		res.post = post;
	} else {
		const { page, perPage } = NumberHelpers.paginate(
			req.query.page as string,
			(req.query.perPage as string) ?? PAGE_SIZE
		);

		const posts = await Post.query().withGraphFetched(Post.relationships).page(page, perPage);
		res.posts = posts.results;
	}
	next();
}
