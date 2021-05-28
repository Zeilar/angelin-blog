const { User } = require("../../db/models/User");

function loggedIn(req, res, next) {
	if (!req.session.user) {
		return res.status(401).end();
	}
	next();
}

async function admin(req, res, next) {
	const { id } = req.session;

	if (!id) return res.status(401);

	const user = await User.query().findById(id);

	if (Number(user.is_admin) !== 1) {
		return res.status(403);
	}

	next();
}

module.exports = {
	loggedIn,
	admin,
};
