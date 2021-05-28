const { User } = require("../../db/models/User");

function loggedIn(req, res, next) {
	if (req.session.user) return next();
	res.status(401).end();
}

async function admin(req, res, next) {
	const { user: id } = req.session;

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
