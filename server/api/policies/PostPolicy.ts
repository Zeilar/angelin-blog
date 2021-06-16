import { User, Post } from "../../db/models";
import Policy, { PolicyChild, Policies } from "./Policy";

export type PostAction = "create" | "delete" | "edit";

export class PostPolicy extends Policy<PostAction> implements PolicyChild {
	public readonly user;
	public readonly post;

	public readonly policies: Policies = {
		edit: () => this.editOrDelete(),
		delete: () => this.editOrDelete(),
		create: () => this.create(),
	};

	constructor(user?: User, post?: Post) {
		super();
		this.user = user;
		this.post = post;
	}

	protected create() {
		if (this.user) return true;
		return false;
	}

	protected editOrDelete() {
		if (!this.user || !this.post) return false;
		if (this.user.is_admin) return true;
		return this.user.id === this.post.author.id;
	}
}
