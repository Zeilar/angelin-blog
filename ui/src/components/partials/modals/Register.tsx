import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
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
import useInputs from "../../hooks/useInputs";
import { useAuthModals } from "../../contexts/AuthModalContext";

export default function Register() {
	const { register, loggedIn } = useAuth();
	const { activeModal, closeModals, openModal } = useAuthModals();

	const active = activeModal === "register";

	const wrapper = useClickOutside<HTMLFormElement>(() => active && closeModals());

	const [status, setStatus] = useState<"error" | "loading" | "success" | "done">();
	const { inputs, onChange } = useInputs({ email: "", password: "", passwordConfirm: "" });
	const [error, setError] = useState<string | null>(null);

	const firstInput = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (active && firstInput.current) {
			firstInput.current.focus();
		}

		if (active) document.title = "Angelin Blog | Register";
		return () => {
			document.title = "Angelin Blog";
		};
	}, [active]);

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loggedIn) return;

		setStatus("loading");

		const { code, error } = await register({
			email: inputs.email,
			password: inputs.password,
			passwordConfirm: inputs.passwordConfirm,
		});

		if (code === 200) {
			setError(null);
			setStatus("success");

			setTimeout(() => {
				closeModals();
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
			<Close onClick={closeModals}>
				<Icon path={mdiClose} />
			</Close>
			<H3 className="mb-2">Register</H3>
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
				<Input
					value={inputs.passwordConfirm}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "passwordConfirm")}
					type="password"
					placeholder="••••••••••"
					title="Password confirmation"
					label="Password confirmation"
				/>
			</Col>
			<P className="mb-5">
				Already a member? <A onClick={() => openModal("login")}>Login</A>
			</P>
			<ButtonLoading type="submit" status={status} disabled={status === "loading"}>
				Register
			</ButtonLoading>
		</Wrapper>
	);
}
