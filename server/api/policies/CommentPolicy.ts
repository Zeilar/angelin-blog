import { Comment, User } from "../../db/models";
import { Policy, PolicyChild, Policies } from "./Policy";

export type CommentAction = "create" | "delete" | "edit";

export class CommentPolicy extends Policy<CommentAction> implements PolicyChild {
	public readonly user;
	public readonly comment;

	public readonly policies: Policies = {
		edit: () => this.editOrDelete(),
		delete: () => this.editOrDelete(),
		create: () => this.create(),
	};

	constructor(user?: User, comment?: Comment) {
		super();
		this.user = user;
		this.comment = comment;
	}

	protected create() {
		if (this.user) return true;
		return false;
	}

	protected editOrDelete() {
		if (!this.user || !this.comment) return false;
		if (this.user.is_admin) return true;
		return this.user.id === this.comment.author.id;
	}
}
