const { Comment } = require("../../db/models/Comment");
const { count } = require("../../db/utils/query");
const errorlog = require("../utils/errorlog");

async function createComment(req, res) {
	const { post_id, body } = req.body;
	const { user } = req.session;

	try {
		const comment = await Comment.query().insert({
			post_id,
			user_id: user,
			body,
		});
		res.status(200).json(comment);
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function editComment(req, res) {
	const { title, body } = req.body;
	const { id } = req.params;

	try {
		const comment = await Comment.query().findById(id);
		if (!comment) return res.status(404).end();

		res.status(200).json(await comment.$query().patchAndFetch({ body, title }));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function deleteComment(req, res) {
	const { id } = req.params;

	try {
		if ((await count(Comment.query().findById(id))) === 0) {
			return res.status(404).end();
		}

		await Comment.query().deleteById(id);

		res.status(200).json();
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

module.exports = {
	createComment,
	editComment,
	deleteComment,
};
