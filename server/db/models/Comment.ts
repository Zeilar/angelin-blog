import { Model, RelationMappings } from "objection";
import { Post } from "./Post";
import { User } from "./User";

export class Comment extends Model {
	public static tableName: string = "comments";

	public readonly id: number;
	public post_id: number;
	public user_id: number;
	public body: string;
	public readonly created_at: string;
	public updated_at: string;

	public static relationMappings(): RelationMappings {
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
