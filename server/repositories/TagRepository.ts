import { Tag } from "../db/models";
import { CreateTag } from "../types/tag";
import { injectable } from "inversify";
import { DB } from "../db/utils/DB";
import { Logger } from "../utils";

@injectable()
export class TagRepository {
	constructor(public readonly db: DB, public readonly logger: Logger) {}

	public all() {
		try {
			return Tag.query();
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	public create(data: CreateTag) {
		try {
			return Tag.query().insertGraphAndFetch(data);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public findById(id: number | string) {
		try {
			return Tag.query().findById(id);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public findOne(column: keyof Tag, value: string | number) {
		try {
			return Tag.query().findOne(column, value);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public countWhere(column: keyof Tag, value: string | number) {
		try {
			return this.db.count(Tag.query().findOne(column, value));
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	public count() {
		try {
			return this.db.count(Tag.query());
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	// This has to be done one at a time in order to work outside PostgresQL
	private async findOrCreateQuery(tagArg: string) {
		let tag = await Tag.query().findOne("name", tagArg);
		if (!tag) {
			tag = await Tag.query().insertAndFetch({ name: tagArg });
		}
		if (!tag) {
			throw new Error(`Could not create or find tag: ${tag}`);
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
		try {
			if (Array.isArray(tagsArg)) {
				for (const tag of tagsArg) {
					tags.push(await this.findOrCreateQuery(tag));
				}
			} else if (typeof tagsArg === "string") {
				tags.push(await this.findOrCreateQuery(tagsArg));
			}
		} catch (error) {
			this.logger.error(error);
		} finally {
			return tags;
		}
	}
}
