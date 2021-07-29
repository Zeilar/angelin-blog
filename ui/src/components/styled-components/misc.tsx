import styled, { css } from "styled-components";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	padding: 1rem;
	position: relative;
	&:first-child {
		margin-top: 0;
	}
	${props => css`
		background-color: hsl(${props.theme.color.get("primary")});
		border: 1px solid hsl(${props.theme.color.get("secondary")});
	`}
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
