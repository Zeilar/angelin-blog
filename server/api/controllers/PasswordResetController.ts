import { Request, Response } from "express";
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

		if (!dbToken) {
			return this.json({ error: this.ErrorMessages.NOT_FOUND }, 404);
		}

		const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
		if (new Date().getTime() - new Date(dbToken.created_at).getTime() >= DAY_IN_MILLISECONDS) {
			return this.json({ error: this.ErrorMessages.FORBIDDEN }, 403);
		}

		const user = await this.userService.userRepository.updateById(dbToken!.user!.id, {
			password: body.password,
		});

		if (!user) throw new Error(`Could not reset password on ${dbToken?.user?.id}`);

		await dbToken.$query().delete();

		return this.json({ data: user });
	}
}
