function sanitizePost(post) {
	if (!post.author) return;
	post.author.password = undefined;
	return post;
}

module.exports = {
	sanitizePost,
};
