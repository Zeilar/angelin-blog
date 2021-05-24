exports.up = function (knex) {
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
			table.string("body", 5000).unique().notNullable();
			table.timestamps(true, true);
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableifExists("users").dropTableifExists("posts");
};
