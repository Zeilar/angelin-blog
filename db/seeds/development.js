const { hash } = require("bcrypt");

exports.seed = async knex => {
	await knex("users").del();
	await knex("users").insert([
		{
			id: 1,
			email: "philip@angelin.dev",
			password: await hash("123", 10),
		},
		{
			id: 2,
			email: "test@example.com",
			password: await hash("123", 10),
		},
	]);

	await knex("posts").del();
	await knex("posts").insert({
		id: 1,
		user_id: 1,
		title: "A test post",
		body: "This is the body of the post",
	});

	await knex("comments").del();
	await knex("comments").insert({
		id: 1,
		user_id: 2,
		post_id: 1,
		body: "Very nice post!",
	});

	await knex("tags").del();
	await knex("tags").insert([
		{
			id: 1,
			name: "angelin",
		},
		{
			id: 2,
			name: "games",
		},
	]);

	await knex("posts_tags").del();
	await knex("posts_tags").insert([
		{
			id: 1,
			tag_id: 1,
			post_id: 1,
		},
		{
			id: 2,
			tag_id: 2,
			post_id: 1,
		},
	]);
};
