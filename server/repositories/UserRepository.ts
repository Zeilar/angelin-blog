import { User } from "../db/models";
import { Repository } from "./Repository";

interface UserEditable {
	email?: string;
	password?: string;
	avatar?: string;
	is_admin?: boolean;
	oath?: boolean;
}

export class UserRepository extends Repository {
	constructor() {
		super();
	}

	public async all(): Promise<{ users?: User[]; error?: Error }> {
		try {
			return { users: await User.query() };
		} catch (error) {
			this.errorlog(error);
			return { error };
		}
	}

	public async create(data: UserEditable): Promise<{ user?: User; error?: Error }> {
		try {
			return { user: await User.query().insertGraphAndFetch(data) };
		} catch (error) {
			this.errorlog(error);
			return { error };
		}
	}

	public async findById(id: number): Promise<{ user?: User | null; error?: Error }> {
		try {
			return { user: await User.query().findById(id) };
		} catch (error) {
			this.errorlog(error);
			return { error };
		}
	}

	public async findOne(
		column: string,
		value: any
	): Promise<{ user?: User | null; error?: Error }> {
		try {
			return { user: await User.query().findOne(column, value) };
		} catch (error) {
			this.errorlog(error);
			return { error };
		}
	}

	public async updateById(
		id: number,
		data: UserEditable
	): Promise<{ user?: User; error?: Error }> {
		try {
			return { user: await User.query().updateAndFetchById(id, data) };
		} catch (error) {
			this.errorlog(error);
			return { error };
		}
	}

	public async deleteById(id: number): Promise<{ success: boolean; error?: Error }> {
		try {
			const deletedRows = await User.query().deleteById(id);
			return { success: deletedRows > 0 };
		} catch (error) {
			this.errorlog(error);
			return { success: false, error };
		}
	}

	public async deleteMany(users: User[]): Promise<{ success: boolean; error?: Error }> {
		try {
			for (const user of users) {
				await this.deleteById(user.id);
			}
			return { success: true };
		} catch (error) {
			this.errorlog(error);
			return { success: false, error };
		}
	}

	public async count(column: string, value: any) {
		return await this.DB.count(User.query().findOne(column, value));
	}
}
