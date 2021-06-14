import { UserSchema, PostSchema, CommentSchema } from "../types/modelSchemas";
import { Model } from "objection";
import { Post } from "./Post";
import { Comment } from "./Comment";

export class User extends Model implements UserSchema {
	public static tableName = "users";

	public readonly id = 0;
	public email = "";
	public is_admin: number | boolean = 0;
	public password?: string;
	public readonly created_at = "";
	public readonly updated_at = "";
	public posts?: PostSchema[];
	public comments?: CommentSchema[];

	public static relationships = {
		posts: true,
		comments: true,
	};

	public static relationMappings() {
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
