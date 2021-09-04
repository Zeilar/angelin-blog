import { compare, hash } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { Register } from "../types/user";
import { injectable } from "inversify";
import { User } from "../db/models";
import { Logger } from "../utils";

@injectable()
export class AuthService {
	constructor(public readonly userRepository: UserRepository, public readonly logger: Logger) {}

	public async create(data: Register) {
		try {
			return this.userRepository.create({
				email: data.email,
				password: await hash(data.password, 10),
			});
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async check(password: string, encrypted: string) {
		try {
			return compare(password, encrypted);
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public validateRegister(data: Register) {
		//
	}

	public async userExists(column: keyof User, value: any) {
		try {
			return (await this.userRepository.countWhere(column, value)) > 0;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}
}
