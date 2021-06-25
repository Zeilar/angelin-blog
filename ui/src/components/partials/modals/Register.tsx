import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Close, Wrapper } from "./_styles";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { ButtonStatus, Input } from "../../misc";
import { theme } from "../../../styles/theme";
import { FormError, Col, A, H3, P } from "../../styled-components";
import { useInputs, useClickOutside } from "../../hooks";
import { useAuthModals, useAuth } from "../../contexts";
import classnames from "classnames";
import { ModalStatus } from "./";
import ContainerLoader from "../../misc/ContainerLoader";

export function Register() {
	const { register, loggedIn } = useAuth();
	const { activeModal, closeModals, openModal } = useAuthModals();

	const active = activeModal === "register";

	const wrapper = useClickOutside<HTMLDivElement>(() => active && closeModals());

	const [status, setStatus] = useState<ModalStatus>(null);
	const { inputs, onChange, empty } = useInputs({ email: "", password: "", passwordConfirm: "" });
	const [error, setError] = useState<string | string[] | null>(null);

	const firstInput = useRef<HTMLInputElement>(null);

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
			empty();
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}

	return (
		<Wrapper className={classnames({ active })} ref={wrapper}>
			<form onSubmit={submit}>
				<ContainerLoader loading={status === "loading"} />
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
					<Input
						value={inputs.passwordConfirm}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							onChange(e, "passwordConfirm")
						}
						type="password"
						placeholder="••••••••••"
						title="Password Confirmation"
						label="Password Confirmation"
					/>
				</Col>
				<P className="mb-5">
					Already a member?{" "}
					<A className="font-bold" onClick={() => openModal("login")}>
						Login
					</A>
				</P>
				<ButtonStatus type="submit" status={status}>
					Login
				</ButtonStatus>
			</form>
		</Wrapper>
	);
}
