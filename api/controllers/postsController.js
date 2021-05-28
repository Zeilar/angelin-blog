const { Post } = require("../../db/models/Post");
const errorlog = require("../utils/errorlog");
const { sanitizePost } = require("../utils/post");

async function createPost(req, res) {
	const { user } = req.session;
	const { body, title } = req.body;

	if (!body || !title) {
		return res.status(400).json({ error: "Please provide a body and title." });
	}

	try {
		const post = await Post.query()
			.insert({ user_id: user, title, body }) // TODO: add tags
			.withGraphFetched("author")
			.first();
		res.status(200).json(sanitizePost(post));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function getAllPosts(req, res) {
	try {
		const posts = await Post.query().withGraphFetched({
			author: true,
			comments: true,
			tags: true,
		});
		res.status(200).json(posts.map(post => sanitizePost(post)));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function getPostById(req, res) {
	try {
		const post = await Post.query().findById(req.params.id).withGraphFetched({
			author: true,
			comments: true,
			tags: true,
		});
		res.status(200).json(sanitizePost(post));
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
