import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import * as ModalStyles from "./_styles";
import { StatusButton, Input } from "../../misc";
import { theme } from "../../../styles/theme";
import * as Styles from "../../styled-components";
import { useInputs, useClickOutside } from "../../hooks";
import { useAuthModals, useAuth } from "../../contexts";
import classnames from "classnames";
import { ModalStatus } from "../../../types/modals";
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

	useEffect(() => {
		if (!active) {
			empty();
			setError(null);
		}
	}, [loggedIn]);

	useEffect(() => {
		function keyHandler(e: KeyboardEvent) {
			if (e.key === "Escape") {
				closeModals();
			}
		}

		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
	}, [closeModals]);

	function oAuthSubmit() {
		setStatus("loading");
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loggedIn) return;

		setStatus("loading");
		setError(null);

		const { ok, error } = await register({
			email: inputs.email,
			password: inputs.password,
			passwordConfirm: inputs.passwordConfirm,
		});

		if (ok) {
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
			if (ok) empty();
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}

	return (
		<ModalStyles.Wrapper className={classnames({ active })} ref={wrapper}>
			<form onSubmit={submit}>
				<ContainerLoader loading={status === "loading"} />
				<ModalStyles.Close onClick={closeModals} />
				<Styles.H3 className="mb-10">Register</Styles.H3>
				{error && <Styles.FormError className="mb-2">{error}</Styles.FormError>}
				<Styles.Col className="mb-10">
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
				</Styles.Col>
				<ModalStyles.ModalSwitch
					question="Already a member?"
					link="Login"
					onClick={() => openModal("login")}
				/>
				<StatusButton className="w-full" type="submit" status={status}>
					Register
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin onClick={oAuthSubmit} />
			</form>
		</ModalStyles.Wrapper>
	);
}
