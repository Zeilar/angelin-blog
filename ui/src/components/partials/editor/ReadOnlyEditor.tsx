import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
	content: string;
}

export function ReadOnlyEditor(props: Props) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: props.content,
		editable: false,
	});

	return <EditorContent editor={editor} />;
}
