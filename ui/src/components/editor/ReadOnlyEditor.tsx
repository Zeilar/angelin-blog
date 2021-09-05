import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import { HTMLAttributes } from "react";
import Highlight from "react-highlight";
import "../../styles/hljs.tsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
	content: string;
}

export function ReadOnlyEditor({ content, className, ...props }: Props) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		editable: false,
	});

	return (
		<Highlight {...props} className={classNames("tiptap", className)} innerHTML={true}>
			{editor?.getHTML()}
		</Highlight>
	);
}
