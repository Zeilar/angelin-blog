import { compare, hash } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { Service } from "./Service";
import { Register } from "../types/user";
import { Service as TService } from "typedi";

@TService()
export class AuthService extends Service {
	constructor(public readonly userRepository: UserRepository) {
		super();
	}

	public async create(data: Register) {
		try {
			return this.userRepository.create({
				email: data.email,
				password: await hash(data.password, 10),
			});
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async check(password: string, encrypted: string) {
		try {
			return await compare(password, encrypted);
		} catch (error) {
			this.errorlog(error);
			return false;
		}
	}

	public validateRegister(data: Register) {
		//
	}

	public async userExists(column: string, value: any) {
		try {
			return (await this.userRepository.count(column, value)) > 0;
		} catch (error) {
			this.errorlog(error);
			return false;
		}
	}
}
