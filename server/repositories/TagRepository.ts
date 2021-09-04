import { HTTPError } from "./../utils/HTTPError";
import { Tag } from "../db/models";
import { CreateTag } from "../types/tag";
import { injectable } from "inversify";
import { DB } from "../db/utils/DB";

@injectable()
export class TagRepository {
	constructor(public readonly db: DB) {}

	public all() {
		return Tag.query();
	}

	public create(data: CreateTag) {
		return Tag.query().insertGraphAndFetch(data);
	}

	public findById(id: number | string) {
		return Tag.query().findById(id);
	}

	public findOne(column: keyof Tag, value: string | number) {
		return Tag.query().findOne(column, value);
	}

	public countWhere(column: keyof Tag, value: string | number) {
		return this.db.count(Tag.query().findOne(column, value));
	}

	public count() {
		return this.db.count(Tag.query());
	}

	// This has to be done one at a time in order to work outside PostgresQL
	private async findOrCreateQuery(tagArg: string) {
		let tag = await Tag.query().findOne("name", tagArg);
		if (!tag) {
			tag = await Tag.query().insertAndFetch({ name: tagArg });
		}
		if (!tag) {
			throw new HTTPError(`Could not create or find tag: ${tag}`);
		}
		return tag;
	}

	/**
	 * @example const tags = await findOrCreate(tags);
	 * @example const tags = await findOrCreate(tag);
	 */
	public async findOrCreate(tagsArg: string): Promise<Tag[]>;
	public async findOrCreate(tagsArg: string[]): Promise<Tag[]>;
	public async findOrCreate(tagsArg: unknown) {
		const tags = [];
		if (Array.isArray(tagsArg)) {
			for (const tag of tagsArg) {
				tags.push(await this.findOrCreateQuery(tag));
			}
		} else if (typeof tagsArg === "string") {
			tags.push(await this.findOrCreateQuery(tagsArg));
		}
		return tags;
	}
}
