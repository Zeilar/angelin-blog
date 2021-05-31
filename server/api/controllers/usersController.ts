import { hash, compare } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../db/models/User";
import { count } from "../../db/utils/query";
import errorlog from "../../utils/errorlog";
import { validateBody } from "../utils/request";
import { sanitizeUser } from "../utils/user";

export async function authenticate(req: Request, res: Response): Promise<void> {
	try {
		res.status(200).json(sanitizeUser(res.user));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function register(req: Request, res: Response): Promise<void | Response> {
	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Please provide an email and password." });
	}

	const { email, password } = req.body;

	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	try {
		if ((await count(User.query().where({ email }))) > 0) {
			return res.status(422).json({ error: "User already exists." });
		}

		// TODO: Validation
		const user: User | null = await User.query().insert({
			email,
			password: await hash(password, 10),
		});

		req.session.user = user.id;

		res.status(200).json(sanitizeUser(user));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export async function login(req: Request, res: Response): Promise<void | Response> {
	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Please provide an email and password." });
	}

	const { email, password } = req.body;

	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	try {
		const user: User | null = await User.query().findOne("email", email);
		if (!user) return res.status(404).json({ error: "User does not exist." });

		if (!(await compare(password, user.password))) {
			return res.status(422).json({ error: "Incorrect password." });
		}

		req.session.user = user.id;

		res.status(200).json(sanitizeUser(user));
	} catch (error) {
		errorlog(error);
		res.status(500).end();
	}
}

export function logout(req: Request, res: Response): void | Response {
	if (!req.session.user) {
		return res.status(405).json({ error: "You are already logged out." });
	}
	delete req.session.user;
	res.status(200).end();
}
