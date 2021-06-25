import { Post } from "./";
import { Response } from "../types/request";

interface TagSchema {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	posts?: Post[];
}

export class Tag implements TagSchema {
	public id: number;
	public name: string;
	public created_at: string;
	public updated_at: string;
	public posts?: Post[];

	constructor(tag: TagSchema) {
		this.id = tag.id;
		this.name = tag.name;
		this.created_at = tag.created_at;
		this.updated_at = tag.updated_at;
		this.posts = tag.posts;
	}

	private static queryHandler(query: Response<Tag>) {
		if (query.code === 200 && query.data) {
			query.data = new Tag(query.data);
		}
		return query;
	}
}
