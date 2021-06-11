import { FormEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Modal } from "./Modals";
import { Close, Title, Wrapper, Inputs } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { Input } from "../../styled-components/interactive";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../contexts/UserContext";
import ButtonLoading from "../../misc/ButtonLoading";
import { theme } from "../../../styles/theme";
import { userLoginSchema, getMessage } from "../../../utils/validation";

interface Props {
	active: boolean;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Login({ active, open, closeAll }: Props) {
	const { login, loggedIn } = useAuth();

	const wrapper = useClickOutside<HTMLFormElement>(() => {
		if (active) closeAll();
	});

	const [status, setStatus] = useState<"error" | "loading" | "success" | "done">();
	const firstInput = useRef<HTMLInputElement | null>(null);
	const { onChange, inputs, validate, errors } = useForm(["email", "password"], userLoginSchema);

	useEffect(() => {
		if (active && firstInput.current) {
			firstInput.current.focus();
		}
	}, [active]);

	console.log(errors);

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (loggedIn) return;

		validate();
		// if (validation !== true) return console.log(validation[0].path);

		setStatus("loading");

		const { code } = await login({
			email: inputs.email,
			password: inputs.password,
		});

		if (code === 200) {
			setStatus("success");

			setTimeout(() => {
				closeAll();
				setStatus("done");
			}, theme.durations.modalsAfterResponse);
		} else {
			setStatus("error");
		}

		setTimeout(() => {
			setStatus(undefined);
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}

	return (
		<Wrapper ref={wrapper} active={active} as="form" onSubmit={submit}>
			<Close onClick={closeAll}>
				<Icon path={mdiClose} />
			</Close>
			<Title>Login</Title>
			<Inputs>
				<Input
					ref={firstInput}
					value={inputs.email.value}
					onChange={e => onChange(e, "email")}
					type="text"
					placeholder="john.smith@gmail.com"
					title="Email"
					style={{ marginBottom: 10 }}
				/>
				<Input
					value={inputs.password.value}
					onChange={e => onChange(e, "password")}
					type="password"
					placeholder="••••••••••"
					title="Password"
				/>
			</Inputs>
			<ButtonLoading type="submit" status={status}>
				Login
			</ButtonLoading>
			{/* <Button onClick={() => open("register")}>Register</Button> */}
		</Wrapper>
	);
}
