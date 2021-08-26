import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { PrimaryButton } from "../sc";
import { mdiClose, mdiCheck, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { IStatus } from "../../types/modals";

interface Props {
	className?: string;
	children: ReactNode;
	status: IStatus;
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
				return null;
			default:
				return null;
		}
	}

	const classes = classNames(props.className, {
		active: props.status && props.status !== "loading",
		error: props.status === "error",
		success: props.status === "success" || props.status === "done",
	});

	return (
		<StyledButton disabled={props.status === "loading"} {...props} className={classes}>
			{renderIcon()} {props.children}
		</StyledButton>
	);
}

const StatusIcon = styled(Icon)`
	${props => css`
		color: ${props.theme.color.rgb("text")};
	`}
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

	${props => css`
		&.success {
			background-color: ${props.theme.color.rgb("success")};
		}

		&.error {
			background-color: ${props.theme.color.rgb("error")};
		}
	`}
`;
