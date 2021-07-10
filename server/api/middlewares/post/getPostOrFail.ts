import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import { PAGE_SIZE, NumberHelpers, ErrorMessages } from "../../utils";

export async function getPostOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	if (id) {
		const post = await Post.query().findById(id).withGraphFetched(Post.relationships);

		if (!post) {
			res.status(404).json({ error: ErrorMessages.NOT_FOUND });
			return;
		}

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
