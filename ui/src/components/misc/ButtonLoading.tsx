import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Button } from "../styled-components/interactive";
import { mdiLoading, mdiClose, mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { theme } from "../../styles/theme";

type Status = "loading" | "success" | "error" | "done";

interface Props {
	children: ReactNode;
	size?: "small" | "big";
	status?: Status;
	type?: "submit" | "button";
	disabled?: boolean;
}

interface ButtonAttributes {
	status?: Status;
	iconActive: boolean;
}

export default function ButtonLoading({ children, size, status, ...props }: Props) {
	function renderIcon() {
		switch (status) {
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

	if (size === "small") {
		return null;
	}

	return (
		<StyledButton status={status} iconActive={status != null} {...props}>
			{renderIcon()} {children}
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

	${({ iconActive, status }: ButtonAttributes) =>
		css`
			${status === "error" && "background-color: rgb(150, 0, 0);"}
			${(status === "success" || status === "done") && "background-color: rgb(0, 150, 0);"}
            ${iconActive &&
			css`
				color: transparent;
				pointer-events: none;
			`}
		`}
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
