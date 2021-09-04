import { PasswordReset } from "../db/models";
import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { DateHelpers } from "../api/utils";
import { Logger } from "../utils";

@injectable()
export class PasswordResetRepository {
	constructor(public readonly logger: Logger) {}

	public async create(user_id: number) {
		try {
			return PasswordReset.query().insertAndFetch({
				user_id,
				token: uuidv4(),
			});
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async findOne(column: keyof PasswordReset, value: string | number) {
		try {
			return PasswordReset.query()
				.findOne(column, value)
				.withGraphFetched(PasswordReset.relationships);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async deleteById(id: number | string) {
		try {
			await PasswordReset.query().deleteById(id);
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	/**
	 * @description Delete password resets that would be inactive anyway, default threshold is 24 hours
	 */
	public async deleteInactive() {
		try {
			await PasswordReset.query()
				.where("created_at", "<", DateHelpers.subDays(1).getDate())
				.delete();
		} catch (error) {
			this.logger.error(error);
		}
	}
}
