import { Model } from "objection";
import { CommentPolicy, CommentAction } from "../../api/policies";
import { Post, User } from "./";

export class Comment extends Model {
	public static tableName = "comments";

	public id!: number;
	public post_id!: number;
	public user_id!: number;
	public body!: string;
	public created_at!: string;
	public updated_at!: string;
	public author!: User;
	public post?: Post;

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
	public static can(user: User, comment: Comment, ...actions: CommentAction[]) {
		return new CommentPolicy(user, comment).can(...actions);
	}

	public $afterGet() {
		if (!this.author) return;
		this.author = this.author.dto();
	}
}
