import Editor from "../partials/editor/Editor";
import * as Styles from "../styled-components";
import { FetchContext, IFetchContext, useTitle } from "../hooks";
import { useEditor } from "@tiptap/react";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import StarterKit from "@tiptap/starter-kit";
import { IStatus } from "../../types/modals";
import { theme } from "../../styles/theme";
import { Post } from "../../models";
import { StatusButton } from "../misc";
import { URLHelpers } from "../../utils/URLHelpers";

export function CreatePost() {
	useTitle("Angelin Blog | Create Post");

	const { push } = useHistory();
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const [status, setStatus] = useState<IStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState("");

	const editor = useEditor({
		extensions: [StarterKit],
	});

	async function submit() {
		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await Post.create({
			title,
			body: editor!.getHTML(), // You can't convince me editor is not null
		});

		if (ok && data) {
			clearCache(URLHelpers.apiPosts());
			setStatus("success");
			push(URLHelpers.getPost(data));
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
		<Styles.Container className="my-4">
			<Styles.H3 className="mb-5">Create new post</Styles.H3>
			<Styles.Input
				className="mb-2 w-full"
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<Editor status={status} error={errorMessage} editor={editor} />
			<StatusButton status={status} className="mt-4" onClick={submit}>
				Submit
			</StatusButton>
		</Styles.Container>
	);
}
