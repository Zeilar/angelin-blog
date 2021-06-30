import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { NumberHelpers, PAGE_SIZE } from "../../utils";

export async function getUserOrFail(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		if (id) {
			const user = await User.query().findById(id).withGraphFetched(User.relationships);
			if (!user) return res.status(404).end();
			res.user = user;
		} else {
			const { page, perPage } = req.query;

			const pagination = NumberHelpers.paginate(
				page as string,
				(perPage as string) ?? PAGE_SIZE
			);

			res.users = (
				await User.query()
					.withGraphFetched(User.relationships)
					.page(pagination.page, pagination.perPage)
			).results;
		}
		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
