import { useState, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Modal } from "./Modals";
import { Close, Title, Wrapper } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

interface Props {
	active: boolean;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Register({ active, open, closeAll }: Props) {
	const wrapper = useClickOutside<HTMLDivElement>(() => {
		if (active) closeAll();
	});

	return (
		<Wrapper ref={wrapper} active={active}>
			<Close onClick={closeAll}>
				<Icon path={mdiClose} />
			</Close>
			<Title>Register</Title>
			<button onClick={() => open("login")}>Login</button>
		</Wrapper>
	);
}
