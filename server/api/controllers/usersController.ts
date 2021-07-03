import { Request, Response } from "express";
import { User } from "../../db/models";
import { Controller } from "./Controller";
import { AuthService } from "../../services";
import { z } from "zod";

export class UsersController extends Controller {
	constructor(public readonly authService: AuthService) {
		super();
	}

	public async authenticate(req: Request, res: Response) {
		res.status(200).json({ data: res.user?.dto() });
	}

	public async register(req: Request, res: Response) {
		if (!this.validateBody(["email", "password", "passwordConfirm"], req.body)) {
			res.status(400).json({ error: this.ErrorMessages.MISSING_INPUT });
			return;
		}

		if (req.isAuthenticated()) {
			res.status(405).json({ error: this.ErrorMessages.LOGGED_IN });
			return;
		}

		const { email, password, passwordConfirm } = req.body;

		if (await this.authService.userExists("email", email)) {
			res.status(422).json({ error: this.ErrorMessages.EMAIL_TAKEN });
			return;
		}

		// TODO: Validation
		// email required and type email, and password min/max
		const { user, error } = await this.authService.register({
			email,
			password,
			passwordConfirm,
		});

		if (!user || error) {
			throw error;
		}

		req.login(user, (error?: Error) => {
			if (error) throw error;
		});

		res.status(200).json({ data: user.dto() });
	}

	public async login(req: Request, res: Response) {
		if (!this.validateBody(["email", "password"], req.body)) {
			res.status(400).json({ error: this.ErrorMessages.MISSING_INPUT });
			return;
		}

		const { email, password } = req.body;

		if (req.isAuthenticated()) {
			res.status(405).json({ error: this.ErrorMessages.LOGGED_IN });
			return;
		}

		const user = await User.query().findOne("email", email);

		if (!user) {
			res.status(422).json({ error: this.ErrorMessages.USER_NOT_EXISTS });
			return;
		}

		if (!user.password) {
			res.status(405).json({ error: "You must login via OAuth." });
			return;
		}

		if (!(await this.authService.check(password, user.password))) {
			res.status(422).json({ error: this.ErrorMessages.INCORRECT_CREDENTIALS });
			return;
		}

		req.login(user, (error: Error) => {
			if (error) throw error;
		});

		res.status(200).json({ data: user.dto() });
	}

	public logout(req: Request, res: Response) {
		if (!req.isAuthenticated()) {
			res.status(405).json({ error: this.ErrorMessages.LOGGED_OUT });
			return;
		}
		req.logout();
		res.status(200).end();
	}
}
