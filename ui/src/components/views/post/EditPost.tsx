import { Editor } from "../../editor";
import * as Styles from "../../sc";
import { useFetch, useFetchContext, useTitle } from "../../hooks";
import { useEditor } from "@tiptap/react";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";
import StarterKit from "@tiptap/starter-kit";
import { IStatus } from "../../../types/modals";
import { theme } from "../../../styles/theme";
import { Post, Tag, User } from "../../../models";
import { ContainerLoader, StatusButton, TagsInput } from "../../form";
import { URLHelpers } from "../../../utils";
import { useEffect, useState, useMemo } from "react";
import { mdiKeyboardBackspace } from "@mdi/js";
import Icon from "@mdi/react";
import { useUserContext } from "../../contexts";
import { PostPreview } from "../../post";

interface MatchParams {
	id: string;
	title?: string;
}

export function EditPost({ match }: RouteComponentProps<MatchParams>) {
	const postQuery = useFetch<{ data: Post }>(URLHelpers.apiPost(match.params.id));
	const postData = postQuery.body?.data;
	const post = useMemo(() => (postData ? new Post(postData) : null), [postData]);

	const tagsQuery = useFetch<{ data: Tag[] }>(URLHelpers.apiTags());
	const allTags = tagsQuery.body?.data;

	const { push } = useHistory();
	const userContext = useUserContext();
	const { clearCache } = useFetchContext();
	const [status, setStatus] = useState<IStatus>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [title, setTitle] = useState<string>("");
	const [tags, setTags] = useState<Tag[]>(post?.tags ?? []);
	const [preview, setPreview] = useState(false);

	const isLoading = status === "loading" || postQuery.isLoading || tagsQuery.isLoading;

	useTitle("Angelin Blog | Edit Post");

	useEffect(() => {
		if (post?.title) {
			setTitle(post.title);
		}
	}, [post?.title]);

	useEffect(() => {
		if (post?.tags) {
			setTags(post.tags);
		}
	}, [post?.tags]);

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

	function openPreview() {
		setPreview(true);
	}

	function onChange(tags: string[]) {
		setTags(tags.map(tag => Tag.fake({ name: tag })));
	}

	async function submit() {
		if (!post || !editor) return;

		setErrorMessage(null);
		setStatus("loading");

		const { data, ok, error } = await post.edit({
			title,
			body: editor.getHTML(),
			tags: tags.map(tag => tag.name),
		});

		if (ok) {
			if (!data) return;
			clearCache(URLHelpers.apiPosts(), URLHelpers.apiPost(data.id));
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
						tags,
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
			<Styles.A
				className="mb-4"
				as={Link}
				to={URLHelpers.viewPost(post)}
				style={{ width: "fit-content" }}
			>
				<Icon className="mr-1" size={1} path={mdiKeyboardBackspace} />
				Back
			</Styles.A>
			<Styles.H3 className="mb-5">Edit post</Styles.H3>
			<Styles.Col className="relative">
				<ContainerLoader loading={isLoading} />
				{renderEditor()}
			</Styles.Col>
			<TagsInput allTags={allTags} defaultTags={tags} onChange={onChange} />
			<Styles.Row className="mt-4">
				<StatusButton disabled={isLoading} status={status} onClick={submit}>
					Save
				</StatusButton>
				<Styles.PrimaryButton
					disabled={isLoading}
					className="dark ml-2"
					onClick={preview ? closePreview : openPreview}
				>
					{preview ? "Close" : "Preview"}
				</Styles.PrimaryButton>
			</Styles.Row>
		</Styles.Container>
	);
}
