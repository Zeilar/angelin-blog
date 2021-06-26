import { ReactNode } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "../styled-components";
import { mdiClose, mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { theme } from "../../styles/theme";
import classnames from "classnames";
import { ModalStatus } from "../../types/modals";

interface Props {
	className?: string;
	children: ReactNode;
	status?: ModalStatus;
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

	const classes = classnames(props.className, {
		active: props.status != null && props.status !== "loading",
		error: props.status === "error",
		success: props.status === "success" || props.status === "done",
	});

	return (
		<StyledButton {...props} className={classes}>
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
