import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Post } from "../../../models/Post";
import { SERVER_URL } from "../../../utils";
import { FetchContext } from "../../hooks";
import { PrimaryButton } from "../../styled-components";
import { Toolbar } from "./";

export default function Editor({ ...props }) {
	const { push } = useHistory();
	const fetchContext = useContext(FetchContext);

	const editor = useEditor({
		extensions: [StarterKit],
	});

	async function submit() {
		if (!editor) return;

		const { data, ok, error } = await Post.create({
			title: "My post",
			body: editor.getHTML(),
		});

		if (ok && data) {
			fetchContext?.clearCache(`${SERVER_URL}/api/posts`);
			push(`/post/${data.id}-${data.title}`);
		}
	}

	return (
		<div {...props}>
			<Toolbar editor={editor} />
			<EditorContent className="editing" editor={editor} />
			<PrimaryButton className="mt-4" onClick={submit}>
				Submit
			</PrimaryButton>
		</div>
	);
}
