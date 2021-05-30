const _ = require("lodash");

// Validate whether the req.body keys matches the keys array
function validateBody(body, keys) {
	if (body == null || keys == null) {
		return false;
	}
	return _.difference(keys, Object.keys(body)).length === 0;
}

function idsMatch(first, second) {
	first = Number(first);
	second = Number(second);
	if (!first || !second) return false;
	return first === second;
}

module.exports = {
	validateBody,
	idsMatch,
};
