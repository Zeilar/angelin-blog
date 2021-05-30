import { User } from "../../db/models/User";
import { Request, Response, NextFunction } from "express";

export async function loggedIn(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | NextFunction> {
	const { user: id } = req.session;
	try {
		if (id) {
			res.user = await User.query().findById(id);
			return next();
		}
		res.status(401).end();
	} catch (error) {
		res.status(500).end();
	}
}

export async function admin(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | Response | NextFunction> {
	const user: User = await User.query().findById(req.session.user);

	if (!Boolean(Number(user.is_admin))) {
		return res.status(403).end();
	}

	return next();
}