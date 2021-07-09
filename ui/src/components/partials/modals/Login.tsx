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

export function Login() {
	const { login, loggedIn } = useAuth();
	const { activeModal, closeModals, openModal, mountError } = useAuthModals();

	const active = activeModal === "login";

	const wrapper = useClickOutside<HTMLDivElement>(() => active && closeModals());

	const [status, setStatus] = useState<ModalStatus>(null);
	const { inputs, onChange, empty } = useInputs({ email: "", password: "" });
	const [error, setError] = useState<string | string[] | null>(null);

	const firstInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// mountError should only ever change once
		// But this useEffect is required, as the first render mountError will be null
		setError(mountError);
	}, [mountError]);

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

		const { error, ok } = await login({
			email: inputs.email,
			password: inputs.password,
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
				<Styles.H3 className="mb-10">Login</Styles.H3>
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
				</Styles.Col>
				<ModalStyles.ModalSwitch
					question="Not a member?"
					link="Register"
					onClick={() => openModal("register")}
				/>
				<StatusButton className="w-full" type="submit" status={status}>
					Login
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin onClick={oAuthSubmit} />
			</form>
		</ModalStyles.Wrapper>
	);
}
