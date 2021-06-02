import { Model, RelationMappings } from "objection";
import { Post } from "./Post";
import { Comment } from "./Comment";
import * as ModelTypes from "../types/models";

export class User extends Model implements ModelTypes.User {
	public static tableName: string = "users";

	public readonly id: number;
	public email: string;
	public is_admin: number | boolean;
	public password?: string;
	public readonly created_at: string;
	public readonly updated_at: string;
	public posts?: ModelTypes.Post[];
	public comments?: ModelTypes.Comment[];

	public static relationships: object = {
		posts: true,
		comments: true,
	};

	public static relationMappings(): RelationMappings {
		return {
			posts: {
				relation: Model.HasManyRelation,
				modelClass: Post,
				join: {
					from: "users.id",
					to: "posts.user_id",
				},
			},
			comments: {
				relation: Model.HasManyRelation,
				modelClass: Comment,
				join: {
					from: "users.id",
					to: "comments.user_id",
				},
			},
		};
	}
}
