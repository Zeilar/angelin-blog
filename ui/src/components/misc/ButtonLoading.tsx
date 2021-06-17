import { ReactNode } from "react";
import styled from "styled-components";
import { Button } from "../styled-components";
import { mdiLoading, mdiClose, mdiCheck } from "@mdi/js";
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

export function ButtonLoading(props: Props) {
	function renderIcon() {
		switch (props.status) {
			case "error":
				return <Error path={mdiClose} />;
			case "done":
			case "success":
				return <Success path={mdiCheck} />;
			case "loading":
				return <Loading path={mdiLoading} spin={1} />;
			default:
				return null;
		}
	}

	if (props.size === "small") {
		return null;
	}

	const classes = classnames(props.className, {
		iconActive: props.status != null,
		error: props.status === "error",
		success: props.status === "success" || props.status === "done",
	});

	return (
		<StyledButton className={classes} disabled={props.disabled} {...props}>
			{renderIcon()} {props.children}
		</StyledButton>
	);
}

const StyledButton = styled(Button)`
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
		background-color: rgb(0, 150, 0);
	}

	&.error {
		background-color: rgb(150, 0, 0);
	}

	&.iconActive {
		color: transparent !important;
		pointer-events: none;
	}
`;

const Loading = styled(Icon)`
	color: rgb(${theme.color.text});
`;

const Error = styled(Icon)`
	color: rgb(${theme.color.text});
`;

const Success = styled(Icon)`
	color: rgb(${theme.color.text});
`;
