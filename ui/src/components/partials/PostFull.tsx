import { Post } from "../../models";
import { FetchContext, IFetchContext } from "../hooks";
import * as Styles from "../styled-components";
import { ReadOnlyEditor } from "../partials/editor";
import { Menu, MenuItem, MenuWrapper } from "../partials/modals";
import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import classNames from "classnames";
import { IconButton } from "../styled-components";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { URLHelpers } from "../../utils";

interface Props {
	post: Post;
}

export function PostFull({ post }: Props) {
	const { clearCache } = useContext(FetchContext) as IFetchContext;
	const { push } = useHistory();

	if (!(post instanceof Post)) {
		console.error("`post` must be an instance of class `Post`");
		return null;
	}

	async function deletePost() {
		const { ok } = await post.destroy();

		if (ok) {
			clearCache(URLHelpers.getPost(post));
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
								<MenuItem as={Link} to={URLHelpers.editPost(post)}>
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
				<Styles.H4 className="mb-4">{post.title}</Styles.H4>
				<ReadOnlyEditor content={post.body} />
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
