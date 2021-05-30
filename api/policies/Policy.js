class Policy {
	can(...actions) {
		actions.forEach(action => {
			this.policies[action]();
		});
		return this.authorized;
	}
}

module.exports = Policy;
