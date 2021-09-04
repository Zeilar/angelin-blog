import { TagRepository } from "./TagRepository";
import { Post, Tag } from "../db/models";
import { injectable } from "inversify";
import { hash } from "bcrypt";
import { PAGE_SIZE } from "../api/utils";
import { DB } from "../db/utils/DB";
import { Logger } from "../utils";
import { Transaction } from "objection";
// import { CreatePost } from "../types/post"

@injectable()
export class PostRepository {
	constructor(
		public readonly db: DB,
		public readonly logger: Logger,
		public readonly tagRepository: TagRepository
	) {}

	public async all(page: number = 1, perPage: number = PAGE_SIZE) {
		try {
			const { results } = await Post.query()
				.withGraphFetched(Post.relationships)
				.page(page, perPage);
			return results;
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	// public async create(data: CreatePost) {
	// 	try {
	// 		return Post.query().insertGraphAndFetch(data);
	// 	} catch (error) {
	// 		this.logger.error(error);
	// 		return null;
	// 	}
	// }

	public async findById(id: number | string) {
		try {
			return Post.query().findById(id).withGraphFetched(Post.relationships);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async findOne(column: keyof Post, value: string | number) {
		try {
			return Post.query().findOne(column, value).withGraphFetched(Post.relationships);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	// public async updateById(id: number, data: PostEditable) {
	// 	if (data.password) {
	// 		data.password = await hash(data.password, 10);
	// 	}

	// 	try {
	// 		return Post.query().updateAndFetchById(id, data);
	// 	} catch (error) {
	// 		this.logger.error(error);
	// 		return null;
	// 	}
	// }

	public async deleteById(post: Post | number | string, trx?: Transaction) {
		try {
			if (typeof post === "object") {
				await post.$query(trx).delete();
			} else {
				await Post.query(trx).deleteById(post);
			}
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async deleteMany(posts: Post[]) {
		try {
			for (const post of posts) {
				if (!(await this.deleteById(post))) {
					throw new Error(`Failed deleting post with id ${post?.id}`);
				}
			}
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async countWhere(column: keyof Post, value: string | number) {
		try {
			return this.db.count(Post.query().findOne(column, value));
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	public async count() {
		try {
			return this.db.count(Post.query());
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	/**
	 * @description Filter posts via search (body, title) or tags
	 */
	public async filter(args: { search?: string; tags?: string[]; page: number; perPage: number }) {
		try {
			let query = Post.query();
			if (args.search) {
				query = query
					.where("body", "like", `%${args.search}%`)
					.orWhere("title", "like", `%${args.search}%`);
			}
			if (args.tags) {
				query = query
					.innerJoin("posts_tags", "posts_tags.post_id", "posts.id")
					.innerJoin("tags", "tags.id", "posts_tags.tag_id")
					.whereIn("tags.name", args.tags);
			}
			const { results } = await query
				.withGraphFetched(Post.relationships)
				.page(args.page, args.perPage)
				.execute();
			return results;
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	public async unrelateTags(post: Post, trx?: Transaction) {
		try {
			await post.$relatedQuery("tags", trx).unrelate();
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async relateTag(post: Post, tag: Tag) {
		try {
			await post.$relatedQuery("tags").relate(tag);
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async addTags(post: Post, tags: string[]) {
		try {
			if (!(await this.unrelateTags(post))) {
				throw new Error(`Failed to unrelate tags for post ${post}.`);
			}
			const fetchedTags = await this.tagRepository.findOrCreate(tags);
			for (const tag of fetchedTags) {
				if (!(await this.relateTag(post, tag))) {
					throw new Error(`Failed to relate tag: ${tag} on post ${post}.`);
				}
			}
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}

	public async deleteAndUnrelateById(id: number | string) {
		try {
			const post = await this.findById(id);
			if (!post) {
				throw new Error(`Failed deleting post with id ${id}, not found.`);
			}
			return Post.transaction(async trx => {
				await this.unrelateTags(post, trx);
				await this.deleteById(post);
				return true;
			});
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}
}
