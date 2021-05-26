const { User } = require("../../db/models/User");

async function userCount(options) {
	let query = User.query();
	if (options.where) {
		query = query.where({ ...options.where });
	}
	const result = await query.count(["id", { as: "count" }]);
	return result[0].count;
}

module.exports = {
	userCount,
};
