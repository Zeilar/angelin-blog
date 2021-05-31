import { Request, Response, NextFunction } from "express";
import { Tag } from "../../../db/models";
import errorlog from "../../../utils/errorlog";

export async function getTagOrFail(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { id } = req.params;

	try {
		if (id) {
			const tag: Tag | null = await Tag.query()
				.findById(id)
				.withGraphFetched(Tag.relationships);
			if (!tag) return res.status(404).end();

			res.tag = tag;
		} else {
			const tags: Tag[] | [] = await Tag.query().withGraphFetched(Tag.relationships);
			res.tags = tags;
		}

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
