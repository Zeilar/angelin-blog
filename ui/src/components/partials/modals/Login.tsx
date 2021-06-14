import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Modal } from "./Modals";
import { Close, Wrapper } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useAuth } from "../../contexts/UserContext";
import ButtonLoading from "../../misc/ButtonLoading";
import { theme } from "../../../styles/theme";
import Input from "../../misc/Input";
import { FormError } from "../../styled-components/interactive";
import { Col } from "../../styled-components/layout";
import { A, H3, P } from "../../styled-components/typography";

interface Props {
	active: boolean;
	open: (modal: Modal) => void;
	closeAll: () => void;
}

export default function Login({ active, open, closeAll }: Props) {
	const { login, loggedIn } = useAuth();

	const wrapper = useClickOutside<HTMLFormElement>(() => active && closeAll());

	const [status, setStatus] = useState<"error" | "loading" | "success" | "done">();
	const [inputs, setInputs] = useState({ email: "", password: "" });
	const [error, setError] = useState<string | null>(null);

	const firstInput = useRef<HTMLInputElement | null>(null);

	// const { onChange, inputs, validate, errors } = useForm(["email", "password"], z => ({
	// 	email: z.string().min(3).max(30).email(),
	// 	password: z.string().min(3).max(30),
	// }));

	useEffect(() => {
		if (active && firstInput.current) {
			firstInput.current.focus();
		}

		if (active) document.title = "Angelin Blog | Login";
		return () => {
			document.title = "Angelin Blog";
		};
	}, [active]);

	function onChange(e: ChangeEvent<HTMLInputElement>, input: string) {
		setInputs(inputs => ({ ...inputs, [input]: e.target.value }));
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loggedIn) return;

		setStatus("loading");

		const { code, error } = await login({
			email: inputs.email,
			password: inputs.password,
		});

		if (code === 200) {
			setError(null);
			setStatus("success");

			setTimeout(() => {
				closeAll();
				setStatus("done");
			}, theme.durations.modalsAfterResponse);
		} else {
			setError(error ?? null);
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
			<H3 className="mb-2">Login</H3>
			{error && <FormError>{error}</FormError>}
			<Col className="mb-7">
				<Input
					forwardRef={firstInput}
					value={inputs.email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "email")}
					type="text"
					placeholder="john.smith@gmail.com"
					title="Email"
					label="Email"
				/>
				<Input
					value={inputs.password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "password")}
					type="password"
					placeholder="••••••••••"
					title="Password"
					label="Password"
				/>
			</Col>
			<P className="mb-5">
				Not a member? <A onClick={() => open("register")}>Register</A>
			</P>
			<ButtonLoading type="submit" status={status} disabled={status === "loading"}>
				Login
			</ButtonLoading>
		</Wrapper>
	);
}
