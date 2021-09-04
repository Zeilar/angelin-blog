import { injectable } from "inversify";
import { DateHelpers, ErrorMessages } from "../api/utils";
import { PasswordResetRepository, UserRepository } from "../repositories";

@injectable()
export class UserService {
	constructor(
		public readonly passwordResetRepository: PasswordResetRepository,
		public readonly userRepository: UserRepository
	) {}

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
			throw new Error(`Could not remove password reset token ${dbToken.id}`);
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
