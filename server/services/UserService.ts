import { HTTPError } from "./../utils/HTTPError";
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

		if (!user) {
			throw new HTTPError(ErrorMessages.NOT_FOUND, 404);
		}

		const pwReset = await this.passwordResetRepository.create(user.id);
		this.mailService.sendPasswordReset(user.email, pwReset.token);
	}

	public async resetPassword(token: string, password: string) {
		const dbToken = await this.passwordResetRepository.findOne("token", token);

		if (!dbToken) {
			throw new HTTPError(ErrorMessages.NOT_FOUND, 404);
		}

		if (!dbToken.user) {
			throw new HTTPError(
				`Invalid token encountered with id ${dbToken.id}, no user is attached.`
			);
		}

		if (DateHelpers.subDays(1).getDate() >= DateHelpers.getDate(dbToken.created_at)) {
			throw new HTTPError(ErrorMessages.FORBIDDEN, 403);
		}

		await this.passwordResetRepository.deleteById(dbToken.id);
		await this.userRepository.updateById(dbToken.user.id, { password });
	}
}
