import { Tag } from "../db/models";
import { CreateTag } from "../types/tag";
import { injectable } from "inversify";
import { DB } from "../db/utils/DB";
import { Logger } from "../utils";

@injectable()
export class TagRepository {
	constructor(public readonly db: DB, public readonly logger: Logger) {}

	public async all() {
		try {
			return await Tag.query();
		} catch (error) {
			this.logger.error(error);
			return [];
		}
	}

	public async create(data: CreateTag) {
		try {
			return await Tag.query().insertGraphAndFetch(data);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async findById(id: number | string) {
		try {
			return await Tag.query().findById(id);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async findOne(column: keyof Tag, value: string | number) {
		try {
			return await Tag.query().findOne(column, value);
		} catch (error) {
			this.logger.error(error);
			return null;
		}
	}

	public async countWhere(column: keyof Tag, value: string | number) {
		try {
			return await this.db.count(Tag.query().findOne(column, value));
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}

	public async count() {
		try {
			return await this.db.count(Tag.query());
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
