import { Post } from "./";
import { Response } from "../types/request";

interface TagProps {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	posts?: Post[];
}

export class Tag implements TagProps {
	public get id() {
		return this._props.id;
	}

	public get name() {
		return this._props.name;
	}

	public get created_at() {
		return this._props.created_at;
	}

	public get updated_at() {
		return this._props.updated_at;
	}

	public get posts() {
		return this._props.posts;
	}

	constructor(private readonly _props: TagProps) {}

	private static dto(query: Response<Tag>) {
		if (query.ok && query.data) {
			query.data = new Tag(query.data);
		}
		return query;
	}
}
