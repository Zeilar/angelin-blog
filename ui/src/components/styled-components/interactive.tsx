import styled, { css } from "styled-components";
import { color, theme } from "../../styles/theme";
import { P, flexbox } from "./";

export const button = css`
	${flexbox}
	font: inherit;
	border: 0;
	padding: 0.5rem 1rem;
	user-select: none;
	font-family: Open Sans;
	justify-content: center;
	align-items: center;
	background-color: rgb(${theme.color.primary});
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
		pointer-events: none;
		border-color: transparent;
		color: rgb(${theme.color.textMuted});
	}
`;

export const PrimaryButton = styled.button`
	${button}
	min-width: 5rem;
	font-size: 1.2rem;
	box-shadow: ${theme.shadow.elevateUnder};
	transition: transform 0.25s;
	background-color: hsl(${color.pick("brand").get()});
	color: rgb(${color.pick("textSecondary").get()});
	&:active {
		background-color: hsl(${color.pick("brand").darken().get()});
	}
`;

export const SecondaryButton = styled.button`
	${button}
	width: fit-content;
	border-radius: ${theme.borderRadius}px;
	background-color: rgb(${theme.color.primary});
	border: 1px solid transparent;
	padding: 0.5rem 1rem;
	&:hover {
		background-color: hsl(${theme.color.brand});
	}
	&:active {
		background-color: hsl(${theme.darkenHsl(theme.color.brand)});
	}
`;

export const Input = styled.input`
	outline: 0;
	border: 0;
	min-width: 15rem;
	color: inherit;
	padding: 0.25rem 0;
	border-bottom: 2px solid hsl(${color.pick("brand").get()});
	background: none;
`;

export const FormError = styled(P)`
	background-color: rgba(${theme.color.error}, 0.25);
	box-shadow: ${theme.shadow.elevate};
	color: rgb(${theme.color.text});
	border-left: 2px solid rgb(${theme.color.error});
	padding: 0.75rem;
	border-radius: ${theme.borderRadius}px;
`;
