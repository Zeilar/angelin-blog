import { FormEvent, useContext, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Modal } from "./Modals";
import { Close, Title, Wrapper, Inputs } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Input } from "../../styled-components/interactive";
import useForm from "../../hooks/useForm";
import { useAuth, UserContext } from "../../contexts/UserContext";

interface Props {
	active: boolean;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Login({ active, open, closeAll }: Props) {
	const context = useAuth();

	const wrapper = useClickOutside<HTMLFormElement>(() => {
		if (active) closeAll();
	});

	const { onChange, inputs, validate } = useForm({
		email: { value: "" },
		password: { value: "" },
	});

	const [queryingLogin, setQueryingLogin] = useState(false);

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const validated = validate();
		if (!validated) return;
		setQueryingLogin(true);
		const { code, data } = await context.login({
			email: inputs.email.value,
			password: inputs.password.value,
		});
		setQueryingLogin(false);
		if (code === 200) {
			closeAll();
		}
	}

	return (
		<Wrapper ref={wrapper} active={active} as="form" onSubmit={submit}>
			<Close onClick={closeAll}>
				<Icon path={mdiClose} />
			</Close>
			<Title>Login</Title>
			<Inputs>
				<Input
					value={inputs.email.value}
					onChange={e => onChange(e, "email")}
					type="text"
					placeholder="john.smith@gmail.com"
					style={{ marginBottom: 10 }}
				/>
				<Input
					value={inputs.password.value}
					onChange={e => onChange(e, "password")}
					type="password"
					placeholder="*******"
				/>
			</Inputs>
			<Button type="submit">Login</Button>
			{/* <Button onClick={() => open("register")}>Register</Button> */}
		</Wrapper>
	);
}
