require("dotenv").config();

const { knexSnakeCaseMappers } = require("objection");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_CLIENT } = process.env;

module.exports = {
	development: {
		client: DB_CLIENT,
		connection: {
			database: DB_NAME,
			user: DB_USER,
			password: DB_PASSWORD,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
		...knexSnakeCaseMappers,
	},
};
