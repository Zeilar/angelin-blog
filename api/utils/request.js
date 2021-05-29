const _ = require("lodash");

// Validate whether the req.body keys matches the keys array
function validateBody(body, keys) {
	if (body == null || keys == null) {
		return false;
	}
	return _.difference(keys, Object.keys(body)).length === 0;
}

module.exports = {
	validateBody,
};
