const { Tag } = require("../../db/models/Tag");
const { Post } = require("../../db/models/Post");
const errorlog = require("../utils/errorlog");
const { sanitizePost } = require("../utils/post");
const { validateBody, idsMatch } = require("../utils/request");

async function createPost(req, res) {
	if (!validateBody(req.body, ["body", "title"])) {
		return res.status(400).json({ error: "Please provide a body and title." });
	}

	const { user } = req.session;
	const { body, title, tags } = req.body;

	try {
		let query = Tag.query();

		tags.forEach((tag, i) => {
			query = i === 0 ? query.where("name", tag) : query.orWhere("name", tag);
		});
		const result = await query.execute();

		const post = await Post.query()
			.insertGraphAndFetch({
				user_id: user,
				title,
				body,
			})
			.first();

		for (let i = 0; i < result.length; i++) {
			await post.$relatedQuery("tags").relate(result[i]);
		}
		// TODO: add tags, maybe graph upsert?

		console.log(post);
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

async function editPost(req, res) {
	const { title, body } = req.body;
	const { id } = req.params;

	try {
		const post = await Post.query().findById(id);
		if (!post) return res.status(404).end();

		res.status(200).json(await post.$query().patchAndFetch({ body, title }));
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

async function deletePost(req, res) {
	const { id } = req.params;

	if (!idsMatch(req.session.user, id)) {
		return res.status(403).end();
	}

	try {
		const post = await Post.query().findById(id);

		if (!post) return res.status(404).end();

		await post.$relatedQuery("comments").delete();
		await post.$relatedQuery("tags").unrelate();
		await post.$query().delete();

		res.status(200).end();
	} catch (e) {
		errorlog(e);
		res.status(500).end();
	}
}

module.exports = {
	createPost,
	getPostById,
	getAllPosts,
	editPost,
	deletePost,
};
