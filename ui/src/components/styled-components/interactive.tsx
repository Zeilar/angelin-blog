import styled, { css } from "styled-components";
import { Color, theme } from "../../styles/theme";
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
	font-weight: 600;
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
	background-color: hsl(${Color.pick("brand").get()});
	color: rgb(${Color.pick("textSecondary").get()});
	&:hover {
		background-color: hsl(${Color.pick("brand").darken().get()});
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
		background-color: hsl(${Color.pick("brand").get()});
	}
`;

export const Input = styled.input`
	outline: 0;
	border: 0;
	min-width: 15rem;
	padding: 0.75rem;
	border-radius: ${theme.borderRadius}px;
	background-color: rgb(${Color.pick("secondary").get()});
	box-shadow: ${theme.shadow.elevateUnder};
	&.error {
		border: 1px solid rgb(${Color.pick("error").get()});
	}
	&:focus {
		background-color: rgb(${Color.pick("primary").get()});
	}
`;

export const FormError = styled(P)`
	width: 100%;
	background-color: rgba(${theme.color.error}, 0.25);
	box-shadow: ${theme.shadow.elevateUnder};
	color: rgb(${theme.color.text});
	border-left: 2px solid rgb(${theme.color.error});
	padding: 0.75rem;
	border-radius: ${theme.borderRadius}px;
`;
