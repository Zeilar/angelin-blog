import styled, { css } from "styled-components";
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
	font-weight: 600;
	${props => css`
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
		border-radius: ${props.theme.borderRadius}px;
		background-color: hsl(${props.theme.color.get("primary")});
		color: hsl(${props.theme.color.get("text")});
	`}
	&:focus {
		outline: 0;
	}
	&[disabled] {
		box-shadow: none;
		background-color: rgba(0, 0, 0, 0.1);
		cursor: default;
		pointer-events: none;
		border-color: transparent;
		${props => css`
			color: hsl(${props.theme.color.get("textMuted")});
		`}
	}
`;

export const PrimaryButton = styled.button`
	${button}
	min-width: 5rem;
	transition: transform 0.25s;
	${props => css`
		background-color: hsl(${props.theme.color.get("brand")});
		color: hsl(${props.theme.color.get("textSecondary")});
		&:hover {
			background-color: hsl(${props.theme.color.pick("brand").darken().get()});
		}
	`}
`;

export const SecondaryButton = styled.button`
	${button}
	width: fit-content;
	border: 1px solid transparent;
	padding: 0.5rem 1rem;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
		background-color: hsl(${props.theme.color.pick("secondary").lighten(4).get()});
		&:hover {
			background-color: hsl(${props.theme.color.pick("secondary").lighten(6).get()});
		}
	`}
`;

export const IconButton = styled.button`
	${button}
	width: fit-content;
	background: none;
	box-shadow: none;
	padding: 0.5rem;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		&:hover {
			background-color: hsl(${props.theme.color.pick("primary").lighten(4).get()});
		}
	`}
	& > * {
		min-width: 1rem;
		min-height: 1rem;
	}
`;

export const Input = styled.input`
	outline: 0;
	border: 0;
	min-width: 15rem;
	padding: 0.75rem;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		background-color: hsl(${props.theme.color.get("secondary")});
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
		&.error {
			border: 1px solid hsl(${props.theme.color.get("error")});
		}
		&:focus {
			background-color: hsl(${props.theme.color.get("primary")});
		}
	`}
`;

export const FormError = styled(Styles.P)`
	width: 100%;
	padding: 0.75rem;
	${props => css`
		background-color: hsla(${props.theme.color.pick("error").get()}, 0.25);
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
		color: hsl(${props.theme.color.get("text")});
		border-left: 2px solid hsl(${props.theme.color.get("error")});
		border-radius: ${props.theme.borderRadius}px;
	`}
`;

const StyledInputError = styled(Styles.Span)`
	font-weight: bold;
	${props => css`
		color: hsl(${props.theme.color.get("error")});
	`}
`;
const InputErrorIcon = styled(Icon)`
	${props => css`
		color: hsl(${props.theme.color.get("error")});
	`}
`;
export function InputError({ message, ...props }: { message?: string; [key: string]: any }) {
	return (
		<Styles.Row {...props}>
			<InputErrorIcon className="mr-1" path={mdiAlertCircleOutline} size={1} />
			<StyledInputError className="mb-2">{message}</StyledInputError>
		</Styles.Row>
	);
}
