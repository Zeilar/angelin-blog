import styled, { css } from "styled-components";
import Icon from "@mdi/react";
import * as Styles from "../../styled-components";

export const Wrapper = styled(Styles.Row)`
	flex-wrap: wrap;
	padding: 0.25rem;
	margin-bottom: 0.5rem;
	width: 100%;
	${props => css`
		background-color: hsl(${props.theme.color.get("secondary")});
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
		border-radius: ${props.theme.borderRadius}px;
	`}
`;

export const ToolbarButton = styled.button.attrs({ tabIndex: -1 })`
	padding: 0.5rem;
	font-size: 1rem;
	min-width: 2.5rem;
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0.25rem;
	font-weight: 600;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		&:hover {
			background-color: hsl(${props.theme.color.get("primary")});
		}
		&.active {
			color: hsl(${props.theme.color.get("textSecondary")});
			background-color: hsl(${props.theme.color.get("brand")});
		}
		&:focus {
			outline: 0;
		}
	`}
`;

export const ToolbarIcon = styled(Icon)`
	width: 1.5rem;
	height: 1.5rem;
`;
