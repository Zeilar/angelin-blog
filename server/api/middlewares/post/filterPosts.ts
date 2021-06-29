import { Request, Response, NextFunction } from "express";
import { Post } from "../../../db/models";

export async function filterPosts(req: Request, res: Response, next: NextFunction) {
	let { search, tags } = req.query;

	if (!search && !tags) {
		next();
		return;
	}

	if (search && typeof search !== "string") {
		search = undefined;
	}

	if (tags && typeof tags !== "string") {
		tags = undefined;
	}

	res.posts = await Post.filter(search, tags?.split(","));

	next();
}
