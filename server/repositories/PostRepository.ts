import { HTTPError } from "./../utils/HTTPError";
import { User } from "./../db/models/User";
import { TagRepository } from "./TagRepository";
import { Post, Tag } from "../db/models";
import { injectable } from "inversify";
import { hash } from "bcrypt";
import { PAGE_SIZE } from "../api/utils";
import { DB } from "../db/utils/DB";
import { Transaction } from "objection";
// import { CreatePost } from "../types/post"

@injectable()
export class PostRepository {
	constructor(public readonly db: DB, public readonly tagRepository: TagRepository) {}

	public async all(page: number = 1, perPage: number = PAGE_SIZE) {
		const { results } = await Post.query()
			.withGraphFetched(Post.relationships)
			.page(page, perPage);
		return results;
	}

	// public create(data: CreatePost) {
	// 		return Post.query().insertGraphAndFetch(data);
	// }

	public findById(id: number | string) {
		return Post.query().findById(id).withGraphFetched(Post.relationships);
	}

	public findOne(column: keyof Post, value: string | number) {
		return Post.query().findOne(column, value).withGraphFetched(Post.relationships);
	}

	// public async updateById(id: number, data: PostEditable) {
	// 	if (data.password) {
	// 		data.password = await hash(data.password, 10);
	// 	}

	// 		return Post.query().updateAndFetchById(id, data);
	// }

	public async deleteById(post: Post | number | string, trx?: Transaction) {
		if (typeof post === "object") {
			await post.$query(trx).delete();
		} else {
			await Post.query(trx).deleteById(post);
		}
	}

	public async deleteMany(posts: Post[]) {
		for (const post of posts) {
			await this.deleteById(post);
		}
	}

	public countWhere(column: keyof Post, value: string | number) {
		return this.db.count(Post.query().findOne(column, value));
	}

	public count() {
		return this.db.count(Post.query());
	}

	/**
	 * @description Filter posts via search (body, title) or tags
	 */
	public async filter(args: { search?: string; tags?: string[]; page: number; perPage: number }) {
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
	}

	public async unrelateTags(post: Post, trx?: Transaction) {
		await post.$relatedQuery("tags", trx).unrelate();
	}

	public async relateTag(post: Post, tag: Tag) {
		await post.$relatedQuery("tags").relate(tag);
	}

	public async addTags(post: Post, tags: string[]) {
		await this.unrelateTags(post);
		const fetchedTags = await this.tagRepository.findOrCreate(tags);
		for (const tag of fetchedTags) {
			await this.relateTag(post, tag);
		}
	}

	public async deleteAndUnrelateById(id: number | string) {
		const post = await this.findById(id);
		if (!post) {
			throw new HTTPError(`Failed deleting post with id ${id}, not found.`, 404);
		}
		await Post.transaction(async trx => {
			await this.unrelateTags(post, trx);
			await this.deleteById(post);
		});
	}
}
