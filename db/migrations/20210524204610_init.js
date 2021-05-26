exports.up = knex => {
	return knex.schema
		.createTable("users", table => {
			table.increments();
			table.string("email").unique().notNullable();
			table.string("password").notNullable();
			table.timestamps(true, true);
		})
		.createTable("posts", table => {
			table.increments();
			table.integer("user_id").references("id").inTable("users");
			table.string("title").notNullable();
			table.string("body", 5000).notNullable();
			table.timestamps(true, true);
		});
};

exports.down = knex => {
	return knex.schema.dropTableIfExists("users").dropTableIfExists("posts");
};
