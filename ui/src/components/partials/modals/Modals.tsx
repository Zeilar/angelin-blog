import { useState, useEffect, ReactNode } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Login from "./Login";
import Register from "./Register";
import { Background } from "./_styles";

export type Modal = "login" | "register" | null;

interface Props {
	active: Modal;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Modals({ active, open, closeAll }: Props) {
	return (
		<Background active={active !== null}>
			<Login active={active === "login"} open={open} closeAll={closeAll} />
			<Register active={active === "register"} open={open} closeAll={closeAll} />
		</Background>
	);
}