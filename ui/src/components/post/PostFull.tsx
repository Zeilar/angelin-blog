import * as Models from "../../models";
import { useFetchContext } from "../hooks";
import * as Styles from "../sc";
import { ReadOnlyEditor } from "../editor";
import { Menu, MenuItem, MenuWrapper } from "../modals";
import { mdiDotsVertical, mdiPencil, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import { DateHelpers, URLHelpers } from "../../utils";
import { useUserContext } from "../contexts";
import { Tag } from "../partials";

interface Props {
	post: Models.Post;
	withMenu?: boolean;
}

export function PostFull({ post, withMenu = true }: Props) {
	const { clearCache } = useFetchContext();
	const { loggedIn } = useUserContext();
	const { push } = useHistory();

	if (!(post instanceof Models.Post)) {
		console.error("`post` must be an instance of class `Post`");
		return null;
	}

	async function deletePost() {
		const { ok } = await post.destroy();

		if (ok) {
			clearCache(URLHelpers.apiPosts(), URLHelpers.apiPost(post.id));
			push("/");
			return;
		}
	}

	function menuRender() {
		if (!loggedIn || !withMenu) return null;
		return (
			<Menu
				render={(open, setOpen) => (
					<Options>
						<Dots onClick={() => setOpen(p => !p)}>
							<Icon path={mdiDotsVertical} />
						</Dots>
						<MenuWrapper className={classNames({ open })}>
							<MenuItem as={Link} to={URLHelpers.editPost(post)}>
								Edit
								<Icon className="ml-4" path={mdiPencil} size={1} />
							</MenuItem>
							<MenuItem
								className="danger"
								onClick={async () => {
									setOpen(false);
									await deletePost();
								}}
							>
								Delete
								<Icon className="ml-4" path={mdiTrashCan} size={1} />
							</MenuItem>
						</MenuWrapper>
					</Options>
				)}
			/>
		);
	}

	return (
		<Styles.PostWrapper className="p-8" as="article">
			{menuRender()}
			<Styles.P className="muted mb-2">
				{DateHelpers.formatPostDate(post.created_at)}
			</Styles.P>
			<Styles.H3 className="mb-4 mr-12">{post.title}</Styles.H3>
			{post.tags.length > 0 && (
				<Styles.Row className="mt-2">
					{post.tags.map(tag => (
						<Tag className="mr-4" key={tag.id} tag={tag} />
					))}
				</Styles.Row>
			)}
			<ReadOnlyEditor content={post.body} />
		</Styles.PostWrapper>
	);
}

const Options = styled.div`
	position: absolute;
	right: 0.75rem;
	top: 0.75rem;
`;

const Dots = styled(Styles.IconButton)`
	position: absolute;
	width: 2rem;
	height: 2rem;
	padding: 0.25rem;
	right: 0;
	top: 0;
`;
