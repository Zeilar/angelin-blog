const { User } = require("../../db/models/User");

async function userExists(column = "email", value = "") {
	// Knex as of now has no .exists() method, and the count return is in a horrible format
	// This was done to optimize the query, albeit in this project it's irrelevant in the grand scheme of things
	const result = await User.query().where(column, value).count();
	return Object.values(result[0])[0] > 0;
}

module.exports = {
	userExists,
};
