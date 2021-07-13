import { Service } from "./Service";
import { injectable } from "inversify";
import { PasswordResetRepository, UserRepository } from "../repositories";

@injectable()
export class UserService extends Service {
	constructor(
		public readonly passwordResetRepository: PasswordResetRepository,
		public readonly userRepository: UserRepository
	) {
		super();
	}

	public async sendPasswordReset(userId: number) {
		return await this.passwordResetRepository.create(userId);
	}
}
