const { Model } = require("objection");

class Comment extends Model {
	static get tableName() {
		return "comments";
	}

	static relationMappings() {
		const { Post } = require("./Post");
		const { User } = require("./User");

		return {
			author: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "comments.user_id",
					to: "users.id",
				},
			},
			post: {
				relation: Model.BelongsToOneRelation,
				modelClass: Post,
				join: {
					from: "comments.post_id",
					to: "posts.id",
				},
			},
		};
	}
}

module.exports = {
	Comment,
};
