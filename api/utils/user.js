const { User } = require("../../db/models/User");
const errorlog = require("./errorlog");

async function userCount(options) {
	try {
		let query = User.query();
		if (options.where) {
			query = query.where({ ...options.where });
		}
		const { count } = await query.count(["id", { as: "count" }]).first();
		return count;
	} catch (e) {
		errorlog(e);
		return 0;
	}
}

module.exports = {
	userCount,
};
