import { hash, compare } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../db/models";
import { count } from "../../db/utils/query";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../middlewares/validateBody";
import { sanitizeUser } from "../utils/user";
import { ErrorMessages } from "../utils/constants";
import { z } from "zod";

export async function authenticate(req: Request, res: Response): Promise<void> {
	try {
		res.status(200).json({ data: sanitizeUser(res.user!) });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function register(req: Request, res: Response): Promise<void | Response> {
	if (!validateBody(["email", "password", "passwordConfirm"], req.body)) {
		return res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
	}

	const { email, password, passwordConfirm } = req.body;

	if (req.session.user) {
		return res.status(405).json({ error: ErrorMessages.LOGGED_IN });
	}

	try {
		if ((await count(User.query().where({ email }))) > 0) {
			return res.status(422).json({ error: ErrorMessages.USER_TAKEN });
		}

		// TODO: Validation

		const user: User | null = await User.query().insert({
			email,
			password: await hash(password, 10),
		});

		req.session.user = user.id;

		res.status(200).json({ data: sanitizeUser(user) });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function login(req: Request, res: Response): Promise<void | Response> {
	if (!validateBody(["email", "password", "passwordConfirm"], req.body)) {
		return res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
	}

	const { email, password } = req.body;

	if (req.session.user) {
		return res.status(405).json({ error: ErrorMessages.LOGGED_IN });
	}

	try {
		const user: User | null = await User.query().findOne("email", email);
		if (!user) return res.status(422).json({ error: ErrorMessages.USER_NOT_EXISTS });

		if (!(await compare(password, user.password!))) {
			return res.status(422).json({ error: ErrorMessages.INCORRECT_CREDENTIALS });
		}

		req.session.user = user.id;

		res.status(200).json({ data: sanitizeUser(user) });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export function logout(req: Request, res: Response): void | Response {
	if (!req.session.user) {
		return res.status(405).json({ error: ErrorMessages.LOGGED_OUT });
	}
	delete req.session.user;
	res.status(200).end();
}
