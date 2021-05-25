const { Model } = require("objection");

class User extends Model {
	static get tableName() {
		return "users";
	}

	static get relationMappings() {
		const Post = require("./Post");
		return {
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
}

module.exports = {
	User,
};
