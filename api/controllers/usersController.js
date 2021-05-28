const { hash, compare } = require("bcrypt");
const { User } = require("../../db/models/User");
const errorlog = require("../utils/errorlog");
const { userCount } = require("../utils/user");

async function authenticate(req, res) {
	const { user: id } = req.session;

	if (!id) {
		return res.status(401).end();
	}

	try {
		const user = await User.query().findById(id);
		user.password = undefined;
		return res.status(200).json(user);
	} catch (e) {
		errorlog(e);
		return res.status(500).end();
	}
}

async function register(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing email or password" });
	}

	try {
		if ((await userCount({ where: { email } })) > 0) {
			return res.status(422).json({ error: "User already exists" });
		}

		// TODO: Validation
		const { id } = await User.query().insert({
			email,
			password: await hash(password, 10),
		});

		req.session.user = id;

		res.status(200).end();
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing email or password." });
	}

	if (req.session.user) {
		return res.status(405).json({ error: "You are already logged in." });
	}

	try {
		const user = await User.query().findOne("email", email);
		if (!user) {
			return res.status(404).json({ error: "User does not exist." });
		}

		if (!(await compare(password, user.password))) {
			return res.status(422).json({ error: "Incorrect password." });
		}

		user.password = undefined;
		req.session.user = user.id;
		res.status(200).json(user);
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

module.exports = {
	register,
	login,
	authenticate,
};
