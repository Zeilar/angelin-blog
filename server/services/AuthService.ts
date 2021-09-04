import { compare, hash } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { Register } from "../types/user";
import { injectable } from "inversify";
import { User } from "../db/models";
import { Logger } from "../utils";

@injectable()
export class AuthService {
	constructor(public readonly userRepository: UserRepository) {}

	public async create(data: Register) {
		return this.userRepository.create({
			email: data.email,
			password: await hash(data.password, 10),
		});
	}

	public check(password: string, encrypted: string) {
		return compare(password, encrypted);
	}

	public validateRegister(data: Register) {
		//
	}

	public async userExists(column: keyof User, value: any) {
		return (await this.userRepository.countWhere(column, value)) > 0;
	}
}
