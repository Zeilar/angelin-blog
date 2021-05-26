function sanitizePost(post) {
	if (!post.author) return;
	post.author.password = undefined;
}

module.exports = {
	sanitizePost,
};
