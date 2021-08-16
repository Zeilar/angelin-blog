import { User } from "../../db/models";
import { Logger } from "../../utils";

const logger = new Logger();

export interface Policies {
	[key: string]: () => boolean;
}

export interface PolicyChild {
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
			logger.error(error);
		} finally {
			return this.authorized;
		}
	}
}
