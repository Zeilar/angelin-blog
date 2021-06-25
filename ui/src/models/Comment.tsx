import { User } from ".";
import { Response } from "../types/request";

interface CommentSchema {
	id: number;
	body: string;
	created_at: string;
	updated_at: string;
	author: User;
}

export class Comment implements CommentSchema {
	public id: number;
	public body: string;
	public created_at: string;
	public updated_at: string;
	public author: User;

	constructor(comment: CommentSchema) {
		this.id = comment.id;
		this.body = comment.body;
		this.created_at = comment.created_at;
		this.updated_at = comment.updated_at;
		this.author = comment.author;
	}

	private static queryHandler(query: Response<Comment>) {
		if (query.code === 200 && query.data) {
			query.data = new Comment(query.data);
		}
		return query;
	}
}
