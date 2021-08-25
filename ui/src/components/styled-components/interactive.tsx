import styled, { css } from "styled-components";
import * as Styles from "./";
import { mdiAlertCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

export const button = css`
	${Styles.flexbox}
	font: inherit;
	border: 0;
	padding: 0.75rem 2rem;
	user-select: none;
	font-family: Open Sans;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	width: fit-content;
	${props => css`
		box-shadow: ${props.theme.shadow.pick("spread")};
		background-color: ${props.theme.color.rgb("brand")};
		color: ${props.theme.color.rgb("textStrong")};
		&.dark {
			background-color: ${props.theme.color.rgb("primary")};
			&:hover {
				background-color: ${props.theme.color.rgb("primary", 2)};
			}
		}
		&:hover {
			background-color: ${props.theme.color.rgb("brandDark")};
		}
	`}
	&.block {
		width: 100%;
	}
	&:focus {
		outline: 0;
	}
	&[disabled] {
		box-shadow: none;
		cursor: default;
		pointer-events: none;
		opacity: 0.35;
	}
`;

export const PrimaryButton = styled.button`
	${button}
	min-width: 5rem;
	min-height: 3rem;
`;

export const SecondaryButton = styled.button`
	${button}
	width: fit-content;
	border-radius: 10px;
	padding: 0.5rem 0.75rem;
	min-height: 2.5rem;
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
			background-color: ${props.theme.color.rgb("primary", 3)};
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
	transition: 0.05s;
	${props => css`
		box-shadow: ${props.theme.shadow.pick("spread")};
		background-color: ${props.theme.color.rgb("primary", 2)};
		&:focus {
			background-color: ${props.theme.color.rgb("primary", 3)};
			box-shadow: 0 0 0 2px ${props.theme.color.rgb("brand")} inset;
		}
		&.error {
			box-shadow: 0 0 0 2px ${props.theme.color.rgb("error")} inset;
		}
	`}
`;

export const FormError = styled(Styles.P)`
	width: 100%;
	padding: 0.75rem;
	${props => css`
		background-color: ${props.theme.color.rgba("error", 0.25)};
		box-shadow: ${props.theme.shadow.pick("elevate")};
		color: ${props.theme.color.rgb("text")};
		border-left: 2px solid ${props.theme.color.rgb("error")};
		border-radius: ${props.theme.borderRadius}px;
	`}
`;

const StyledInputError = styled(Styles.Span)`
	font-weight: bold;
	${props => css`
		color: ${props.theme.color.rgb("error")};
	`}
`;
const InputErrorIcon = styled(Icon)`
	${props => css`
		color: ${props.theme.color.rgb("error")};
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
