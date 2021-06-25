import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Post } from "../../../models/Post";
import { Toolbar } from "./";

export default function Editor() {
	const editor = useEditor({
		extensions: [StarterKit],
	});

	async function submit() {
		if (!editor) return;
		const { code, data, error } = await Post.create({
			title: "My post",
			body: editor.getHTML(),
		});
		console.log(code, data, error);
		// create post
	}

	return (
		<div>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
			<button onClick={submit}>Submit</button>
		</div>
	);
}
