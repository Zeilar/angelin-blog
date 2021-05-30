interface Policies {
	[key: string]: Function;
}

export default class Policy {
	public authorized: boolean = false;

	protected policies: Policies = {};

	can(...actions: string[]): boolean {
		actions.forEach(action => {
			this.policies[action]();
		});
		return this.authorized;
	}
}
