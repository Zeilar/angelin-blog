const Policy = require("./Policy");

class PostPolicy extends Policy {
	authorized = false;
	user = {};
	post = {};

	policies = {
		edit: () => this.editOrDelete(),
		delete: () => this.editOrDelete(),
		create: () => this.create(),
	};

	constructor(user, post) {
		super();
		this.user = user;
		this.post = post;
	}

	create() {
		if (this.user) this.authorized = true;
		return this;
	}

	editOrDelete() {
		if (this.user.is_admin) {
			this.authorized = true;
		} else {
			this.authorized = this.user.id === this.post.author.id;
		}
		return this;
	}
}

const p = new PostPolicy({ id: 1, is_admin: false }, { author: { id: 2 } });

console.log(p.can("create", "delete"));

module.exports = {
	PostPolicy,
};
