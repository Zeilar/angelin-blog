import Editor from "../partials/editor/Editor";
import * as Styles from "../styled-components";
import { FetchContext, IFetchContext, useFetch, useTitle } from "../hooks";
import { useEditor } from "@tiptap/react";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";
import { useState, useContext } from "react";
import StarterKit from "@tiptap/starter-kit";
import { IStatus } from "../../types/modals";
import { theme } from "../../styles/theme";
import { Post } from "../../models";
import { StatusButton } from "../misc";
import { URLHelpers } from "../../utils/URLHelpers";
import { useEffect } from "react";
import { mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";

interface MatchParams {
	id: string;
	title?: string;
}

export function EditPost({ match }: RouteComponentProps<MatchParams>) {
	const url = URLHelpers.apiPost(match.params.id);
	const query = useFetch<{ data: Post }>(url);
	const post = query.body?.data;

	const { push } = useHistory();
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const [status, setStatus] = useState<IStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState<string>("");

	useTitle("Angelin Blog | Edit Post");

	useEffect(() => {
		setTitle(post?.title ?? "");
	}, [post?.title]);

	const editor = useEditor(
		{
			extensions: [StarterKit],
			content: post?.body,
		},
		[post?.body]
	);

	async function submit() {
		if (!post) return;

		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await Post.edit(post.id, {
			title,
			body: editor!.getHTML(), // You can't convince me editor is not null
		});

		if (ok) {
			if (!data) return;
			clearCache(URLHelpers.apiPosts(), URLHelpers.apiPost(data.id));
			setStatus("success");
			push(URLHelpers.getPost(data));
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
		<Styles.Container className="my-4">
			<Styles.A className="mb-2" as={Link} to={URLHelpers.getPost(post)}>
				<Icon className="mr-1" size={1} path={mdiKeyboardBackspace} />
				Back
			</Styles.A>
			<Styles.H3 className="mb-5">Edit post</Styles.H3>
			<Styles.Input
				className="mb-2 w-full"
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<Editor status={status} error={errorMessage} editor={editor} />
			<StatusButton status={status} className="mt-4" onClick={submit}>
				Save
			</StatusButton>
		</Styles.Container>
	);
}
