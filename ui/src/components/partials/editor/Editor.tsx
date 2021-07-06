import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useHistory } from "react-router";
import { Post } from "../../../models/Post";
import { Toolbar } from "./";

export default function Editor({ ...props }) {
	const { push } = useHistory();

	const editor = useEditor({
		extensions: [StarterKit],
	});

	async function submit() {
		if (!editor) return;

		const { data, ok } = await Post.create({
			title: "My post",
			body: editor.getHTML(),
		});

		if (ok && data) {
			push(`/post/${data.id}-${data.title}`);
		}
	}

	return (
		<div {...props}>
			<Toolbar editor={editor} />
			<EditorContent className="editing" editor={editor} />
			<button onClick={submit}>Submit</button>
		</div>
	);
}
