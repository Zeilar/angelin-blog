import { compare, hash } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { Service } from "./Service";

export class AuthService extends Service {
	constructor(public readonly userRepository: UserRepository) {
		super();
	}

	public async register(data: { email: string; password: string; passwordConfirm: string }) {
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

	public validateRegister() {
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
