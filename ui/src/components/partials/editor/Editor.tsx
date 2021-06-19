import { useState, useEffect, FormEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

export default function Editor() {
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World! 🌎️</p>",
	});

	async function submit() {
		// editor.getHTML()
		// create post
	}

	return (
		<div>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
