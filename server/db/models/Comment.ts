import { Model } from "objection";
import { Post, User } from "./";

export class Comment extends Model {
	public static tableName = "comments";

	public readonly id!: number;
	public post_id!: number;
	public user_id!: number;
	public body!: string;
	public readonly created_at!: string;
	public readonly updated_at!: string;
	public post!: Post;
	public author!: User;

	public static relationships = {
		author: true,
		post: true,
	};

	public static relationMappings() {
		return {
			author: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "comments.user_id",
					to: "users.id",
				},
			},
			post: {
				relation: Model.BelongsToOneRelation,
				modelClass: Post,
				join: {
					from: "comments.post_id",
					to: "posts.id",
				},
			},
		};
	}

	/**
	 * @description Removes sensitive information and converts is_admin from boolean to integer
	 */
	public sanitize() {
		if (!this.author) return this;
		delete this.author.password;
		this.author.is_admin = Boolean(Number(this.author.is_admin));
		return this;
	}
}
