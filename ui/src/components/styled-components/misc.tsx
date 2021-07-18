import styled from "styled-components";
import { Color, Shadow, theme } from "../../styles/theme";
import * as Styles from "./";

export const PostWrapper = styled(Styles.Col)`
	background-color: hsl(${Color.pick("primary").get()});
	border-radius: ${theme.borderRadius}px;
	padding: 1rem;
	box-shadow: ${Shadow.pick("elevateUnder")};
`;
