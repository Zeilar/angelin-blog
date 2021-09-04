import { HTTPError } from "./../utils/HTTPError";
import { User } from "../db/models";
import { CreateUser, UserEditable } from "../types/user";
import { injectable } from "inversify";
import { hash } from "bcrypt";
import { DB } from "../db/utils/DB";

@injectable()
export class UserRepository {
	constructor(public readonly db: DB) {}

	public all() {
		return User.query();
	}

	public create(data: CreateUser) {
		return User.query().insertGraphAndFetch(data);
	}

	public findById(id: number | string) {
		return User.query().findById(id);
	}

	public findOne(column: keyof User, value: string | number) {
		return User.query().findOne(column, value);
	}

	public async updateById(id: number, data: UserEditable) {
		if (data.password) {
			data.password = await hash(data.password, 10);
		}

		return User.query().updateAndFetchById(id, data);
	}

	public async deleteById(id: number | string) {
		const user = await this.findById(id);
		if (!user) {
			throw new HTTPError(`Failed deleting user with id ${id}, not found.`, 404);
		}
		await user.$query().delete();
		return true;
	}

	public async deleteMany(users: User[]) {
		for (const user of users) {
			await this.deleteById(user.id);
		}
	}

	public countWhere(column: keyof User, value: string | number) {
		return this.db.count(User.query().findOne(column, value));
	}

	public count() {
		return this.db.count(User.query());
	}
}
