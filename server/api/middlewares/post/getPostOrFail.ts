import { Request, Response, NextFunction } from "express";
import { container } from "../../../bootstrap";
import { PostRepository } from "../../../repositories";
import { NumberHelpers, ErrorMessages } from "../../utils";

export async function getPostOrFail(req: Request, res: Response, next: NextFunction) {
	const postRepository = container.get(PostRepository);

	const { id } = req.params;
	const { page, perPage } = req.query;

	if (id) {
		const post = await postRepository.findById(id);

		if (!post) {
			res.status(404).json({ error: ErrorMessages.NOT_FOUND });
			return;
		}

		res.post = post;
	} else {
		const pagination = NumberHelpers.paginate(page as string, perPage as string);
		const posts = await postRepository.all(pagination.page, pagination.perPage);
		res.posts = posts;
	}

	next();
}
