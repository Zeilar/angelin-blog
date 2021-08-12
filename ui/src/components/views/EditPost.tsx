import Editor from "../partials/editor/Editor";
import * as Styles from "../styled-components";
import { FetchContext, IFetchContext, useFetch, useTitle } from "../hooks";
import { useEditor } from "@tiptap/react";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";
import { useState, useContext } from "react";
import StarterKit from "@tiptap/starter-kit";
import { IStatus } from "../../types/modals";
import { theme } from "../../styles/theme";
import { Post, User } from "../../models";
import { ContainerLoader, StatusButton } from "../misc";
import { URLHelpers } from "../../utils";
import { useEffect } from "react";
import { mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";
import { PostPreview } from "../partials";
import { IUserContext, UserContext } from "../contexts";

interface MatchParams {
	id: string;
	title?: string;
}

export function EditPost({ match }: RouteComponentProps<MatchParams>) {
	const url = URLHelpers.apiPost(match.params.id);
	const query = useFetch<{ data: Post }>(url);
	const post = query.body?.data ? new Post(query.body.data) : null;

	const { push } = useHistory();
	const userContext = useContext(UserContext) as IUserContext;
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const [status, setStatus] = useState<IStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState<string>("");
	const [preview, setPreview] = useState(false);

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

	if (!editor) return null;

	function closePreview() {
		setPreview(false);
	}

	if (preview) {
		const user = userContext.user as User;
		const now = new Date().toISOString();
		return (
			<Styles.Container className="my-8" direction="column">
				<PostPreview
					post={
						new Post({
							id: 0,
							title,
							body: editor.getHTML(),
							author: user,
							user_id: user.id,
							created_at: now,
							updated_at: now,
							comments: [],
							tags: [],
						})
					}
					close={closePreview}
				/>
			</Styles.Container>
		);
	}

	async function submit() {
		if (!post) return;

		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await post.edit({
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

			setTimeout(() => {
				setStatus(null);
			}, theme.durations.modalsAfterResponse);
		}
	}

	return (
		<Styles.Container className="my-8 relative">
			<ContainerLoader loading={status === "loading"} />
			<Styles.A
				className="mb-4"
				as={Link}
				to={URLHelpers.getPost(post)}
				style={{ width: "fit-content" }}
			>
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
			<Styles.Row className="mt-4">
				<StatusButton status={status} onClick={submit}>
					Save
				</StatusButton>
				<Styles.PrimaryButton className="dark ml-2" onClick={() => setPreview(true)}>
					Preview
				</Styles.PrimaryButton>
			</Styles.Row>
		</Styles.Container>
	);
}
