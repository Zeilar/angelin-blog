import styled, { css } from "styled-components";
import Icon from "@mdi/react";
import * as Styles from "../../styled-components";

export const Wrapper = styled(Styles.Row)`
	flex-wrap: wrap;
	padding: 0.25rem;
	width: 100%;
	z-index: 10;
	${props => css`
		background-color: ${props.theme.color.rgb("primary")};
		box-shadow: ${props.theme.shadow.pick("elevate")};
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
			background-color: ${props.theme.color.rgb("primary", 3)};
		}
		&.active {
			background-color: ${props.theme.color.rgb("brand")};
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
