import "dotenv/config";
import { knexSnakeCaseMappers } from "objection";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_CLIENT } = process.env;

const development = {
	client: DB_CLIENT,
	connection: {
		database: DB_NAME,
		user: DB_USER,
		password: DB_PASSWORD,
	},
	migrations: {
		tableName: "_knex_migrations",
		directory: "./server/db/migrations",
	},
	seeds: {
		directory: "./server/db/seeds",
	},
	...knexSnakeCaseMappers,
};

export { development };
