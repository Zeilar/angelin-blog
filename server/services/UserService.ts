import { injectable } from "inversify";
import { PasswordResetRepository, UserRepository } from "../repositories";

@injectable()
export class UserService {
	constructor(
		public readonly passwordResetRepository: PasswordResetRepository,
		public readonly userRepository: UserRepository
	) {}
}
