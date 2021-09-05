import styled, { css } from "styled-components";
import * as Styles from "./";
import { phone } from "./layout";

export const PostWrapper = styled(Styles.Col)`
	position: relative;
	padding: 2rem;
	&:first-child {
		margin-top: 0;
	}
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		background-color: ${props.theme.color.rgb("primary")};
		box-shadow: ${props.theme.shadow.pick("elevate")};
	`}
	${phone} {
		padding: 1rem;
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
			color: ${props.theme.color.rgb("brand")};
		}
	`}
`;
