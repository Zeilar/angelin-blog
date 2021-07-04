import { User } from "../../db/models";
import { Policy, PolicyChild, Policies } from "./Policy";

export type UserAction = "delete" | "edit";

export class UserPolicy extends Policy<UserAction> implements PolicyChild {
	public readonly user;
	public readonly model;

	public readonly policies: Policies = {
		edit: () => this.editOrDelete(),
		delete: () => this.editOrDelete(),
	};

	constructor(user: User, model: User) {
		super();
		this.user = user;
		this.model = model;
	}

	protected create() {
		if (this.user) return true;
		return false;
	}

	protected editOrDelete() {
		if (!this.user || !this.model) return false;
		if (this.user.is_admin) return true;
		return this.user.id === this.model.id;
	}
}
