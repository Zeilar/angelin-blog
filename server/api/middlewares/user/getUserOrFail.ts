import { Request, Response, NextFunction } from "express";
import { container } from "../../../bootstrap";
import { UserRepository } from "../../../repositories";
import errorlog from "../../../utils/errorlog";
import { ErrorMessages } from "../../utils";

export async function getUserOrFail(req: Request, res: Response, next: NextFunction) {
	const userRepository = container.get(UserRepository);
	const { id } = req.params;

	try {
		if (!id) {
			res.status(400).json({ error: "Expected id query parameter." });
			return;
		}

		const user = await userRepository.findById(id);

		if (!user) {
			res.status(404).json({ error: ErrorMessages.NOT_FOUND });
			return;
		}

		res.user = user;

		next();
	} catch (error) {
		errorlog(error);
		res.status(500).json({ error: ErrorMessages.DEFAULT });
	}
}
