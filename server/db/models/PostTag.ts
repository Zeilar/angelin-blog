import { Model } from "objection";
import { Post, Tag } from "./";

export class PostTag extends Model {
	public static tableName = "posts_tags";

	public id!: number;
	public post_id!: number;
	public tag_id!: number;
	public created_at!: string;
	public updated_at!: string;

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
