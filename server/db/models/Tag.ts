import { Model } from "objection";
import { Post } from "./";

export class Tag extends Model {
	public static tableName = "tags";

	public readonly id!: number;
	public name!: string;
	public readonly created_at!: string;
	public readonly updated_at!: string;
	public posts?: Post[];

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
