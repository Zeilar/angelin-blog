const { Model } = require("objection");
const { User } = require("./User");

class Post extends Model {
	static get tableName() {
		return "posts";
	}

	static relationMappings = {
		author: {
			relation: Model.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: "posts.user_id",
				to: "users.id",
			},
		},
	};
}

module.exports = {
	Post,
};
