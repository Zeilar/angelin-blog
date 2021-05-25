const { Model } = require("objection");
const { Post } = require("./Post");

class User extends Model {
	static get tableName() {
		return "users";
	}

	static relationMappings = {
		posts: {
			relation: Model.HasManyRelation,
			modelClass: Post,
			join: {
				from: "users.id",
				to: "posts.user_id",
			},
		},
	};
}

module.exports = {
	User,
};
