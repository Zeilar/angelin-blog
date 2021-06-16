import { Model } from "objection";
import { Post, Tag } from "./";

export class PostTag extends Model {
	public static tableName = "posts_tags";

	public readonly id!: number;
	public readonly post_id!: number;
	public readonly tag_id!: number;
	public readonly created_at!: string;
	public readonly updated_at!: string;

	public static relationships = {
		post: true,
		tag: true,
	};

	public static relationMappings() {
		return {
			post: {
				relation: Model.BelongsToOneRelation,
				modelClass: Post,
				join: {
					from: "posts_tags.post_id",
					to: "posts.id",
				},
			},
			tag: {
				relation: Model.BelongsToOneRelation,
				modelClass: Tag,
				join: {
					from: "posts_tags.tag_id",
					to: "tags.id",
				},
			},
		};
	}
}
