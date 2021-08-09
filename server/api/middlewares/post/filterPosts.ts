import { Request, Response, NextFunction } from "express";
import { container } from "../../../bootstrap";
import { PostRepository } from "../../../repositories";
import { NumberHelpers } from "../../utils";

/**
 * If filter params are provided, run filter instead of get all
 */
export async function filterPosts(req: Request, res: Response, next: NextFunction) {
	const postRepository = container.get(PostRepository);

	let { search, tags, page, perPage } = req.query;

	if (!search && !tags) {
		next();
		return;
	}

	if (typeof search !== "string") {
		search = undefined;
	}

	if (typeof tags !== "string") {
		tags = undefined;
	}

	const pagination = NumberHelpers.paginate(page as string, perPage as string);

	res.status(200).json({
		data: await postRepository.filter(
			search,
			tags?.split(","),
			pagination.page,
			pagination.perPage
		),
	});
}
