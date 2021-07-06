import { Post, User } from ".";
import { Response } from "../types/request";

interface CommentSchema {
	id: number;
	body: string;
	created_at: string;
	updated_at: string;
	author?: User;
	post?: Post;
}

export class Comment implements CommentSchema {
	public id: number;
	public body: string;
	public created_at: string;
	public updated_at: string;
	public author?: User;
	public post?: Post;

	constructor(comment: CommentSchema) {
		this.id = comment.id;
		this.body = comment.body;
		this.created_at = comment.created_at;
		this.updated_at = comment.updated_at;
		this.author = comment.author;
		this.post = comment.post;
	}

	private static queryHandler(query: Response<Comment>) {
		if (query.ok && query.data) {
			query.data = new Comment(query.data);
		}
		return query;
	}
}
