import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { SERVER_URL } from "../../utils";
import { FetchContext, IFetchContext, useFetch } from "../hooks";
import * as Styles from "../styled-components";
import { ReadOnlyEditor } from "../partials/editor";
import useTitle from "../hooks/useTitle";
import { Menu, MenuItem, MenuWrapper } from "../partials/modals";
import { mdiDotsHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import classNames from "classnames";
import { IconButton } from "../styled-components";
import { useHistory } from "react-router-dom";
import { useContext } from "react";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const url = `${SERVER_URL}/api/posts/${match.params.id}`;
	const query = useFetch<{ data: Post }>(url);
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const { push } = useHistory();

	useTitle(`Angelin Blog | ${query.body?.data.title}`);

	if (!query.body?.data) {
		return null;
	}

	async function deletePost() {
		const { ok, error } = await Post.destroy(query.body!.data.id);
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
								<Icon path={mdiDotsHorizontal} />
							</Dots>
							<MenuWrapper className={classNames({ open })}>
								<MenuItem
									onClick={() => {
										setOpen(false);
										// ...
									}}
								>
									Item 1
								</MenuItem>
								<MenuItem
									className="danger"
									onClick={() => {
										setOpen(false);
										deletePost();
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
