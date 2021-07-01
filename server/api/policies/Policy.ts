import { User } from "../../db/models";
import errorlog from "../../utils/errorlog";

export interface Policies {
	[key: string]: () => boolean;
}

export interface PolicyChild {
	constructor: Function;
	policies: Policies;
	readonly user: User;
}

export class Policy<Action extends string> {
	public authorized = false;

	protected readonly policies: Policies = {};

	public can(...actions: Action[]) {
		try {
			for (const action of actions) {
				this.authorized = this.policies[action]();
				if (!this.authorized) break;
			}
		} catch (error) {
			errorlog(error);
		} finally {
			return this.authorized;
		}
	}
}
