import { LoginCredentials, Response } from "../types/request";
import { Request } from "../utils";
import { Post } from "./Post";

interface UserProps {
	id: number;
	email: string;
	is_admin: boolean;
	avatar: string;
	created_at: string;
	updated_at: string;
	github_id: string | null;
	posts?: Post[];
	comments?: Comment[];
}

interface UserEditable {
	email?: string;
	password?: string;
}

export class User implements UserProps {
	public get id() {
		return this._props.id;
	}

	public get email() {
		return this._props.email;
	}

	public get is_admin() {
		return this._props.is_admin;
	}

	public get avatar() {
		return this._props.avatar;
	}

	public get created_at() {
		return this._props.created_at;
	}

	public get updated_at() {
		return this._props.updated_at;
	}

	public get github_id() {
		return this._props.github_id;
	}

	public get posts() {
		return this._props.posts;
	}

	public get comments() {
		return this._props.comments;
	}

	constructor(private readonly _props: UserProps) {}

	private static dto(query: Response<User>) {
		if (query.ok && query.data) {
			query.data = new User(query.data);
		}
		return query;
	}

	public async update({ email, password }: UserEditable) {}

	public static async login(user: LoginCredentials) {
		const query = await Request.auth<User>({
			url: "login",
			method: "POST",
			body: user,
		});
		return User.dto(query);
	}

	public static async register(user: LoginCredentials) {
		const query = await Request.auth<User>({
			url: "register",
			method: "POST",
			body: user,
		});
		return User.dto(query);
	}

	public static async authenticate() {
		const query = await Request.auth<User>({ url: "authenticate" });
		return User.dto(query);
	}

	public static async logout() {
		return await Request.auth<User>({ url: "logout" });
	}
}
