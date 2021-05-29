const { hash } = require("bcrypt");

exports.seed = async knex => {
	await knex("users").truncate();
	await knex("users").insert([
		{
			email: "philip@angelin.dev",
			is_admin: true,
			password: await hash("123", 10),
		},
		{
			email: "test@example.com",
			password: await hash("123", 10),
		},
	]);

	await knex("posts").truncate();
	await knex("posts").insert([
		{
			user_id: 1,
			title: "A test post",
			body: "This is the body of the post",
		},
		{
			user_id: 1,
			title: "Another test post",
			body: "This is the body of the post",
		},
	]);

	await knex("comments").truncate();
	await knex("comments").insert([
		{
			user_id: 2,
			post_id: 1,
			body: "Very nice post!",
		},
		{
			user_id: 1,
			post_id: 1,
			body: "Hello world!",
		},
		{
			user_id: 2,
			post_id: 2,
			body: "Agree.",
		},
	]);

	await knex("tags").truncate();
	await knex("tags").insert([{ name: "angelin" }, { name: "games" }]);

	await knex("posts_tags").truncate();
	await knex("posts_tags").insert([
		{
			tag_id: 1,
			post_id: 1,
		},
		{
			tag_id: 2,
			post_id: 1,
		},
	]);
};
