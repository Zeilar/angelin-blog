const { Post } = require("../../db/models/Post");
const errorlog = require("../utils/errorlog");

async function create(req, res) {}

async function getAllPosts(req, res) {
	try {
		res.status(200).json(await Post.query());
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function getPostsFromUserId(req, res) {
	try {
		res.status(200).json(await Post.query().where("user_id", req.params.id));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

module.exports = {
	create,
	getPostsFromUserId,
	getAllPosts,
};
