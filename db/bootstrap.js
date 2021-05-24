const knex = require("knex");
const { Model } = require("objection");
const knexfile = require("../knexfile");

function bootstrap() {
	const db = knex(knexfile.development);
	Model.knex(db);
}

module.exports = bootstrap;
