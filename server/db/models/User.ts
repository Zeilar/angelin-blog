import { Model } from "objection";
import { UserPolicy } from "../../api/policies";
import { NumberHelpers } from "../../api/utils";
import { Post, Comment } from "./";
import { UserAction } from "../../api/policies/UserPolicy";

export class User extends Model {
	public static tableName = "users";

	public id!: number;
	public email!: string;
	public is_admin!: boolean;
	public password?: string;
	public avatar?: string | null;
	public oauth?: boolean;
	public github_id?: number | string;
	public created_at!: string;
	public updated_at!: string;
	public posts?: Post[];
	public comments?: Comment[];

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

	public dto() {
		delete this.password;
		return this;
	}

	private getAvatar() {
		return this.avatar; // Do some logic here with local and OAuth paths
	}

	public $afterGet() {
		this.avatar = this.getAvatar();
		if (this.github_id) {
			this.github_id = NumberHelpers.int(this.github_id);
		}
		this.oauth = Boolean(this.oauth);
		this.is_admin = Boolean(this.is_admin);
	}

	/**
	 * @description Uses the policy class system
	 * @example can(user, model, "edit") // expected output: boolean
	 */
	public static can(user: User, model: User, ...actions: UserAction[]) {
		return new UserPolicy(user, model).can(...actions);
	}
}
