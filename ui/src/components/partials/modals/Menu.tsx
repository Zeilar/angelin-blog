import {
	useState,
	useEffect,
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	SetStateAction,
} from "react";
import { Col } from "../../styled-components";
import styled, { css } from "styled-components";
import { useClickOutside } from "../../hooks";
import { Color, Shadow, theme } from "../../../styles/theme";

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
	display: none;
	padding: 0.5rem;
	${props => css`
		background-color: hsl(${props.theme.color.pick("body").darken(2).get()});
		border-radius: ${props.theme.borderRadius}px;
		box-shadow: ${props.theme.shadow.pick("elevate")};
	`}
	&.open {
		display: flex;
	}
`;

export const MenuItem = styled.div`
	padding: 0.5rem 1rem;
	white-space: nowrap;
	cursor: pointer;
	z-index: 50;
	border-radius: ${theme.borderRadius}px;
	font-weight: 600;
	${props => css`
		&:hover {
			background-color: hsl(${props.theme.color.get("primary")});
		}
		&.danger {
			color: hsl(${props.theme.color.get("error")});
		}
	`}
`;
