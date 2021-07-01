import { Model } from "objection";
import { Post, Comment } from "./";

export class User extends Model {
	public static tableName = "users";

	public id!: number;
	public email!: string;
	public is_admin!: number | boolean;
	public password?: string;
	public avatar?: string;
	public oauth?: string;
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
		this.is_admin = Boolean(this.is_admin);
		this.avatar = this.getAvatar();
		return this;
	}

	public getAvatar() {
		return this.avatar;
	}
}
