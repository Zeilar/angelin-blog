import { PasswordReset } from "../db/models";
import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { DateHelpers } from "../api/utils";

@injectable()
export class PasswordResetRepository {
	public create(user_id: number) {
		return PasswordReset.query().insertAndFetch({
			user_id,
			token: uuidv4(),
		});
	}

	public findOne(column: keyof PasswordReset, value: string | number) {
		return PasswordReset.query()
			.findOne(column, value)
			.withGraphFetched(PasswordReset.relationships);
	}

	public async deleteById(id: number | string) {
		await PasswordReset.query().deleteById(id);
	}

	/**
	 * @description Delete password resets that would be inactive anyway, default threshold is 24 hours
	 */
	public async deleteInactive() {
		await PasswordReset.query()
			.where("created_at", "<", DateHelpers.subDays(1).getDate())
			.delete();
	}
}
