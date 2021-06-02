import { UserSchema, CommentSchema, PostSchema } from "../types/modelSchemas";
import { Model, RelationMappings } from "objection";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";

export class Post extends Model implements PostSchema {
	public static tableName: string = "posts";

	public readonly id: number;
	public user_id: number;
	public title: string;
	public body: string;
	public readonly created_at: string;
	public readonly updated_at: string;
	public author: UserSchema;
	public comments?: CommentSchema[];

	public static relationships: object = {
		author: true,
		comments: true,
		tags: true,
	};

	public static relationMappings(): RelationMappings {
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
