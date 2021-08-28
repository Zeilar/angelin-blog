import styled, { css } from "styled-components";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	position: relative;
	&:first-child {
		margin-top: 0;
	}
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		background-color: ${props.theme.color.rgb("primary")};
		box-shadow: ${props.theme.shadow.pick("elevate")};
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
			color: ${props.theme.color.rgb("brand")};
		}
	`}
`;
