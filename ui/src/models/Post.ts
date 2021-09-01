import { Request } from "../utils";
import { Response } from "../types/request";
import { User, Tag, Comment } from ".";

interface PostCredentials {
	title: string;
	body: string;
}

interface PostProps {
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

interface FakePostProps {
	title: string;
	body: string;
	author: User;
}

export class Post implements PostProps {
	public get id() {
		return this._props.id;
	}

	public get user_id() {
		return this._props.user_id;
	}

	public get title() {
		return this._props.title;
	}

	public get body() {
		return this._props.body;
	}

	public get created_at() {
		return this._props.created_at;
	}

	public get updated_at() {
		return this._props.updated_at;
	}

	public get author() {
		return this._props.author;
	}

	public get tags() {
		return this._props.tags;
	}

	public get comments() {
		return this._props.comments;
	}

	constructor(private readonly _props: PostProps) {}

	private static dto(query: Response<Post>) {
		if (query.ok && query.data) {
			query.data = new Post(query.data);
		}
		return query;
	}

	public static fake({ title, body, author }: FakePostProps) {
		const now = new Date().toISOString();
		return new Post({
			id: 0,
			title,
			body,
			author,
			user_id: author.id,
			created_at: now,
			updated_at: now,
			comments: [],
			tags: [],
		});
	}

	public static async create(post: PostCredentials) {
		const query = await Request.post<Post>({ url: "", method: "POST", body: post });
		return this.dto(query);
	}

	public async edit(post: PostCredentials) {
		return await Request.post<Post>({ url: `${this.id}`, method: "PUT", body: post });
	}

	public async destroy() {
		return await Request.post<Post>({ url: `${this.id}`, method: "DELETE" });
	}
}
