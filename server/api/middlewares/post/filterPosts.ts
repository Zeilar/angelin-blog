import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";

/**
 * If filter params are provided, run filter instead of get all
 */
export async function filterPosts(req: Request, res: Response, next: NextFunction) {
	let { search, tags } = req.query;

	if (!search && !tags) {
		return next();
	}

	if (typeof search !== "string") {
		search = undefined;
	}

	if (typeof tags !== "string") {
		tags = undefined;
	}

	res.status(200).json({ data: await Post.filter(search, tags?.split(",")) });
}
