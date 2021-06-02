import { Comment, User } from "../../db/models";
import Policy, { PolicyChild, Policies } from "./Policy";

type Actions = "create" | "delete" | "edit";

export default class CommentPolicy extends Policy<Actions> implements PolicyChild {
	public readonly user: User;
	public readonly comment: Comment;

	public readonly policies: Policies = {
		edit: () => this.editOrDelete(),
		delete: () => this.editOrDelete(),
		create: () => this.create(),
	};

	constructor(user: User, comment: Comment) {
		super();
		this.user = user;
		this.comment = comment;
	}

	protected create(): boolean {
		if (this.user) return true;
	}

	protected editOrDelete(): boolean {
		if (this.user.is_admin) return true;
		return this.user.id === this.comment.author.id;
	}
}
