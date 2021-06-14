import { UserSchema } from "../../db/types/modelSchemas";
import errorlog from "../../utils/errorlog";

export interface Policies {
	[key: string]: () => boolean;
}

export interface PolicyChild {
	constructor: Function;
	policies: Policies;
	readonly user?: UserSchema;
}

export default class Policy<Action extends string> {
	public authorized = false;

	protected readonly policies: Policies = {};

	public can(...actions: Action[]) {
		try {
			for (let i = 0; i < actions.length; i++) {
				this.authorized = this.policies[actions[i]]();
				if (!this.authorized) break;
			}
		} catch (error) {
			errorlog(error);
		} finally {
			return this.authorized;
		}
	}
}
