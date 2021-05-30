const { User } = require("../../db/models/User");

async function loggedIn(req, res, next) {
	const { user: id } = req.session;
	try {
		if (id) {
			res.user = await User.query().findById(id);
			return next();
		}
		res.status(401).end();
	} catch (e) {
		res.status(500).end();
	}
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
