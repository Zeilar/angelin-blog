const { User } = require("../../db/models/User");

function loggedIn(req, res, next) {
	if (req.session.user) return next();
	res.status(401).end();
}

async function admin(req, res, next) {
	const user = await User.query().findById(req.session.user);

	if (!Boolean(Number(user.is_admin))) {
		return res.status(403).end();
	}

	return next();
}

module.exports = {
	loggedIn,
	admin,
};
