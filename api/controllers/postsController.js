const { Post } = require("../../db/models/Post");
const errorlog = require("../utils/errorlog");

async function createPost(req, res) {
	const { user } = req.session;
	const { body, title } = req.body;

	if (!body || !title) {
		return res.status(400).json({ error: "Please provide a body and title." });
	}

	try {
		const post = await Post.query().insert({ user_id: user, title, body });
		res.status(200).json(post);
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function getAllPosts(req, res) {
	try {
		res.status(200).json(await Post.query());
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function getPostById(req, res) {
	try {
		res.status(200).json(await Post.query().findById(req.params.id));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

module.exports = {
	createPost,
	getPostById,
	getAllPosts,
};
