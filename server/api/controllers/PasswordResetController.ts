import { Controller } from "./Controller";
import { AuthService, ValidateService, UserService, MailService } from "../../services";
import * as inversify from "inversify-express-utils";
import { AuthGuard } from "../middlewares";
import { z } from "zod";

@inversify.controller("/api/password")
export class PasswordResetController extends Controller {
	constructor(
		public readonly authService: AuthService,
		public readonly validateService: ValidateService,
		public readonly userService: UserService,
		public readonly mailService: MailService
	) {
		super();
	}

	@inversify.httpPost("/reset", AuthGuard.guest)
	public async createAndSendToken(@inversify.requestBody() body: { email: string }) {
		if (!this.validateService.requestBody("email", body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		await this.userService.sendPasswordReset(body.email);

		return;
	}

	@inversify.httpPost("/reset/:token", AuthGuard.guest)
	public async reset(
		@inversify.requestParam("token") token: string,
		@inversify.requestBody() body: { password: string }
	) {
		if (!token || !this.validateService.requestBody("password", body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		await this.userService.resetPassword(token, body.password);

		return;
	}
}
