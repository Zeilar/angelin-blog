import styled, { css } from "styled-components";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	padding: 1rem;
	position: relative;
	&:first-child {
		margin-top: 0;
	}
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		background-color: ${props.theme.color.rgb("primary")};
		box-shadow: ${props.theme.shadow.pick("elevate")};
		&.thumbnail {
			border-left: 4px solid ${props.theme.color.rgb("brand")};
		}
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

const loaderShared = css`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
`;
export const Loader = styled.div`
	${loaderShared}
	border: 0.35rem solid rgba(255, 255, 255, 0.25);
	animation: spin 1s infinite linear;
	position: relative;

	&::after {
		${loaderShared}
		position: absolute;
		left: -0.35rem;
		top: -0.35rem;
		content: "";
		border: 0.35rem solid transparent;
		${props => css`
			border-left: 0.35rem solid ${props.theme.color.rgb("brand")};
		`}
	}

	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
