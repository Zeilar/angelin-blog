import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "react-highlight";
import "../../styles/hljs.css";

interface Props {
	content: string;
	className?: string;
}

export function ReadOnlyEditor(props: Props) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: props.content,
		editable: false,
	});

	return (
		<Highlight className="tiptap" innerHTML={true}>
			{editor?.getHTML()}
		</Highlight>
	);
}
