import { User } from "../../db/types/models";
import errorlog from "../../utils/errorlog";

export interface Policies {
	[key: string]: () => boolean;
}

export interface PolicyChild {
	constructor: Function;
	policies: Policies;
	readonly user: User;
}

export default class Policy<Action extends string> {
	public authorized: boolean = false;

	protected readonly policies: Policies;

	can(...actions: Action[]): boolean {
		try {
			for (let i: number = 0; i < actions.length; i++) {
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
