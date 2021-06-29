import { Model } from "objection";
import errorlog from "../../utils/errorlog";
import { Tag, User, Comment } from "./";

export class Post extends Model {
	public static tableName = "posts";

	public readonly id!: number;
	public readonly user_id!: number;
	public title!: string;
	public body!: string;
	public readonly created_at!: string;
	public readonly updated_at!: string;
	public readonly author!: User;
	public readonly comments?: Comment[];
	public readonly tags?: Tag[];

	public static relationships = {
		author: true,
		comments: true,
		tags: true,
	};

	public static relationMappings() {
		return {
			author: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "posts.user_id",
					to: "users.id",
				},
			},
			tags: {
				relation: Model.ManyToManyRelation,
				modelClass: Tag,
				join: {
					from: "posts.id",
					through: {
						from: "posts_tags.post_id",
						to: "posts_tags.tag_id",
					},
					to: "tags.id",
				},
			},
			comments: {
				relation: Model.HasManyRelation,
				modelClass: Comment,
				join: {
					from: "posts.id",
					to: "comments.post_id",
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
		this.author.is_admin = Boolean(this.author.is_admin);
		return this;
	}

	/**
	 * @description Filter posts via search (body, title) or tags
	 * @example const filtered = await Post.filter("hello world", ["programming"]);
	 */
	public static async filter(search?: string, tags?: string[]) {
		try {
			let query = Post.query();
			if (search) {
				query = query
					.where("body", "like", `%${search}%`)
					.orWhere("title", "like", `%${search}%`);
			}
			if (tags) {
				query = query
					.innerJoin("posts_tags", "posts_tags.post_id", "posts.id")
					.innerJoin("tags", "tags.id", "posts_tags.tag_id")
					.whereIn("tags.name", tags);
			}
			return await query.withGraphFetched(Post.relationships).execute();
		} catch (error) {
			errorlog(error);
			return [];
		}
	}
}
