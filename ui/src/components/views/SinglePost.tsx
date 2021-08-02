import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { FetchContext, IFetchContext, useFetch, useTitle } from "../hooks";
import * as Styles from "../styled-components";
import { ReadOnlyEditor } from "../partials/editor";
import { Menu, MenuItem, MenuWrapper } from "../partials/modals";
import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import classNames from "classnames";
import { IconButton } from "../styled-components";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { URLHelpers } from "../../utils/URLHelpers";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const url = URLHelpers.apiPost(match.params.id);

	const query = useFetch<{ data: Post }>(url);
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const { push } = useHistory();

	const post = query.body?.data;

	useTitle(`Angelin Blog | ${post?.title}`);

	if (!query.body?.data) {
		return null;
	}

	async function deletePost() {
		const { ok } = await Post.destroy(post!.id);
		if (ok) {
			clearCache(url);
			push("/");
			return;
		}
	}

	return (
		<Styles.Container className="my-4" direction="column">
			<Styles.PostWrapper>
				<Menu
					render={(open, setOpen) => (
						<Options>
							<Dots onClick={() => setOpen(p => !p)}>
								<Icon path={mdiDotsVertical} />
							</Dots>
							<MenuWrapper className={classNames({ open })}>
								<MenuItem
									onClick={() => {
										setOpen(false);
										push(`/post/${post?.id}-${post?.title}/edit`);
									}}
								>
									Edit
								</MenuItem>
								<MenuItem
									className="danger"
									onClick={async () => {
										setOpen(false);
										await deletePost();
									}}
								>
									Delete
								</MenuItem>
							</MenuWrapper>
						</Options>
					)}
				/>
				<Styles.H4 className="mb-4">{query.body.data.title}</Styles.H4>
				<ReadOnlyEditor content={query.body.data.body} />
			</Styles.PostWrapper>
		</Styles.Container>
	);
}

const Options = styled.div`
	position: absolute;
	right: 0.75rem;
	top: 0.75rem;
`;

const Dots = styled(IconButton)`
	position: absolute;
	width: 2rem;
	height: 2rem;
	padding: 0.25rem;
	right: 0;
	top: 0;
`;
