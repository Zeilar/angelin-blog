const { hash, compare } = require("bcrypt");
const { User } = require("../../db/models/User");
const { count } = require("../../db/utils/query");
const errorlog = require("../utils/errorlog");
const { validateBody } = require("../utils/request");
const { sanitizeUser } = require("../utils/user");

async function authenticate(req, res) {
	const { user: id } = req.session;

	if (!id) return res.status(401).end();

	try {
		const user = await User.query().findById(id);
		res.status(200).json(sanitizeUser(user));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function register(req, res) {
	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Missing email or password." });
	}

	const { email, password } = req.body;

	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	try {
		if ((await count(User.query().where({ email }))) > 0) {
			return res.status(422).json({ error: "User already exists." });
		}

		// TODO: Validation
		const user = await User.query().insert({ email, password: await hash(password, 10) });

		req.session.user = user.id;

		res.status(200).json(sanitizeUser(user));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function login(req, res) {
	if (!validateBody(req.body, ["email", "password"])) {
		return res.status(400).json({ error: "Missing email or password." });
	}

	const { email, password } = req.body;

	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	try {
		const user = await User.query().findOne("email", email);
		if (!user) return res.status(404).json({ error: "User does not exist." });

		if (!(await compare(password, user.password))) {
			return res.status(422).json({ error: "Incorrect password." });
		}

		req.session.user = user.id;

		res.status(200).json(sanitizeUser(user));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

function logout(req, res) {
	if (!req.session.user) {
		return res.status(405).json({ error: "You are already logged out." });
	}
	req.session.user = undefined;
	res.status(200).end();
}

module.exports = {
	register,
	login,
	authenticate,
	logout,
};
