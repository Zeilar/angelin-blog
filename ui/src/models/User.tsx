import { LoginCredentials, Response } from "../types/request";
import { Request } from "../utils";
import { Post } from "./Post";

interface UserSchema {
	id: number;
	email: string;
	is_admin: boolean;
	created_at: string;
	updated_at: string;
	posts?: Post[];
	comments?: Comment[];
}

interface UserEditable {
	email?: string;
	password?: string;
}

export class User implements UserSchema {
	public id: number;
	public email: string;
	public is_admin: boolean;
	public created_at: string;
	public updated_at: string;
	public posts?: Post[];
	public comments?: Comment[];

	constructor(user: UserSchema) {
		this.id = user.id;
		this.email = user.email;
		this.is_admin = user.is_admin;
		this.created_at = user.created_at;
		this.updated_at = user.updated_at;
		this.posts = user.posts;
		this.comments = user.comments;
	}

	private static queryHandler(query: Response<User>) {
		if (query.code === 200 && query.data) {
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
		return User.queryHandler(query);
	}

	public static async register(user: LoginCredentials) {
		const query = await Request.auth<User>({
			url: "register",
			method: "POST",
			body: user,
		});
		return User.queryHandler(query);
	}

	public static async authenticate() {
		const query = await Request.auth<User>({ url: "authenticate" });
		return User.queryHandler(query);
	}

	public static async logout() {
		return await Request.auth({ url: "logout" });
	}
}
