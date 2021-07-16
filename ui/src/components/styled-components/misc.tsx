import styled from "styled-components";
import { theme } from "../../styles/theme";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	background-color: rgb(${theme.color.primary});
	border-radius: ${theme.borderRadius}px;
	padding: 1rem;
	box-shadow: ${theme.shadow.spread};
`;
