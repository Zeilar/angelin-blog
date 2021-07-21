import {
	useState,
	useEffect,
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	SetStateAction,
} from "react";
import { Col } from "../../styled-components";
import styled from "styled-components";
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
	background-color: hsl(${Color.pick("body").darken(2).get()});
	right: 0;
	top: 2.5rem;
	display: none;
	padding: 0.5rem;
	border-radius: ${theme.borderRadius}px;
	box-shadow: ${Shadow.pick("elevate")};
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
	&:hover {
		background-color: hsl(${Color.pick("primary").get()});
	}
	&.danger {
		color: hsl(${Color.pick("error").get()});
	}
`;
