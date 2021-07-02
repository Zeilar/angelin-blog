import { Model } from "objection";
import { NumberHelpers } from "../../api/utils";
import { Post, Comment } from "./";

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

	public getAvatar() {
		return this.avatar;
	}

	public $afterGet() {
		this.avatar = this.getAvatar();
		if (this.github_id) {
			this.github_id = NumberHelpers.int(this.github_id);
		}
		this.oauth = Boolean(this.oauth);
		this.is_admin = Boolean(this.is_admin);
	}
}
