import { User } from "../db/models";
import { CreateUser, UserEditable } from "../types/user";
import { injectable } from "inversify";
import { hash } from "bcrypt";
import { DB } from "../db/utils/DB";
import { Logger } from "../utils";

@injectable()
export class UserRepository {
	constructor(public readonly db: DB, public readonly logger: Logger) {}

	public all() {
		try {
			return User.query();
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	public create(data: CreateUser) {
		try {
			return User.query().insertGraphAndFetch(data);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public findById(id: number | string) {
		try {
			return User.query().findById(id);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public findOne(column: keyof User, value: string | number) {
		try {
			return User.query().findOne(column, value);
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
			return User.query().updateAndFetchById(id, data);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async deleteById(id: number | string) {
		try {
			const user = await this.findById(id);
			if (!user) {
				throw new Error(`Failed deleting user with id ${id}, not found.`);
			}
			await user.$query().delete();
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async deleteMany(users: User[]) {
		try {
			for (const user of users) {
				if (!(await this.deleteById(user.id))) {
					throw new Error(`Failed deleting user with id ${user?.id}`);
				}
			}
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public countWhere(column: keyof User, value: string | number) {
		try {
			return this.db.count(User.query().findOne(column, value));
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	public count() {
		try {
			return this.db.count(User.query());
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}
}
