import { Model } from "objection";
import { CommentPolicy, CommentAction } from "../../api/policies";
import { Post, User } from "./";

export class Comment extends Model {
	public static tableName = "comments";

	public readonly id!: number;
	public readonly post_id!: number;
	public readonly user_id!: number;
	public body!: string;
	public readonly created_at!: string;
	public readonly updated_at!: string;
	public readonly post!: Post;
	public readonly author!: User;

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
	 * @description Uses the policy class system
	 * @example can(user, comment, "edit") // expected output: boolean
	 */
	public static can(user: User, comment: Comment, ...action: CommentAction[]) {
		return new CommentPolicy(user, comment).can(...action);
	}

	/**
	 * @description Removes sensitive information and converts is_admin from boolean to integer
	 */
	public sanitize() {
		if (!this.author) return this;
		delete this.author.password;
		this.author.is_admin = Boolean(this.author.is_admin);
		return this;
	}
}
