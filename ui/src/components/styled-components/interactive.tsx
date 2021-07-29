import styled, { css } from "styled-components";
import * as Styles from "./";
import { mdiAlertCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

export const button = css`
	${Styles.flexbox}
	font: inherit;
	border: 0;
	padding: 0.75rem 1.25rem;
	user-select: none;
	font-family: Open Sans;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	${props => css`
		background-color: hsl(${props.theme.color.get("brand")});
		color: hsl(${props.theme.color.get("textStrong")});
		&:hover {
			background-color: hsl(${props.theme.color.pick("brand").darken().get()});
		}
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
	height: 3rem;
`;

export const SecondaryButton = styled.button`
	${button}
	width: fit-content;
	border-radius: 10px;
	padding: 0.5rem 0.75rem;
	height: 2.5rem;
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
			${props.theme.scheme === "dark"
				? `background-color: hsl(${props.theme.color.pick("primary").lighten().get()})`
				: `background-color: hsl(${props.theme.color.get("secondary")})`}
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
		background-color: hsl(${props.theme.color.get("primary")});
		border: 1px solid hsl(${props.theme.color.get("secondary")});
		&:focus {
			border-color: hsl(${props.theme.color.get("brand")});
		}
		&.error {
			border-color: hsl(${props.theme.color.get("error")});
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
			<StyledInputError>{message}</StyledInputError>
		</Styles.Row>
	);
}
