import { User } from "../../db/models/User";
import { Post } from "../../db/models/Post";
import Policy from "./Policy";

export default class PostPolicy extends Policy {
	public authorized = false;

	protected user: User;
	protected post: Post;

	protected policies = {
		edit: () => this.editOrDelete(),
		delete: () => this.editOrDelete(),
		create: () => this.create(),
	};

	constructor(user: User, post: Post) {
		super();
		this.user = user;
		this.post = post;
	}

	protected create(): this {
		if (this.user) this.authorized = true;
		return this;
	}

	protected editOrDelete(): this {
		if (this.user.is_admin) {
			this.authorized = true;
		} else {
			this.authorized = this.user.id === this.post.author.id;
		}
		return this;
	}
}
