import { useState, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Modal } from "./Modals";
import { Close, Title, Wrapper } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Input } from "../../styled-components/interactive";
import useForm from "../../hooks/useForm";

interface Props {
	active: boolean;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Login({ active, open, closeAll }: Props) {
	const wrapper = useClickOutside<HTMLDivElement>(() => {
		if (active) closeAll();
	});

	const { onSubmit, onChange, inputs } = useForm({
		email: {},
		password: {},
	});

	// console.log(inputs);

	return (
		<Wrapper ref={wrapper} active={active}>
			<Close onClick={closeAll}>
				<Icon path={mdiClose} />
			</Close>
			<Title>Login</Title>
			Login here!
			<form onSubmit={onSubmit}>
				<Input
					value={inputs.email.value}
					onChange={e => onChange(e, "email")}
					type="text"
				/>
				<Input
					value={inputs.password.value}
					onChange={e => onChange(e, "password")}
					type="text"
				/>
			</form>
			<button onClick={() => open("register")}>Register</button>
		</Wrapper>
	);
}
