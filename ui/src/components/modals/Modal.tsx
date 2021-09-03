import {
	useState,
	useEffect,
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	SetStateAction,
} from "react";
import classNames from "classnames";
import { Background } from "./_styles";

export interface RenderProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

interface Props {
	render(
		open: boolean,
		setOpen: Dispatch<SetStateAction<boolean>>
	): DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
	onEscape?: () => void;
	altOpen?: boolean;
	altSetOpen?: Dispatch<SetStateAction<boolean>>;
}

export function Modal({ render, onEscape, altOpen, altSetOpen }: Props) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = open || altOpen ? "hidden" : "overlay";
		return () => {
			document.body.style.overflow = "overlay";
		};
	}, [open, altOpen]);

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
		<Background className={classNames({ open: altOpen ?? open })}>
			{render(altOpen ?? open, altSetOpen ?? setOpen)}
		</Background>
	);
}
