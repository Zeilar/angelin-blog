interface Policies {
	[key: string]: Function;
}

export default class Policy {
	public authorized: boolean = false;

	protected policies: Policies = {};

	can(...actions: string[]) {
		actions.forEach(action => {
			this.policies[action]();
		});
		return this.authorized;
	}
}
