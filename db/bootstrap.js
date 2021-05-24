const knex = require("knex");
const { Model } = require("objection");
const { development } = require("../knexfile");

module.exports = () => {
	const db = knex(development);
	Model.knex(db);
};
