const bcrypt = require("bcrypt");
const { User } = require("../../db/models/User");
const errorlog = require("../utils/errorlog");
const { userExists } = require("../utils/user");

function authenticate(req, res) {
	const { user } = req.session;
	if (user) return res.status(200).json({ id: user });
	res.status(401).end();
}

async function register(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing email or password" });
	}

	try {
		if (await userExists("email", email)) {
			return res.status(422).json({ error: "User already exists" });
		}

		// TODO: Validation
		await User.query().insert({
			email,
			password: await bcrypt.hash(password, 10),
		});

		res.status(200).end();
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing email or password" });
	}

	try {
		const user = await User.query().findOne("email", email);
		if (!user) {
			return res.status(404).json({ error: "User does not exist" });
		}

		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(422).json({ error: "Incorrect password" });
		}

		user.password = undefined;
		req.session.user = user.id;
		res.status(200).json(user);
	} catch (e) {
		errorlog(e);
	}
}

module.exports = {
	register,
	login,
	authenticate,
};
