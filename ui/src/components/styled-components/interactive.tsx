import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

export const button = css`
	font: inherit;
	border: 0;
	padding: 10px 14px;
	user-select: none;
	box-shadow: ${theme.shadow.elevate};
	border-radius: ${theme.borderRadius}px;
	font-weight: bold;
	color: rgb(${theme.color.text});
	&[disabled] {
		box-shadow: none;
		background-color: rgba(0, 0, 0, 0.1);
		cursor: default;
		color: rgb(${theme.color.textMuted});
	}
`;

export const Button = styled.button`
	${button}
	background-color: rgb(${theme.color.brand});
	color: rgb(${theme.color.textSecondary});
	min-width: 5rem;
	box-shadow: ${theme.shadow.elevateUnder};
	transition: transform 0.25s, background-color 0.05s;
	&:not([disabled]) {
		&:hover {
			box-shadow: ${theme.shadow.spread};
		}
		&:active {
			background-color: rgb(${theme.color.brandDark});
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
