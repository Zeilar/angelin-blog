const { Model } = require("objection");
class Post extends Model {
	static get tableName() {
		return "posts";
	}

	static relationMappings() {
		const { Comment } = require("./Comment");
		const { Tag } = require("./Tag");
		const { User } = require("./User");

		return {
			author: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "posts.user_id",
					to: "users.id",
				},
			},
			tags: {
				relation: Model.ManyToManyRelation,
				modelClass: Tag,
				join: {
					from: "tags.id",
					through: {
						from: "posts_tags.tag_id",
						to: "posts_tags.post_id",
					},
					to: "posts.id",
				},
			},
			comments: {
				relation: Model.HasManyRelation,
				modelClass: Comment,
				join: {
					from: "comments.id",
					to: "posts.id",
				},
			},
		};
	}
}

module.exports = {
	Post,
};
