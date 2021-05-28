const knex = require("knex");
const { Model } = require("objection");
const { development } = require("../knexfile");

module.exports = () => {
	Model.knex(knex(development));
};
