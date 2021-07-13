import { Request, Response } from "express";
import { Controller } from "./Controller";
import { AuthService, ValidateService, UserService } from "../../services";
import * as inversify from "inversify-express-utils";
import { AuthGuard } from "../middlewares";
import { z } from "zod";

@inversify.controller("/api/password")
export class PasswordResetController extends Controller {
	constructor(
		public readonly authService: AuthService,
		public readonly validateService: ValidateService,
		public readonly userService: UserService
	) {
		super();
	}

	@inversify.httpPost("/reset", AuthGuard.guest)
	public async createAndSendToken(@inversify.requestBody() body: { userId: string }) {
		if (!this.validateService.requestBody("userId", body)) {
			return this.json({ error: this.ErrorMessages.INVALID_INPUT }, 400);
		}

		const user = await this.authService.userRepository.findById(body.userId);

		if (!user) {
			return this.json({ error: this.ErrorMessages.NOT_FOUND }, 404);
		}

		// send mail
		return this.json({ data: await this.userService.sendPasswordReset(user.id) });
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

		const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
		if (new Date().getTime() - new Date(dbToken.created_at).getTime() >= WEEK_IN_MILLISECONDS) {
			return this.json({ error: this.ErrorMessages.FORBIDDEN }, 403);
		}

		const user = await this.userService.userRepository.updateById(dbToken!.user!.id, {
			password: body.password,
		});

		if (!user) throw new Error(this.ErrorMessages.DEFAULT);

		await dbToken.$query().delete();

		return this.json({ data: user });
	}
}
