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
	overflow: hidden;
	${props => css`
		background-color: hsl(${props.theme.color.get("primary")});
		box-shadow: ${props.theme.shadow.pick("elevate")};
	`}
	&.open {
		display: flex;
	}
`;

export const MenuItem = styled.div`
	padding: 0.75rem 1.5rem;
	white-space: nowrap;
	cursor: pointer;
	z-index: 50;
	font-weight: 600;
	${props => css`
		&:hover {
			background-color: hsl(${props.theme.color.get("secondary")});
		}
		&.danger {
			color: hsl(${props.theme.color.get("error")});
		}
	`}
`;
