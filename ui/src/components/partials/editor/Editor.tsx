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
import { Color, theme } from "../../../styles/theme";
import classnames from "classnames";
import { Col, InputError } from "../../styled-components";
import { useEffect } from "react";
import styled from "styled-components";

export default function Editor({ ...props }) {
	const { push } = useHistory();
	const fetchContext = useContext(FetchContext);
	const [status, setStatus] = useState<ModalStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState("");

	const editor = useEditor({
		extensions: [StarterKit],
	});

	useEffect(() => {
		function exitHandler(e: BeforeUnloadEvent) {
			if (editor && editor.getHTML().length > 10) {
				e.returnValue = "You have unsaved progress, are you sure you want to exit?";
			}
		}

		window.addEventListener("beforeunload", exitHandler);

		return () => {
			window.removeEventListener("beforeunload", exitHandler);
		};
	}, [editor]);

	async function submit() {
		if (!editor) {
			return setErrorMessage("Something went wrong.");
		}

		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await Post.create({
			title,
			body: editor.getHTML(),
		});

		if (ok) {
			if (!data) return;
			fetchContext?.clearCache(`${SERVER_URL}/api/posts`);
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
			<Input
				className="mb-2"
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<Wrapper {...props} align="flex-start">
				<Toolbar editor={editor} />
				<EditorContent
					className={classnames("editing w-full", { error: Boolean(errorMessage) })}
					editor={editor}
				/>
				{errorMessage && <InputError message={errorMessage} className="mt-2" />}
			</Wrapper>
			<StatusButton status={status} className="mt-4" onClick={submit}>
				Submit
			</StatusButton>
		</div>
	);
}

const Wrapper = styled(Col)`
	/* background-color: hsl(${Color.pick("secondary").get()});
	padding: 0.75rem; */
`;

const Input = styled.input`
	outline: 0;
	background-color: hsl(${Color.pick("secondary").get()});
	border: 2px solid hsl(${Color.pick("border").get()});
	padding: 0.75rem;
	width: 100%;
	&:focus {
		background-color: hsl(${Color.pick("primary").get()});
	}
`;
