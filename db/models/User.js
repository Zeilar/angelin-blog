const { Model } = require("objection");

class User extends Model {
	static get tableName() {
		return "users";
	}

	static get relationMappings() {
		const { Post } = require("./Post");
		const { Comment } = require("./Comment");

		return {
			posts: {
				relation: Model.HasManyRelation,
				modelClass: Post,
				join: {
					from: "users.id",
					to: "posts.user_id",
				},
			},
			comments: {
				relation: Model.HasManyRelation,
				modelClass: Comment,
				join: {
					from: "users.id",
					to: "comments.user_id",
				},
			},
		};
	}
}

module.exports = {
	User,
};
