import { User } from "../db/models";
import { Repository } from "./Repository";
import { CreateUser, UserEditable } from "../types/user";

export class UserRepository extends Repository {
	constructor() {
		super();
	}

	public async all() {
		try {
			return await User.query();
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async create(data: CreateUser) {
		try {
			return await User.query().insertGraphAndFetch(data);
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async findById(id: number) {
		try {
			return await User.query().findById(id);
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async findOne(column: string, value: any) {
		try {
			return await User.query().findOne(column, value);
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async updateById(id: number, data: UserEditable) {
		try {
			return await User.query().updateAndFetchById(id, data);
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async deleteById(id: number) {
		try {
			return (await User.query().deleteById(id)) > 0;
		} catch (error) {
			this.errorlog(error);
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
			this.errorlog(error);
			return false;
		}
	}

	public async count(column: string, value: any) {
		try {
			return await this.DB.count(User.query().findOne(column, value));
		} catch (error) {
			this.errorlog(error);
			return 0;
		}
	}
}
