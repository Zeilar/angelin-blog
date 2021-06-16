import { Tag } from "../../db/models";

export async function fetchTags(tagsArg: string[]) {
	const tags = [];
	for (let i = 0; i < tagsArg?.length; i++) {
		let tag = await Tag.query().where({ name: tagsArg[i] }).first();
		if (!tag) tag = await Tag.query().insertAndFetch({ name: tagsArg[i] });
		if (!tag) throw new Error(`Could not create or find tag: ${tagsArg[i]}`);
		tags.push(tag);
	}
	return tags;
}
