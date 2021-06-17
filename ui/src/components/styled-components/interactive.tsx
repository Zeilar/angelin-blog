import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

export const button = css`
	font: inherit;
	border: 0;
	padding: 10px 14px;
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
		color: rgb(${theme.color.textMuted});
	}
`;

export const Button = styled.button`
	${button}
	background-color: rgba(${theme.color.body});
	color: rgb(${theme.color.text});
	min-width: 5rem;
	font-size: 1.2rem;
	box-shadow: ${theme.shadow.elevateUnder};
	transition: transform 0.25s;
	border: 1px solid rgb(${theme.color.brand});
	&:not([disabled]) {
		&:hover {
			box-shadow: ${theme.shadow.spread};
		}
		&:active {
			background-color: rgba(${theme.color.brand}, 0.05);
		}
	}
`;

export const ButtonSmall = styled.button`
	${button}
	width: fit-content;
	border-radius: ${theme.borderRadius}px;
	background-color: rgb(${theme.color.primary});
	border: 1px solid transparent;
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
	&:focus,
	&:hover {
		box-shadow: ${theme.shadow.elevate}, 0 0 5px 0 rgba(0, 0, 0, 0.5);
	}
	&:focus {
		background-color: rgb(${theme.color.secondary});
	}
	${({ error }: { error?: boolean }) =>
		error &&
		css`
			box-shadow: ${theme.shadow.elevate}, 0 0 2px 2px rgb(${theme.color.brand}) !important;
		`}
`;

export const FormError = styled.p`
	background-color: rgb(${theme.color.brand});
	border-radius: ${theme.borderRadius}px;
	box-shadow: ${theme.shadow.elevate};
	color: rgb(${theme.color.textSecondary});
	font-weight: bold;
	padding: 8px;
`;
