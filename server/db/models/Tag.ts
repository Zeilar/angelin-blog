import { Model, RelationMappings } from "objection";
import { Post } from "./Post";
import * as ModelTypes from "../types/models";

export class Tag extends Model implements ModelTypes.Tag {
	public static tableName: string = "tags";

	public readonly id: number;
	public name: string;
	public readonly created_at: string;
	public updated_at: string;
	public posts?: ModelTypes.Post[];

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
