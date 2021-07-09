import { Post, User } from ".";
import { Response } from "../types/request";

interface CommentProps {
	id: number;
	body: string;
	created_at: string;
	updated_at: string;
	author: User;
	post: Post;
}

export class Comment implements CommentProps {
	public get id() {
		return this._props.id;
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
	public get post() {
		return this._props.post;
	}

	constructor(private readonly _props: CommentProps) {}

	private static dto(query: Response<Comment>) {
		if (query.ok && query.data) {
			query.data = new Comment(query.data);
		}
		return query;
	}
}
