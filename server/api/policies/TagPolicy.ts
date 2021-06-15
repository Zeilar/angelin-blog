import { User, Tag } from "../../db/models";
import Policy, { PolicyChild, Policies } from "./Policy";

export type Action = "create" | "delete" | "edit";

export default class TagPolicy extends Policy<Action> implements PolicyChild {
	public readonly user;
	public readonly tag;

	public readonly policies: Policies = {
		edit: async () => this.editOrDelete(),
		delete: async () => this.editOrDelete(),
		create: () => this.create(),
	};

	constructor(user?: User, tag?: Tag) {
		super();
		this.user = user;
		this.tag = tag;
	}

	protected create() {
		if (this.user) return true;
		return false;
	}

	protected async editOrDelete() {
		if (!this.user || !this.tag) return false;
		if (this.user.is_admin) return true;
		return false;
		// return this.user.id === this.tag.posts TODO: Create pivot model
	}
}
