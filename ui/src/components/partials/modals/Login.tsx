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
import { RenderProps } from "./";

interface Props extends RenderProps {
	openRegister(): void;
}

export function Login({ open, setOpen, openRegister }: Props) {
	const { login, loggedIn } = useAuth();
	const { mountError } = useAuthModals();

	const wrapper = useClickOutside<HTMLDivElement>(() => open && setOpen(false));

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
		if (open && firstInput.current) {
			firstInput.current.focus();
		}
	}, [open]);

	useEffect(() => {
		if (!open) {
			empty();
			setError(null);
		}
	}, [loggedIn]);

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
				setOpen(false);
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
		<ModalStyles.Wrapper className={classnames({ open })} ref={wrapper}>
			<ModalStyles.Main onSubmit={submit}>
				<ContainerLoader loading={status === "loading"} />
				<ModalStyles.Close onClick={() => setOpen(false)} />
				<Styles.H3 className="mb-10">Login</Styles.H3>
				{error && <Styles.FormError className="mb-2">{error}</Styles.FormError>}
				<Styles.Col className="mb-12">
					<Input
						containerClass="mb-4"
						forwardRef={firstInput}
						value={inputs.email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "email")}
						type="text"
						title="Email"
						label="Email"
					/>
					<Input
						value={inputs.password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "password")}
						type="password"
						title="Password"
						label="Password"
					/>
				</Styles.Col>
				<StatusButton className="w-full" type="submit" status={status}>
					Login
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin onClick={oAuthSubmit} />
			</ModalStyles.Main>
			<ModalStyles.Footer>
				<Styles.PrimaryButton className="w-full" onClick={openRegister}>
					Not a member? Register
				</Styles.PrimaryButton>
			</ModalStyles.Footer>
		</ModalStyles.Wrapper>
	);
}
