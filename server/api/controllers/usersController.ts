import { Request, Response } from "express";
import { Controller } from "./Controller";
import { AuthService, ValidateService, UserService } from "../../services";
import { Service } from "typedi";
import { z } from "zod";

@Service()
export class UsersController extends Controller {
	constructor(
		public readonly authService: AuthService,
		public readonly validateService: ValidateService,
		public readonly userService: UserService
	) {
		super();
	}

	public async authenticate(req: Request, res: Response) {
		res.status(200).json({ data: req.user?.dto() });
	}

	public async register(req: Request, res: Response) {
		if (!this.validateService.requestBody(["email", "password", "passwordConfirm"], req.body)) {
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
		const user = await this.authService.create({
			email,
			password,
			passwordConfirm,
		});

		if (!user) throw new Error("Failed creating user upon registration.");

		req.login(user, (error?: Error) => {
			if (error) throw error;
		});

		res.status(200).json({ data: user.dto() });
	}

	public async login(req: Request, res: Response) {
		if (!this.validateService.requestBody(["email", "password"], req.body)) {
			res.status(400).json({ error: this.ErrorMessages.MISSING_INPUT });
			return;
		}

		const { email, password } = req.body;

		if (req.isAuthenticated()) {
			res.status(405).json({ error: this.ErrorMessages.LOGGED_IN });
			return;
		}

		const user = await this.authService.userRepository.findOne("email", email);

		if (!user) {
			res.status(422).json({ error: this.ErrorMessages.USER_NOT_EXISTS });
			return;
		}

		if (!user.password || user.oauth) {
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

	public async update(req: Request, res: Response) {
		//
		res.status(200).send("Can edit");
	}
}
