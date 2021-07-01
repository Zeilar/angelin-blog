import { Model } from "objection";
import errorlog from "../../utils/errorlog";
import { Post } from "./";

export class Tag extends Model {
	public static tableName = "tags";

	public id!: number;
	public name!: string;
	public created_at!: string;
	public updated_at!: string;
	public posts?: Post[];

	public static relationships = {
		posts: true,
	};

	public static relationMappings() {
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

	// This has to be done one at a time in order to work outside PostgresQL
	private static async findOrCreateQuery(tagArg: string) {
		let tag = await Tag.query().findOne({ name: tagArg });
		if (!tag) tag = await Tag.query().insertAndFetch({ name: tag });
		if (!tag) throw new Error(`Could not create or find tag: ${tag}`);
		return tag;
	}

	/**
	 * @example const tags = await findOrCreate(tags);
	 * @example const tags = await findOrCreate(tag);
	 */
	public static async findOrCreate(tagsArg: string): Promise<Tag[]>;
	public static async findOrCreate(tagsArg: string[]): Promise<Tag[]>;
	public static async findOrCreate(tagsArg: unknown) {
		const tags = [];
		try {
			if (Array.isArray(tagsArg)) {
				for (const tag of tagsArg) {
					tags.push(await Tag.findOrCreateQuery(tag));
				}
			} else if (typeof tagsArg === "string") {
				tags.push(await Tag.findOrCreateQuery(tagsArg));
			}
		} catch (error) {
			errorlog(error);
		} finally {
			return tags;
		}
	}
}
