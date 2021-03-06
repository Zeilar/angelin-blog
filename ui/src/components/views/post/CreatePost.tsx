import { Editor } from "../../editor";
import * as Styles from "../../sc";
import { useFetchContext, useTitle } from "../../hooks";
import { useEditor } from "@tiptap/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { IStatus } from "../../../types/modals";
import { theme } from "../../../styles/theme";
import { Post, User } from "../../../models";
import { ContainerLoader, StatusButton } from "../../form";
import { URLHelpers } from "../../../utils";
import { useUserContext } from "../../contexts";
import { PostPreview } from "../../post";

export function CreatePost() {
	useTitle("Angelin Blog | Create Post");

	const { push } = useHistory();
	const { clearCache } = useFetchContext();
	const userContext = useUserContext();
	const [status, setStatus] = useState<IStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [preview, setPreview] = useState(false);

	const editor = useEditor({
		extensions: [StarterKit],
	});

	if (!editor) return null;

	function closePreview() {
		setPreview(false);
	}

	function openPreview() {
		setPreview(true);
	}

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
			push(URLHelpers.viewPost(data));
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

	function renderEditor() {
		const user = userContext.user as User;
		if (preview) {
			return (
				<PostPreview
					post={Post.fake({
						title,
						body: editor!.getHTML(),
						author: user,
					})}
					close={closePreview}
				/>
			);
		}
		return (
			<>
				<Styles.Input
					className="mb-2 w-full"
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder="Title"
				/>
				<Editor status={status} error={errorMessage} editor={editor} />
			</>
		);
	}

	return (
		<Styles.Container className="my-8">
			<Styles.H2 className="mb-5">Create new post</Styles.H2>
			<Styles.Col className="relative">
				<ContainerLoader loading={status === "loading"} />
				{renderEditor()}
			</Styles.Col>
			<Styles.Row className="mt-4">
				<StatusButton status={status} onClick={submit}>
					Submit
				</StatusButton>
				<Styles.PrimaryButton
					disabled={status === "loading"}
					className="dark ml-2"
					onClick={preview ? closePreview : openPreview}
				>
					{preview ? "Close" : "Preview"}
				</Styles.PrimaryButton>
			</Styles.Row>
		</Styles.Container>
	);
}
