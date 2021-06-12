import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Modal } from "./Modals";
import { Close, Title, Wrapper, Inputs } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../contexts/UserContext";
import ButtonLoading from "../../misc/ButtonLoading";
import { theme } from "../../../styles/theme";
import Input from "../../misc/Input";

interface Props {
	active: boolean;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Login({ active, open, closeAll }: Props) {
	const { login, loggedIn } = useAuth();

	const wrapper = useClickOutside<HTMLFormElement>(() => active && closeAll());

	const [status, setStatus] = useState<"error" | "loading" | "success" | "done">();
	const [error, setError] = useState<any>();

	const firstInput = useRef<HTMLInputElement | null>(null);
	const { onChange, inputs, validate, errors } = useForm(["email", "password"], z => ({
		email: z.string().min(3).max(30).email(),
		password: z.string().min(3).max(30),
	}));

	useEffect(() => {
		if (active && firstInput.current) {
			firstInput.current.focus();
		}
	}, [active]);

	function blurHandler() {
		if (!inputs.email || !inputs.password) {
			return;
		}
		validate();
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loggedIn || !validate()) return;
		await send();
	}

	async function send() {
		setStatus("loading");
		const { code, error } = await login({
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
			if (error) setError(error);
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
					errors={errors.email}
					forwardRef={firstInput}
					value={inputs.email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "email")}
					type="text"
					placeholder="john.smith@gmail.com"
					title="Email"
					style={{ marginBottom: 15 }}
					onBlur={blurHandler}
					label="Email"
				/>
				<Input
					errors={errors.password}
					value={inputs.password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "password")}
					type="password"
					placeholder="••••••••••"
					title="Password"
					onBlur={blurHandler}
					label="Password"
				/>
			</Inputs>
			<ButtonLoading type="submit" status={status} disabled={status === "loading"}>
				Login
			</ButtonLoading>
			{/* <Button onClick={() => open("register")}>Register</Button> */}
		</Wrapper>
	);
}
