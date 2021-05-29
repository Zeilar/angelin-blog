exports.up = knex =>
	knex.schema
		.createTable("users", table => {
			table.increments();
			table.boolean("is_admin").notNullable().defaultTo(false);
			table.string("email").unique().notNullable();
			table.string("password").notNullable();
			table.timestamps(true, true);
		})
		.createTable("posts", table => {
			table.increments();
			table.integer("user_id").notNullable();
			table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
			table.string("title").notNullable();
			table.string("body", 5000).notNullable();
			table.timestamps(true, true);
		})
		.createTable("comments", table => {
			table.increments();
			table.foreign("post_id").references("id").inTable("posts").onDelete("CASCADE");
			table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
			table.integer("post_id").notNullable();
			table.integer("user_id").notNullable();
			table.string("body", 1000).notNullable();
			table.timestamps(true, true);
		})
		.createTable("tags", table => {
			table.increments();
			table.string("name").notNullable();
			table.timestamps(true, true);
		})
		.createTable("posts_tags", table => {
			table.increments();
			table.foreign("post_id").references("id").inTable("posts").onDelete("CASCADE");
			table.foreign("tag_id").references("id").inTable("tags").onDelete("CASCADE");
			table.integer("post_id").notNullable();
			table.integer("tag_id").notNullable();
			table.timestamps(true, true);
		});

exports.down = knex =>
	knex.schema
		.dropTableIfExists("users")
		.dropTableIfExists("posts")
		.dropTableIfExists("comments")
		.dropTableIfExists("tags")
		.dropTableIfExists("posts_tags");
