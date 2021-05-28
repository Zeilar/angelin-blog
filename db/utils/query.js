async function count(query) {
	if (!query) return 0;

	try {
		return (await query.count(["id", { as: "count" }]).first()).count;
	} catch (e) {
		errorlog(e);
		return 0;
	}
}

module.exports = {
	count,
};
