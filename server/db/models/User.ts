import { Model } from "objection";
import { Post, Comment } from "./";

export class User extends Model {
	public static tableName = "users";

	public readonly id!: number;
	public email!: string;
	public is_admin!: number | boolean;
	public password?: string;
	public avatar?: string;
	public readonly created_at!: string;
	public readonly updated_at!: string;
	public readonly posts?: Post[];
	public readonly comments?: Comment[];

	public static relationships = {
		posts: true,
		comments: true,
	};

	public static relationMappings() {
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

	/**
	 * @description Removes sensitive information and converts is_admin from boolean to integer
	 */
	public sanitize() {
		delete this.password;
		this.is_admin = Boolean(this.is_admin);
		return this;
	}
}
