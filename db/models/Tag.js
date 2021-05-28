const { Model } = require("objection");

class Tag extends Model {
	static get tableName() {
		return "tags";
	}

	static relationMappings() {
		const { Post } = require("./Post");

		return {
			posts: {
				relation: Model.ManyToManyRelation,
				modelClass: Post,
				join: {
					from: "posts.id",
					through: {
						from: "posts_tags.tag_id",
						to: "posts_tags.post_id",
					},
					to: "tags.id",
				},
			},
		};
	}
}

module.exports = {
	Tag,
};
