import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Post } from "../../../models/Post";
import { SERVER_URL } from "../../../utils";
import { FetchContext, IFetchContext } from "../../hooks";
import { StatusButton } from "../../misc";
import { Toolbar } from "./";
import { ModalStatus } from "../../../types/modals";
import { useState } from "react";
import classNames from "classnames";
import { Col, InputError, Input } from "../../styled-components";
import { useEffect } from "react";
import { theme } from "../../../styles/theme";
import { Prompt } from "react-router-dom";

const promptMsg = "You have unsaved progress, are you sure you want to exit?";

export default function Editor({ ...props }) {
	const { push } = useHistory();
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const [status, setStatus] = useState<ModalStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState("");

	const editor = useEditor({
		extensions: [StarterKit],
	});

	useEffect(() => {
		function exitHandler(e: BeforeUnloadEvent) {
			if (editor && editor.getHTML().length > 10) {
				e.returnValue = promptMsg;
			}
		}

		window.addEventListener("beforeunload", exitHandler);

		return () => {
			window.removeEventListener("beforeunload", exitHandler);
		};
	}, [editor]);

	if (!editor) return null;

	async function submit() {
		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await Post.create({
			title,
			body: editor!.getHTML(), // You can't convince me editor is not null
		});

		if (ok) {
			if (!data) return;
			clearCache(`${SERVER_URL}/api/posts`);
			setStatus("success");
			push(`/post/${data.id}-${data.title}`);
		} else {
			setStatus("error");

			if (typeof error === "string") {
				setErrorMessage(error);
			}

			setTimeout(() => {
				setStatus(null);
			}, theme.durations.modalsAfterResponse);
		}
	}

	return (
		<div>
			<Prompt
				message={promptMsg}
				when={status !== "success" && editor.getHTML().length > 10}
			/>
			<Input
				className="mb-2 w-full"
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<Col {...props} align="flex-start">
				<Toolbar editor={editor} />
				<EditorContent
					className={classNames("editing w-full", { error: Boolean(errorMessage) })}
					editor={editor}
				/>
				{errorMessage && <InputError message={errorMessage} className="mt-2" />}
			</Col>
			<StatusButton status={status} className="mt-4" onClick={submit}>
				Submit
			</StatusButton>
		</div>
	);
}
