import { PasswordReset } from "../db/models";
import { Repository } from "./Repository";
import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { DateHelpers } from "../api/utils";

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
			await PasswordReset.query().deleteById(id);
			return true;
		} catch (error) {
			this.errorlog(error);
			return false;
		}
	}

	/**
	 * @description Delete password resets that would be inactive anyway, default threshold is 24 hours
	 */
	public async deleteInactive() {
		try {
			await PasswordReset.query()
				.where("created_at", "<", DateHelpers.subDays(1).get())
				.delete();
		} catch (error) {
			this.errorlog(error);
		}
	}
}
