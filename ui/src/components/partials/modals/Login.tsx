import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Close, Wrapper } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { ButtonLoading, Input } from "../../misc";
import { theme } from "../../../styles/theme";
import { FormError, Col, A, H3, P } from "../../styled-components";
import { useInputs, useClickOutside } from "../../hooks";
import { useAuthModals, useAuth } from "../../contexts";
import classnames from "classnames";
import { ModalStatus } from "./";

export function Login() {
	const { login, loggedIn } = useAuth();
	const { activeModal, closeModals, openModal } = useAuthModals();

	const active = activeModal === "login";

	const wrapper = useClickOutside<HTMLFormElement>(() => active && closeModals());

	const [status, setStatus] = useState<ModalStatus>(null);
	const { inputs, onChange } = useInputs({ email: "", password: "" });
	const [error, setError] = useState<string | string[] | null>(null);

	const firstInput = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (active && firstInput.current) {
			firstInput.current.focus();
		}
	}, [active]);

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
				closeModals();
				setStatus("done");
			}, theme.durations.modalsAfterResponse);
		} else {
			if (error) setError(error);
			setStatus("error");
		}

		setTimeout(() => {
			setStatus(null);
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}

	return (
		<Wrapper className={classnames({ active })} ref={wrapper} as="form" onSubmit={submit}>
			<Close onClick={closeModals}>
				<Icon path={mdiClose} />
			</Close>
			<H3 className="mb-4">Login</H3>
			{error && <FormError>{error}</FormError>}
			<Col className="mb-10">
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
				Not a member?{" "}
				<A className="font-bold" onClick={() => openModal("register")}>
					Register
				</A>
			</P>
			<ButtonLoading type="submit" status={status} disabled={status === "loading"}>
				Login
			</ButtonLoading>
		</Wrapper>
	);
}
