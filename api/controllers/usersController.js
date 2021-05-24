const bcrypt = require("bcrypt");
const { User } = require("../../db/models/User");

function authenticate(req, res) {
	const { user } = req.session;
	if (user) return res.status(200).json(user);
	res.status(401).end();
}

async function userExists(column = "email", value = "") {
	// Knex as of now has no .exists() method, and the count return is in a horrible format
	// This was done to optimize the query, albeit in this project it's irrelevant in the grand scheme of things
	const result = await User.query().where(column, value).count();
	return Object.values(result[0])[0] > 0;
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
		console.log(e);
		res.status(500).end();
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Missing email or password" });
	}

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
}

module.exports = {
	register,
	login,
	authenticate,
};
