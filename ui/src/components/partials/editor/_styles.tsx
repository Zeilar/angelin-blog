import styled from "styled-components";
import { Color, theme } from "../../../styles/theme";
import Icon from "@mdi/react";
import * as Styles from "../../styled-components";

export const Wrapper = styled(Styles.Row)`
	background-color: hsl(${Color.pick("secondary").get()});
	flex-wrap: wrap;
	padding: 0.25rem;
	margin-bottom: 0.5rem;
	box-shadow: ${theme.shadow.elevateUnder};
	border-radius: ${theme.borderRadius}px;
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
	font-weight: 600;
	&:hover {
		background-color: hsl(${Color.pick("primary").get()});
	}
	&.active {
		color: hsl(${Color.pick("textSecondary").get()});
		background-color: hsl(${Color.pick("brand").get()});
	}
	&:focus {
		outline: 0;
	}
`;

export const ToolbarIcon = styled(Icon)`
	width: 1.5rem;
	height: 1.5rem;
`;
