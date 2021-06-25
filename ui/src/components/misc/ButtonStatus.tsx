import { ReactNode } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "../styled-components";
import { mdiClose, mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { theme } from "../../styles/theme";
import classnames from "classnames";

type Status = "loading" | "success" | "error" | "done" | null;

interface Props {
	className?: string;
	children: ReactNode;
	size?: "small" | "big";
	status?: Status;
	type?: "submit" | "button";
	disabled?: boolean;
}

export function ButtonStatus(props: Props) {
	function renderIcon() {
		switch (props.status) {
			case "error":
				return <Error path={mdiClose} />;
			case "done":
			case "success":
				return <Success path={mdiCheck} />;
			default:
				return null;
		}
	}

	if (props.size === "small") {
		return null;
	}

	const classes = classnames(props.className, {
		active: props.status != null,
		error: props.status === "error",
		success: props.status === "success" || props.status === "done",
	});

	return (
		<StyledButton className={classes} disabled={props.disabled} {...props}>
			{renderIcon()} {props.children}
		</StyledButton>
	);
}

const StyledButton = styled(ButtonPrimary)`
	position: relative;
	transition: 0.05s;
	& svg {
		transform: translate(-50%, -50%);
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2rem;
		height: 2rem;
	}

	&.success {
		background-color: rgb(${theme.color.success});
		border-color: rgb(${theme.color.success});
	}

	&.error {
		background-color: rgb(${theme.color.error});
		border-color: rgb(${theme.color.error});
	}

	&.active {
		color: transparent !important;
		pointer-events: none;
	}
`;

const Error = styled(Icon)`
	color: rgb(${theme.color.text});
`;

const Success = styled(Icon)`
	color: rgb(${theme.color.text});
`;
