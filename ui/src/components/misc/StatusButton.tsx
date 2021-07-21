import { ReactNode } from "react";
import styled from "styled-components";
import { PrimaryButton } from "../styled-components";
import { mdiClose, mdiCheck, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import { Color } from "../../styles/theme";
import classNames from "classnames";
import { ModalStatus } from "../../types/modals";

interface Props {
	className?: string;
	children: ReactNode;
	status: ModalStatus;
	[key: string]: any;
}

export function StatusButton(props: Props) {
	function renderIcon() {
		switch (props.status) {
			case "error":
				return <StatusIcon path={mdiClose} />;
			case "done":
			case "success":
				return <StatusIcon path={mdiCheck} />;
			case "loading":
				return <StatusIcon path={mdiLoading} spin={1} />;
			default:
				return null;
		}
	}

	const classes = classNames(props.className, {
		active: props.status != null,
		error: props.status === "error",
		loading: props.status === "loading",
		success: props.status === "success" || props.status === "done",
	});

	return (
		<StyledButton disabled={props.status != null} {...props} className={classes}>
			{renderIcon()} {props.children}
		</StyledButton>
	);
}

const StatusIcon = styled(Icon)`
	color: hsl(${Color.pick("text").get()});
`;

const StyledButton = styled(PrimaryButton)`
	position: relative;

	& ${StatusIcon} {
		transform: translate(-50%, -50%);
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2rem;
		height: 2rem;
	}

	&.active {
		color: transparent !important;
		pointer-events: none;
	}

	&.success {
		background-color: hsl(${Color.pick("success").get()});
	}

	&.error {
		background-color: hsl(${Color.pick("error").get()});
	}

	&.loading {
		background-color: hsla(${Color.pick("brand").get()}, 0.25);
	}
`;
