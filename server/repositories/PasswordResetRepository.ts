import { PasswordReset } from "../db/models";
import { Repository } from "./Repository";
import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class PasswordResetRepository extends Repository {
	constructor() {
		super();
	}

	public async create(user_id: number) {
		try {
			return await PasswordReset.query().insertAndFetch({
				user_id,
				token: uuidv4(),
			});
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async findOne(column: keyof PasswordReset, value: string | number) {
		try {
			return await PasswordReset.query()
				.findOne(column, value)
				.withGraphFetched(PasswordReset.relationships);
		} catch (error) {
			this.errorlog(error);
			return null;
		}
	}

	public async deleteById(id: number | string) {
		try {
			return (await PasswordReset.query().deleteById(id)) > 0;
		} catch (error) {
			this.errorlog(error);
			return false;
		}
	}
}
