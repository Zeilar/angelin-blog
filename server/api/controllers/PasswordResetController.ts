import { Controller } from "./Controller";
import { AuthService, ValidateService, UserService, MailService } from "../../services";
import * as inversify from "inversify-express-utils";
import { AuthGuard } from "../middlewares";
import { DateHelpers } from "../utils";
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

		const user = await this.authService.userRepository.findOne("email", body.email);
		if (!user) return this.json({ error: this.ErrorMessages.NOT_FOUND }, 404);

		const pwReset = await this.userService.passwordResetRepository.create(user.id);
		if (!pwReset) throw new Error(`Password reset could not be generated for user ${user.id}.`);

		const success = await this.mailService.sendPasswordReset(user.email, pwReset.token);
		if (!success)
			throw new Error(
				`Could not send password reset mail to ${user.email} with token ${pwReset.token}.`
			);

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

		const result = await this.userService.resetPassword(token, body.password);

		return this.json(result.content, result.code);
	}
}
