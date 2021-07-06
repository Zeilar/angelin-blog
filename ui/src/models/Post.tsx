import { Request } from "../utils";
import { Response } from "../types/request";
import { User, Tag } from "./";
import { Comment } from "./Comment";

interface PostCredentials {
	title: string;
	body: string;
}

interface PostSchema {
	id: number;
	user_id: number;
	title: string;
	body: string;
	created_at: string;
	updated_at: string;
	author: User;
	tags: Tag[];
	comments: Comment[];
}

export class Post implements PostSchema {
	public id: number;
	public user_id: number;
	public title: string;
	public body: string;
	public created_at: string;
	public updated_at: string;
	public author: User;
	public tags: Tag[];
	public comments: Comment[];

	constructor(post: PostSchema) {
		this.id = post.id;
		this.title = post.title;
		this.body = post.body;
		this.created_at = post.created_at;
		this.updated_at = post.updated_at;
		this.author = post.author;
		this.tags = post.tags;
		this.comments = post.comments;
	}

	private static queryHandler(query: Response<Post>) {
		if (query.ok && query.data) {
			query.data = new Post(query.data);
		}
		return query;
	}

	public static async create(post: PostCredentials) {
		const query = await Request.post<Post>({ url: "", method: "POST", body: post });
		return Post.queryHandler(query);
	}
}
