import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Close, Wrapper } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { theme } from "../../../styles/theme";
import { Input, ButtonLoading } from "../../misc";
import { A, H3, P, Col, FormError } from "../../styled-components";
import { useInputs, useClickOutside } from "../../hooks";
import { useAuthModals, useAuth } from "../../contexts";
import classnames from "classnames";
import { ModalStatus } from "./";

export function Register() {
	const { register, loggedIn } = useAuth();
	const { activeModal, closeModals, openModal } = useAuthModals();

	const active = activeModal === "register";

	const wrapper = useClickOutside<HTMLFormElement>(() => active && closeModals());

	const [status, setStatus] = useState<ModalStatus>(null);
	const { inputs, onChange } = useInputs({ email: "", password: "", passwordConfirm: "" });
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
			setStatus(null);
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}

	return (
		<Wrapper className={classnames({ active })} ref={wrapper} as="form" onSubmit={submit}>
			<Close onClick={closeModals}>
				<Icon path={mdiClose} />
			</Close>
			<H3 className="mb-4">Register</H3>
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
				Already a member?{" "}
				<A className="font-bold" onClick={() => openModal("login")}>
					Login
				</A>
			</P>
			<ButtonLoading type="submit" status={status} disabled={status === "loading"}>
				Register
			</ButtonLoading>
		</Wrapper>
	);
}
