import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Post } from "../../../models/Post";
import { SERVER_URL } from "../../../utils";
import { FetchContext } from "../../hooks";
import { StatusButton } from "../../misc";
import { Toolbar } from "./";
import { ModalStatus } from "../../../types/modals";
import { useState } from "react";
import { theme } from "../../../styles/theme";
import classnames from "classnames";
import { InputError } from "../../styled-components";

export default function Editor({ ...props }) {
	const { push } = useHistory();
	const fetchContext = useContext(FetchContext);
	const [status, setStatus] = useState<ModalStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const editor = useEditor({
		extensions: [StarterKit],
	});

	async function submit() {
		if (!editor) return;

		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await Post.create({
			title: "My post",
			body: editor.getHTML(),
		});

		if (ok) {
			if (!data) return;
			setStatus("success");
			fetchContext?.clearCache(`${SERVER_URL}/api/posts`);
			push(`/post/${data.id}-${data.title}`);
		} else {
			setStatus("error");
			if (typeof error === "string") {
				setErrorMessage(error);
			}
		}

		setTimeout(() => {
			setStatus(null);
		}, theme.durations.modalsAfterResponse);
	}

	return (
		<div {...props}>
			<Toolbar editor={editor} />
			<EditorContent
				className={classnames("editing", { error: Boolean(errorMessage) })}
				editor={editor}
			/>
			{errorMessage && <InputError message={errorMessage} className="mt-2" />}
			<StatusButton status={status} className="mt-4" onClick={submit}>
				Submit
			</StatusButton>
		</div>
	);
}
