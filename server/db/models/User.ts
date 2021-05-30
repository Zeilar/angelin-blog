import { Model, RelationMappings } from "objection";
import { Post } from "./Post";
import { Comment } from "./Comment";

export class User extends Model {
	public static tableName: string = "users";

	public readonly id: number;
	public email: string;
	public is_admin: boolean = false;
	public password: string;
	public readonly created_at: string;
	public updated_at: string;

	// public static jsonSchema = {
	// 	type: "object",
	// 	properties: {
	// 		id: { type: "integer" },
	// 		email: { type: "string" },
	// 		password: { type: "string" },
	// 		is_admin: { type: "boolean" },
	// 		created_at: { type: "timestamp" },
	// 		updated_at: { type: "timestamp" },
	// 	},
	// };

	public static relationMappings(): RelationMappings {
		return {
			posts: {
				relation: Model.HasManyRelation,
				modelClass: Post,
				join: {
					from: "users.id",
					to: "posts.user_id",
				},
			},
			comments: {
				relation: Model.HasManyRelation,
				modelClass: Comment,
				join: {
					from: "users.id",
					to: "comments.user_id",
				},
			},
		};
	}
}
