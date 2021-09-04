import { injectable } from "inversify";
import { DateHelpers, ErrorMessages } from "../api/utils";
import { PasswordResetRepository, UserRepository } from "../repositories";
import { MailService } from "./MailService";

@injectable()
export class UserService {
	constructor(
		public readonly passwordResetRepository: PasswordResetRepository,
		public readonly userRepository: UserRepository,
		public readonly mailService: MailService
	) {}

	public async sendPasswordReset(email: string) {
		const user = await this.userRepository.findOne("email", email);
		if (!user)
			return {
				content: { error: ErrorMessages.NOT_FOUND },
				code: 404,
			};

		const pwReset = await this.passwordResetRepository.create(user.id);
		if (!pwReset) {
			throw new Error(`Password reset could not be generated for user ${user.id}.`);
		}

		const success = await this.mailService.sendPasswordReset(user.email, pwReset.token);
		if (!success) {
			throw new Error(
				`Could not send password reset to ${user.email} with token ${pwReset.token}.`
			);
		}

		return { content: null, code: 204 };
	}

	public async resetPassword(token: string, password: string) {
		const dbToken = await this.passwordResetRepository.findOne("token", token);

		if (!dbToken) {
			return {
				content: { error: ErrorMessages.NOT_FOUND },
				code: 404,
			};
		}

		if (!dbToken.user) {
			throw new Error("Invalid token encountered, no user is attached.");
		}

		if (DateHelpers.subDays(1).getDate() >= DateHelpers.getDate(dbToken.created_at)) {
			return {
				content: { error: ErrorMessages.FORBIDDEN },
				code: 403,
			};
		}

		if (!(await this.passwordResetRepository.deleteById(dbToken.id))) {
			throw new Error(`Could not remove password reset token ${dbToken.id}.`);
		}

		const user = await this.userRepository.updateById(dbToken.user.id, {
			password,
		});

		if (!user) {
			throw new Error(`Could not reset password on user ${dbToken.user.id}`);
		}

		return { content: null, code: 204 };
	}
}
