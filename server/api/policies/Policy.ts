import errorlog from "../../utils/errorlog";

interface Policies {
	[key: string]: Function;
}

export default class Policy {
	public authorized: boolean = false;

	protected readonly policies: Policies;

	can(...actions: string[]): boolean {
		try {
			actions.forEach(action => {
				this.policies[action]();
			});
		} catch (error) {
			errorlog(error);
		} finally {
			return this.authorized;
		}
	}
}
