const { Post } = require("../../db/models/Post");

async function create(req, res) {}

async function getPostsFromAuthorId(req, res) {
	const { user_id } = req.body;
	try {
		const posts = await Post.query().where("user_id", user_id);
		res.status(200).json(posts);
	} catch (e) {
		console.log(e);
		res.status(500).end();
	}
}

module.exports = {
	create,
	getPostsFromAuthorId,
};
