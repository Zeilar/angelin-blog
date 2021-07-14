import { Model } from "objection";
import { PostPolicy, PostAction } from "../../api/policies";
import errorlog from "../../utils/errorlog";
import { Tag, User, Comment } from "./";

export class Post extends Model {
	public static tableName = "posts";

	public id!: number;
	public user_id!: number;
	public title!: string;
	public body!: string;
	public created_at!: string;
	public updated_at!: string;
	public author!: User;
	public comments?: Comment[];
	public tags?: Tag[];

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
	 * @description Uses the policy class system
	 * @example can(user, post, "edit") // expected output: boolean
	 */
	public static can(user: User, post: Post, ...actions: PostAction[]) {
		return new PostPolicy(user, post).can(...actions);
	}

	/**
	 * @description Filter posts via search (body, title) or tags
	 * @example await Post.filter("hello world", ["programming"]);
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

	public $afterGet() {
		if (!this.author) return;
		this.author = this.author.dto();
	}
}
