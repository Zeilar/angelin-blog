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

		const dbToken = await this.userService.passwordResetRepository.findOne("token", token);
		if (!dbToken) return this.json({ error: this.ErrorMessages.NOT_FOUND }, 404);

		if (DateHelpers.subDays(1).getDate() >= DateHelpers.getDate(dbToken.created_at)) {
			return this.json({ error: this.ErrorMessages.FORBIDDEN }, 403);
		}

		const deletedToken = await this.userService.passwordResetRepository.deleteById(dbToken.id);
		if (!deletedToken) throw new Error(`Could not remove password reset token ${dbToken.id}`);

		const user = await this.userService.userRepository.updateById(dbToken.user!.id, {
			password: body.password,
		});

		if (!user) throw new Error(`Could not reset password on user ${dbToken?.user?.id}`);

		return;
	}
}
