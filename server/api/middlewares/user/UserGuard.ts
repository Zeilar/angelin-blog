import { Request, Response, NextFunction } from "express";
import { User } from "../../../db/models";
import { UserRepository } from "../../../repositories";
import errorlog from "../../../utils/errorlog";
import { NumberHelpers } from "../../utils";

export class UserGuard {
	private static async getUser(id: number) {
		return await new UserRepository().findById(id);
	}

	public static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const model = await UserGuard.getUser(NumberHelpers.int(req.params.id));

			if (!model) return res.status(404).end();

			if (User.can(res.user!, model, "delete")) {
				return next();
			}
			res.status(403).end();
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async edit(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(req.user?.id, res.user?.id);
			if (User.can(req.user!, res.user!, "edit")) {
				return next();
			}
			res.status(403).end();
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}
}
