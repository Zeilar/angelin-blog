import styled from "styled-components";
import { Color, Shadow, theme } from "../../styles/theme";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	background-color: hsl(${Color.pick("secondary").get()});
	border-radius: ${theme.borderRadius}px;
	padding: 1rem;
	position: relative;
	box-shadow: ${Shadow.pick("elevateUnder")};
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
	&:hover {
		color: hsl(${Color.pick("brand").get()});
	}
`;
