const _ = require("lodash");

// Validate whether the req.body keys matches the keys array
function validateBody(body, keys) {
	if (body == null || keys == null) {
		return false;
	}
	return _.difference(keys, Object.keys(body)).length === 0;
}

function idsMatch(first, second) {
	if (!first || !second) return false;
	return Number(first) === Number(second);
}

module.exports = {
	validateBody,
	idsMatch,
};
