import { hash, compare } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../db/models";
import { count } from "../../db/utils/query";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../middlewares/validateBody";
import { sanitizeUser, ErrorMessages } from "../utils";
import { z } from "zod";

export async function authenticate(req: Request, res: Response) {
	try {
		res.status(200).json({ data: sanitizeUser(res.user!) });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function register(req: Request, res: Response) {
	if (!validateBody(["email", "password", "passwordConfirm"], req.body)) {
		res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
		return;
	}

	if (req.session.user) {
		res.status(405).json({ error: ErrorMessages.LOGGED_IN });
		return;
	}

	const { email, password, passwordConfirm } = req.body;

	try {
		if ((await count(User.query().where({ email }))) > 0) {
			res.status(422).json({ error: ErrorMessages.USER_TAKEN });
			return;
		}

		// TODO: Validation

		const user = await User.query().insert({
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

export async function login(req: Request, res: Response) {
	if (!validateBody(["email", "password"], req.body)) {
		res.status(400).json({ error: ErrorMessages.MISSING_INPUT });
		return;
	}

	const { email, password } = req.body;

	if (req.session.user) {
		res.status(405).json({ error: ErrorMessages.LOGGED_IN });
		return;
	}

	try {
		const user = await User.query().findOne("email", email);
		if (!user) {
			res.status(422).json({ error: ErrorMessages.USER_NOT_EXISTS });
			return;
		}

		if (!(await compare(password, user.password!))) {
			res.status(422).json({ error: ErrorMessages.INCORRECT_CREDENTIALS });
			return;
		}

		req.session.user = user.id;

		res.status(200).json({ data: sanitizeUser(user) });
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export function logout(req: Request, res: Response) {
	if (!req.session.user) {
		res.status(405).json({ error: ErrorMessages.LOGGED_OUT });
		return;
	}
	delete req.session.user;
	res.status(200).end();
}
