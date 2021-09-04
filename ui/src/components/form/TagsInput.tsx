import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { Tag } from "../../models";

interface Props {
	defaultTags: Tag[];
	onChange: (tags: Tag[]) => void;
}

export function TagsInput({ defaultTags = [], onChange }: Props) {}
