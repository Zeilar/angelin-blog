import { PostSchema, TagSchema } from "../types/modelSchemas";
import { Model, RelationMappings } from "objection";
import { Post } from "./Post";

export class Tag extends Model implements TagSchema {
	public static tableName: string = "tags";

	public readonly id!: number;
	public name!: string;
	public readonly created_at!: string;
	public readonly updated_at!: string;
	public posts?: PostSchema[];

	public static relationships: object = {
		posts: true,
	};

	public static relationMappings(): RelationMappings {
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
