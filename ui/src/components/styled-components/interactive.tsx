import styled, { css } from "styled-components";
import { Color, theme } from "../../styles/theme";
import * as Styles from "./";
import { mdiAlertCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

export const button = css`
	${Styles.flexbox}
	font: inherit;
	border: 0;
	padding: 0.5rem 1rem;
	user-select: none;
	font-family: Open Sans;
	justify-content: center;
	align-items: center;
	background-color: hsl(${Color.pick("primary").get()});
	box-shadow: ${theme.shadow.elevateUnder};
	border-radius: ${theme.borderRadius}px;
	font-weight: 600;
	color: hsl(${Color.pick("text").get()});
	&:focus {
		outline: 0;
	}
	&[disabled] {
		box-shadow: none;
		background-color: rgba(0, 0, 0, 0.1);
		cursor: default;
		pointer-events: none;
		border-color: transparent;
		color: hsl(${Color.pick("textMuted").get()});
	}
`;

export const PrimaryButton = styled.button`
	${button}
	min-width: 5rem;
	font-size: 1.2rem;
	transition: transform 0.25s;
	background-color: hsl(${Color.pick("brand").get()});
	color: hsl(${Color.pick("textSecondary").get()});
	&:hover {
		background-color: hsl(${Color.pick("brand").darken().get()});
	}
`;

export const SecondaryButton = styled.button`
	${button}
	width: fit-content;
	border-radius: ${theme.borderRadius}px;
	background-color: hsl(${Color.pick("secondary").lighten(4).get()});
	border: 1px solid transparent;
	padding: 0.5rem 1rem;
	&:hover {
		background-color: hsl(${Color.pick("secondary").lighten(6).get()});
	}
`;

export const Input = styled.input`
	outline: 0;
	border: 0;
	min-width: 15rem;
	padding: 0.75rem;
	border-radius: ${theme.borderRadius}px;
	background-color: hsl(${Color.pick("body").get()});
	box-shadow: ${theme.shadow.elevateUnder};
	&.error {
		border: 1px solid hsl(${Color.pick("error").get()});
	}
	&:focus {
		background-color: hsl(${Color.pick("primary").get()});
	}
`;

export const FormError = styled(Styles.P)`
	width: 100%;
	background-color: hsla(${Color.pick("error").get()}, 0.25);
	box-shadow: ${theme.shadow.elevateUnder};
	color: hsl(${Color.pick("text").get()});
	border-left: 2px solid hsl(${Color.pick("error").get()});
	padding: 0.75rem;
	border-radius: ${theme.borderRadius}px;
`;

const StyledInputError = styled(Styles.Span)`
	color: hsl(${Color.pick("error").get()});
	font-weight: bold;
`;
const InputErrorIcon = styled(Icon)`
	color: hsl(${Color.pick("error").get()});
`;
export function InputError({ message, ...props }: { message?: string; [key: string]: any }) {
	return (
		<Styles.Row {...props}>
			<InputErrorIcon className="mr-1" path={mdiAlertCircleOutline} size={1} />
			<StyledInputError className="mb-2">{message}</StyledInputError>
		</Styles.Row>
	);
}
