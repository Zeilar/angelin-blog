import { User } from "../../db/models";
import errorlog from "../../utils/errorlog";

export interface Policies {
	[key: string]: () => boolean | Promise<boolean>;
}

export interface PolicyChild {
	constructor: Function;
	policies: Policies;
	readonly user?: User;
}

export default class Policy<Action extends string> {
	public authorized = false;

	protected readonly policies: Policies = {};

	public async can(...actions: Action[]) {
		try {
			for (let i = 0; i < actions.length; i++) {
				this.authorized = await this.policies[actions[i]]();
				if (!this.authorized) break;
			}
		} catch (error) {
			errorlog(error);
		} finally {
			return this.authorized;
		}
	}
}
