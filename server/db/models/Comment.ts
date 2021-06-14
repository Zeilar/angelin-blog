import { CommentSchema } from "../types/modelSchemas";
import { Model } from "objection";
import { Post } from "./Post";
import { User } from "./User";

export class Comment extends Model implements CommentSchema {
	public static tableName = "comments";

	public readonly id = 0;
	public post_id = 0;
	public user_id = 0;
	public body = "";
	public readonly created_at = "";
	public readonly updated_at = "";
	public post = {};
	public author = {};

	public static relationships = {
		author: true,
		post: true,
	};

	public static relationMappings() {
		return {
			author: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "comments.user_id",
					to: "users.id",
				},
			},
			post: {
				relation: Model.BelongsToOneRelation,
				modelClass: Post,
				join: {
					from: "comments.post_id",
					to: "posts.id",
				},
			},
		};
	}
}
