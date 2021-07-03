import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { P } from "./typography";

export const button = css`
	font: inherit;
	border: 0;
	padding: 0.5rem 1rem;
	user-select: none;
	font-family: Heebo;
	box-shadow: ${theme.shadow.elevate};
	border-radius: ${theme.borderRadius}px;
	font-weight: bold;
	color: rgb(${theme.color.text});
	&:focus {
		outline: 0;
	}
	&[disabled] {
		box-shadow: none;
		background-color: rgba(0, 0, 0, 0.1);
		cursor: default;
		border-color: transparent;
		color: rgb(${theme.color.textMuted});
	}
`;

export const ButtonPrimary = styled.button`
	${button}
	background-color: rgba(${theme.color.brand});
	color: rgb(${theme.color.text});
	min-width: 5rem;
	font-size: 1.2rem;
	box-shadow: ${theme.shadow.elevateUnder};
	transition: transform 0.25s;
	&:not([disabled]) {
		&:active {
			background-color: rgba(${theme.color.brand}, 0.75);
		}
	}
`;

export const ButtonSecondary = styled.button`
	${button}
	width: fit-content;
	border-radius: ${theme.borderRadius}px;
	background-color: rgb(${theme.color.primary});
	border: 1px solid transparent;
	padding: 0.5rem 1rem;
	&:not([disabled]) {
		&:hover,
		&:active {
			background-color: rgb(${theme.color.body});
		}
	}
`;

export const Input = styled.input`
	background-color: rgb(${theme.color.body});
	outline: 0;
	border: 0;
	min-width: 15rem;
	color: inherit;
	padding: 10px;
	box-shadow: ${theme.shadow.elevate};
	border-radius: ${theme.borderRadius}px;
	&:focus {
		background-color: rgb(${theme.color.primary});
	}
	&.error {
		box-shadow: ${theme.shadow.elevate}, 0 0 2px 2px rgb(${theme.color.brand}) !important;
	}
`;

export const FormError = styled(P)`
	background-color: rgba(${theme.color.brand}, 0.25);
	box-shadow: ${theme.shadow.elevate};
	color: rgb(${theme.color.text});
	border-left: 2px solid rgb(${theme.color.brand});
	padding: 8px;
	border-radius: ${theme.borderRadius}px;
`;
