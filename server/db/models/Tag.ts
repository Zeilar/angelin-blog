import { PostSchema, TagSchema } from "../types/modelSchemas";
import { Model } from "objection";
import { Post } from "./Post";

export class Tag extends Model implements TagSchema {
	public static tableName = "tags";

	public readonly id = 0;
	public name = "";
	public readonly created_at = "";
	public readonly updated_at = "";
	public posts?: PostSchema[];

	public static relationships = {
		posts: true,
	};

	public static relationMappings() {
		return {
			posts: {
				relation: Model.ManyToManyRelation,
				modelClass: Post,
				join: {
					from: "posts.id",
					through: {
						from: "posts_tags.tag_id",
						to: "posts_tags.post_id",
					},
					to: "tags.id",
				},
			},
		};
	}
}
