import { HTTPError } from "./../../../utils/HTTPError";
import { Request, Response, NextFunction } from "express";
import { container } from "../../../bootstrap";
import { UserRepository } from "../../../repositories";
import { ErrorMessages } from "../../utils";

export async function getUserOrFail(req: Request, res: Response, next: NextFunction) {
	const userRepository = container.get(UserRepository);
	const { id } = req.params;

	try {
		if (!id) {
			throw new HTTPError("Expected id parameter.", 400);
		}

		const user = await userRepository.findById(id);

		if (!user) {
			throw new HTTPError(ErrorMessages.NOT_FOUND, 404);
		}

		res.user = user;

		next();
	} catch (error) {
		next(error);
	}
}
