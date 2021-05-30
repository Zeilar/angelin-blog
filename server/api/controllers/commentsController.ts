import { Comment } from "../../db/models/Comment";
import { count } from "../../db/utils/query";
import errorlog from "../../utils/errorlog";

export async function createComment(req, res) {
	const { post_id, body } = req.body;
	const { user } = req.session;

	try {
		const comment: Comment = await Comment.query().insert({
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

export async function editComment(req, res) {
	const { body } = req.body;
	const { id } = req.params;

	try {
		const comment: Comment = await Comment.query().findById(id);
		if (!comment) return res.status(404).end();

		res.status(200).json(await comment.$query().patchAndFetch({ body }));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

export async function deleteComment(req, res) {
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
