import styled from "styled-components";
import { theme } from "../../../styles/theme";
import Icon from "@mdi/react";

export const ToolbarButton = styled.button`
	border: 1px solid rgb(${theme.color.primary});
	background-color: rgb(${theme.color.secondary});
	box-shadow: ${theme.shadow.elevate};
	padding: 0.25rem;
	font-size: 1rem;
	min-width: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1px;
	&.active {
		color: rgb(${theme.color.brand});
	}
	&:hover {
		background-color: rgb(${theme.color.primary});
	}
	&:focus {
		outline: 0;
	}
`;

export const ToolbarIcon = styled(Icon)`
	width: 1.5rem;
	height: 1.5rem;
`;
