import { ChangeEventData, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { Tag } from "../../models";

interface Props {
	allTags?: Tag[];
	defaultTags?: Tag[];
	onChange: (tags: string[]) => void;
}

export function TagsInput({ allTags = [], defaultTags = [], onChange }: Props) {
	function onChangeHandler(e: CustomEvent<ChangeEventData<BaseTagData>>) {
		const tags = e.detail.tagify.getCleanValue();
		onChange(tags.map(tag => tag.value));
	}
	return (
		<Tags
			whitelist={allTags.map(tag => tag.name)}
			value={defaultTags.map(tag => tag.name)}
			onChange={onChangeHandler}
		/>
	);
}
