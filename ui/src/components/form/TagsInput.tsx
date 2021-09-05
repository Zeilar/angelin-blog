import { ChangeEventData, BaseTagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { Tag } from "../../models";

interface Props {
	defaultTags?: Tag[];
	onChange: (tags: string[]) => void;
}

export function TagsInput({ defaultTags = [], onChange }: Props) {
	function onChangeHandler(e: CustomEvent<ChangeEventData<BaseTagData>>) {
		const tags = e.detail.tagify.getCleanValue();
		onChange(tags.map(tag => tag.value));
	}
	return <Tags defaultValue={defaultTags.map(tag => tag.name)} onChange={onChangeHandler} />;
}
