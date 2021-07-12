import styled from "styled-components";
import { theme } from "../../../styles/theme";
import Icon from "@mdi/react";
import * as Styles from "../../styled-components";

export const Wrapper = styled(Styles.Row)`
	background-color: rgb(${theme.color.secondary});
	flex-wrap: wrap;
	margin: -1px;
	padding: 0.25rem;
	margin-bottom: 0.5rem;
	box-shadow: ${theme.shadow.elevateUnder};
`;

export const ToolbarButton = styled.button`
	padding: 0.5rem;
	font-size: 1rem;
	min-width: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1px;
	border-radius: ${theme.borderRadius}px;
	&:hover {
		background-color: rgb(${theme.color.primary});
	}
	&.active {
		background-color: hsl(${theme.color.brand});
	}
	&:focus {
		outline: 0;
	}
`;

export const ToolbarIcon = styled(Icon)`
	width: 1.5rem;
	height: 1.5rem;
`;
