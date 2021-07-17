import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import * as ModalStyles from "./_styles";
import { StatusButton, Input } from "../../misc";
import { theme } from "../../../styles/theme";
import * as Styles from "../../styled-components";
import { useInputs, useClickOutside, useLocalStorage } from "../../hooks";
import { useAuthModals, useAuth } from "../../contexts";
import classnames from "classnames";
import { ModalStatus } from "../../../types/modals";
import ContainerLoader from "../../misc/ContainerLoader";
import { RenderProps } from "./";

interface Props extends RenderProps {
	openRegister(): void;
}

interface Inputs {
	email: string;
	password: string;
}

type InputError = string | null | Record<keyof Inputs, string>;

export function Login({ open, setOpen, openRegister }: Props) {
	const { login, loggedIn } = useAuth();
	const { mountError } = useAuthModals();

	const wrapper = useClickOutside<HTMLDivElement>(() => open && setOpen(false));

	const [status, setStatus] = useState<ModalStatus>(null);
	const [cached, setCached] = useLocalStorage<Inputs>("login");
	const { inputs, onChange } = useInputs<Inputs>({
		email: cached.email,
		password: "",
	});
	const [errors, setErrors] = useState<InputError>(null);

	const firstInput = useRef<HTMLInputElement>(null);
	const secondInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// mountError should only ever change once
		// But this useEffect is required, as the first render mountError will be null
		setErrors(mountError);
	}, [mountError]);

	useEffect(() => {
		if (!open) return;
		if (cached.email) {
			secondInput.current?.focus();
		} else {
			firstInput.current?.focus();
		}
	}, [open, cached.email]);

	useEffect(() => {
		if (loggedIn) {
			setTimeout(() => {
				setErrors(null);
			}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
		}
	}, [loggedIn]);

	function oAuthSubmit() {
		setStatus("loading");
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loggedIn) return;

		setStatus("loading");
		setErrors(null);

		const { error, ok } = await login({
			email: inputs.email,
			password: inputs.password,
		});

		if (ok) {
			setCached({ email: inputs.email, password: "" });
			setErrors(null);
			setStatus("success");

			setTimeout(() => {
				setOpen(false);
				setStatus("done");
			}, theme.durations.modalsAfterResponse);
		} else {
			if (error) setErrors(error as InputError);
			setStatus("error");
		}

		setTimeout(() => {
			setStatus(null);
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}

	function getInputError(input: keyof Inputs) {
		if (!errors || typeof errors !== "object") {
			return null;
		}
		return errors[input];
	}

	return (
		<ModalStyles.Wrapper className={classnames({ open })} ref={wrapper}>
			<ModalStyles.Main onSubmit={submit}>
				<ContainerLoader loading={status === "loading"} />
				<ModalStyles.Close onClick={() => setOpen(false)} />
				<ModalStyles.Header className="mb-4">Login</ModalStyles.Header>
				<Styles.P className="mb-10">
					{"Not a member? "}
					<Styles.A onClick={openRegister}>Register</Styles.A>
				</Styles.P>
				{typeof errors === "string" && (
					<Styles.FormError className="mb-2">{errors}</Styles.FormError>
				)}
				<Styles.Col className="mb-12">
					<Input
						error={getInputError("email")}
						containerClass="mb-2"
						forwardRef={firstInput}
						value={inputs.email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "email")}
						type="text"
						title="Email"
						label="Email"
						placeholder="john.smith@gmail.com"
					/>
					<Input
						error={getInputError("password")}
						forwardRef={secondInput}
						value={inputs.password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "password")}
						type="password"
						title="Password"
						label="Password"
						placeholder="••••••••••"
					/>
				</Styles.Col>
				<StatusButton className="w-full" type="submit" status={status}>
					Login
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin onClick={oAuthSubmit} />
			</ModalStyles.Main>
		</ModalStyles.Wrapper>
	);
}
