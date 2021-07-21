import styled, { css } from "styled-components";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	padding: 1rem;
	position: relative;
	${props => css`
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
		background-color: hsl(${props.theme.color.get("secondary")});
		border-radius: ${props.theme.borderRadius}px;
	`}
	&:first-child {
		margin-top: 0;
	}
`;

export const PostPreview = styled.article`
	position: relative;
	width: 75%;
	margin-left: auto;
	margin-right: auto;
`;

export const PostPreviewHeader = styled(Styles.H4)`
	${props => css`
		&:hover {
			color: hsl(${props.theme.color.get("brand")});
		}
	`}
`;
