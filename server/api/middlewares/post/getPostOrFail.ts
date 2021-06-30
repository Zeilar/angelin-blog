import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { PAGE_SIZE, NumberHelpers } from "../../utils";

export async function getPostOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const { page, perPage } = req.query;
	try {
		if (id) {
			const post = await Post.query().findById(id).withGraphFetched(Post.relationships);
			if (!post) return res.status(404).end();
			res.post = post.sanitize();
		} else {
			const pagination = NumberHelpers.paginate(
				page as string,
				(perPage as string) ?? PAGE_SIZE
			);
			console.log(pagination);
			res.posts = (
				await Post.query()
					.withGraphFetched(Post.relationships)
					.page(pagination.page, pagination.perPage)
			).results;
		}
		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
