function sanitizeUser(user) {
	user.password = undefined;
	return user;
}

module.exports = {
	sanitizeUser,
};
