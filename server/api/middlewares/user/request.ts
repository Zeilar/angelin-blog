import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import errorlog from "../../../utils/errorlog";
import { sanitizeUser } from "../../utils/user";

export async function getUserOrFail(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { id } = req.params;

	try {
		if (id) {
			const user: User | null = await User.query()
				.findById(id)
				.withGraphFetched(User.relationships);
			if (!user) return res.status(404).end();

			res.user = sanitizeUser(user);
		} else {
			const users: User[] | [] = await User.query().withGraphFetched(User.relationships);
			res.users = users.map((user: User) => sanitizeUser(user));
		}

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}
