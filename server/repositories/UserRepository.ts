import { User } from "../db/models";
import { CreateUser, UserEditable } from "../types/user";
import { injectable } from "inversify";
import { hash } from "bcrypt";
import { DB } from "../db/utils/DB";
import { Logger } from "../utils";

@injectable()
export class UserRepository {
	constructor(public readonly db: DB, public readonly logger: Logger) {}

	public async all() {
		try {
			return await User.query();
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	public async create(data: CreateUser) {
		try {
			return await User.query().insertGraphAndFetch(data);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async findById(id: number | string) {
		try {
			return await User.query().findById(id);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async findOne(column: keyof User, value: string | number) {
		try {
			return await User.query().findOne(column, value);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async updateById(id: number, data: UserEditable) {
		if (data.password) {
			data.password = await hash(data.password, 10);
		}

		try {
			return await User.query().updateAndFetchById(id, data);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async deleteById(id: number | string) {
		try {
			await User.query().deleteById(id);
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async deleteMany(users: User[]) {
		try {
			for (const user of users) {
				await this.deleteById(user.id);
			}
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async countWhere(column: keyof User, value: string | number) {
		try {
			return await this.db.count(User.query().findOne(column, value));
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	public async count() {
		try {
			return await this.db.count(User.query());
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}
}
