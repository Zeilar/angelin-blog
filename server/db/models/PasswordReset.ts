import { Model } from "objection";
import { User } from "./";

export class PasswordReset extends Model {
	public static tableName = "password_resets";

	public id!: number;
	public token!: string;
	public user_id!: number;
	public created_at!: string;
	public user?: User;

	public static relationships = {
		user: true,
	};

	public static relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "users.id",
					to: "password_resets.user_id",
				},
			},
		};
	}
}
