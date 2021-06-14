import { CommentSchema, PostSchema } from "../types/modelSchemas";
import { Model } from "objection";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";

export class Post extends Model implements PostSchema {
	public static tableName = "posts";

	public readonly id = 0;
	public user_id = 0;
	public title = "";
	public body = "";
	public readonly created_at = "";
	public readonly updated_at = "";
	public author = {};
	public comments?: CommentSchema[];

	public static relationships = {
		author: true,
		comments: true,
		tags: true,
	};

	public static relationMappings() {
		return {
			author: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "posts.user_id",
					to: "users.id",
				},
			},
			tags: {
				relation: Model.ManyToManyRelation,
				modelClass: Tag,
				join: {
					from: "posts.id",
					through: {
						from: "posts_tags.post_id",
						to: "posts_tags.tag_id",
					},
					to: "tags.id",
				},
			},
			comments: {
				relation: Model.HasManyRelation,
				modelClass: Comment,
				join: {
					from: "posts.id",
					to: "comments.post_id",
				},
			},
		};
	}
}
