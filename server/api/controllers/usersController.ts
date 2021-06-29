import { hash, compare } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../db/models";
import { DB } from "../../db/utils/DB";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../middlewares/validateBody";
import { ErrorMessages } from "../utils";
import { z } from "zod";

export class UsersController {
	public static async authenticate(req: Request, res: Response) {
		try {
			res.status(200).json({ data: res.user?.sanitize() });
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async register(req: Request, res: Response) {
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
			if ((await DB.count(User.query().where({ email }))) > 0) {
				res.status(422).json({ error: ErrorMessages.USER_TAKEN });
				return;
			}

			// TODO: Validation
			// email required and type email, and password min/max

			const user = await User.query().insert({ email, password: await hash(password, 10) });

			req.session.user = user.id;

			res.status(200).json({ data: user.sanitize() });
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static async login(req: Request, res: Response) {
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

			res.status(200).json({ data: user.sanitize() });
		} catch (error) {
			errorlog(error);
			res.status(500).end();
		}
	}

	public static logout(req: Request, res: Response) {
		if (!req.session.user) {
			res.status(405).json({ error: ErrorMessages.LOGGED_OUT });
			return;
		}
		delete req.session.user;
		res.status(200).end();
	}
}
