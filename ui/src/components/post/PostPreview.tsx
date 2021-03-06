import styled, { css } from "styled-components";
import { Post } from "../../models";
import { PostFull } from "./";
import { Icon as MdiIcon } from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	post: Post;
	close(): void;
}

export function PostPreview({ post, close, ...props }: Props) {
	return (
		<div {...props}>
			<Close onClick={close} title="Close preview">
				<Icon path={mdiClose} />
			</Close>
			<PostFull post={post} withMenu={false} />
		</div>
	);
}

const Close = styled.button`
	position: fixed;
	right: 1rem;
	top: 6rem;
	${props => css`
		&:hover {
			color: ${props.theme.color.rgb("brand")};
		}
	`}
`;

const Icon = styled(MdiIcon)`
	width: 2rem;
	height: 2rem;
`;
