import { Request, Response } from "express";
import { Controller } from "./Controller";
import { AuthService, ValidateService, UserService } from "../../services";
import * as inversify from "inversify-express-utils";
import { AuthGuard, getUserOrFail, UserGuard } from "../middlewares";
import { z } from "zod";

@inversify.controller("/api/users")
export class UserController extends Controller {
	constructor(
		public readonly authService: AuthService,
		public readonly validateService: ValidateService,
		public readonly userService: UserService
	) {
		super();
	}

	@inversify.httpGet("/authenticate", AuthGuard.user)
	public async authenticate(@inversify.request() req: Request) {
		return this.json({ data: req.user?.dto() });
	}

	@inversify.httpPost("/register", AuthGuard.guest)
	public async register(@inversify.request() req: Request) {
		if (!this.validateService.requestBody(["email", "password", "passwordConfirm"], req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { email, password, passwordConfirm } = req.body;

		if (await this.authService.userExists("email", email)) {
			return this.json({ error: this.ErrorMessages.EMAIL_TAKEN }, 422);
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

		return this.json({ data: user.dto() });
	}

	@inversify.httpPost("/login", AuthGuard.guest)
	public async login(@inversify.request() req: Request, @inversify.response() res: Response) {
		if (!this.validateService.requestBody(["email", "password"], req.body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const { email, password } = req.body;

		if (req.isAuthenticated()) {
			return this.json({ error: this.ErrorMessages.LOGGED_IN }, 405);
		}

		const user = await this.authService.userRepository.findOne("email", email);

		if (!user) {
			return this.json({ error: this.ErrorMessages.USER_NOT_EXISTS }, 422);
		}

		if (!user.password || user.oauth) {
			return this.json({ error: "You must login via OAuth." }, 405);
		}

		if (!(await this.authService.check(password, user.password))) {
			return this.json({ error: this.ErrorMessages.INCORRECT_CREDENTIALS }, 422);
		}

		req.login(user, (error: Error) => {
			if (error) throw error;
		});

		return this.json({ data: user.dto() });
	}

	@inversify.httpGet("/logout", AuthGuard.user)
	public logout(@inversify.request() req: Request) {
		req.logout();
	}

	@inversify.httpPut("/:id", AuthGuard.user, getUserOrFail, UserGuard.edit)
	public async update(
		@inversify.request() req: Request,
		@inversify.response() res: Response,
		@inversify.requestParam("id") id: string
	) {
		console.log(res.user, id);
		return this.json({ message: "Can edit" });
	}

	@inversify.httpDelete("/:id", AuthGuard.user, getUserOrFail, UserGuard.delete)
	public async delete(
		@inversify.request() req: Request,
		@inversify.response() res: Response,
		@inversify.requestParam("id") id: string
	) {
		console.log(res.user, id);
		res.status(200).send("Can delete");
	}
}
