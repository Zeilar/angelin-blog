import { User } from "../../db/models";
import { Request, Response, NextFunction } from "express";

export async function loggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { user: id } = req.session;
	try {
		if (!id) return res.status(401).end();
		res.user = await User.query().findById(id);
		next();
	} catch (error) {
		res.status(500).end();
	}
}

export async function admin(req: Request, res: Response, next: NextFunction): Promise<void> {
	const user: User = await User.query().findById(req.session.user);

	// Just in case, sometimes the number returned from MySQL turns into a string
	if (!Boolean(Number(user.is_admin))) {
		return res.status(403).end();
	}

	next();
}
