import {
	useState,
	useEffect,
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	SetStateAction,
} from "react";
import { Col, Row } from "../../styled-components";
import styled, { css } from "styled-components";
import { useClickOutside } from "../../hooks";
import Icon from "@mdi/react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	render(
		open: boolean,
		setOpen: Dispatch<SetStateAction<boolean>>
	): DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
	onEscape?: () => void;
	[key: string]: any;
}

export function Menu({ render, onEscape, ...props }: Props) {
	const [open, setOpen] = useState(false);

	const wrapper = useClickOutside<HTMLDivElement>(() => setOpen(false));

	useEffect(() => {
		function keyHandler(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setOpen(false);
				if (onEscape) onEscape();
			}
		}

		document.addEventListener("keydown", keyHandler);

		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
	}, [onEscape]);

	return (
		<div ref={wrapper} {...props}>
			{render(open, setOpen)}
		</div>
	);
}

export const MenuWrapper = styled(Col)`
	position: absolute;
	right: 0;
	top: 2.5rem;
	z-index: 50;
	display: none;
	overflow: hidden;
	padding: 0.5rem;
	min-width: 12rem;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		background-color: ${props.theme.color.rgb("primary", 2)};
		box-shadow: ${props.theme.shadow.pick("spread")};
	`}
	&.open {
		display: flex;
	}
`;

export const MenuItem = styled(Row).attrs({ justify: "space-between" })`
	padding: 0.5rem;
	cursor: pointer;
	z-index: 50;
	font-weight: 600;
	text-align: center;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		color: ${props.theme.color.rgb("text")};
		&.danger {
			color: ${props.theme.color.rgb("error")};
		}
		&:hover {
			background-color: ${props.theme.color.rgb("brand")};
			color: ${props.theme.color.rgb("textStrong")};
		}
	`}
`;
