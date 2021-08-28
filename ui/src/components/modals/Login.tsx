import { FormEvent, useEffect, useRef, useState } from "react";
import * as ModalStyles from "./_styles";
import { StatusButton, Input, ContainerLoader } from "../form";
import { theme } from "../../styles/theme";
import * as Styles from "../sc";
import { useInputs, useClickOutside, useLocalStorage } from "../hooks";
import { useAuthModalContext, useUserContext } from "../contexts";
import classNames from "classnames";
import { IStatus } from "../../types/modals";
import { RenderProps } from ".";

interface Props extends RenderProps {
	openRegister(): void;
}

interface Inputs {
	email: string;
	password: string;
}

type InputError = string | null | Record<keyof Inputs, string>;

export function Login({ open, setOpen, openRegister }: Props) {
	const { login, loggedIn } = useUserContext();
	const { mountError } = useAuthModalContext();

	const wrapper = useClickOutside<HTMLDivElement>(() => open && setOpen(false));

	const [status, setStatus] = useState<IStatus>(null);
	const [cached, setCached] = useLocalStorage<{ email: string }>("login");
	const { inputs, onChange, update } = useInputs<Inputs>({
		email: cached?.email ?? "",
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
		if (cached?.email) {
			secondInput.current?.focus();
		} else {
			firstInput.current?.focus();
		}
	}, [open, cached?.email]);

	useEffect(() => {
		if (loggedIn) {
			setTimeout(() => {
				setErrors(null);
			}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
		}
	}, [loggedIn]);

	function OAuthSubmit() {
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
			setCached({ email: inputs.email });
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
		<ModalStyles.Wrapper className={classNames({ open })} ref={wrapper}>
			<ModalStyles.Main onSubmit={submit}>
				<ContainerLoader loading={status === "loading"} />
				<ModalStyles.Close onClick={() => setOpen(false)} />
				<Styles.H4 className="mb-2 text-center">Angelin Blog</Styles.H4>
				<Styles.H6 className="mb-6 text-center">Login</Styles.H6>
				{typeof errors === "string" && (
					<Styles.FormError className="mb-2">{errors}</Styles.FormError>
				)}
				<Styles.Col className="mb-12">
					<Input
						error={getInputError("email")}
						containerClass="mb-2"
						forwardRef={firstInput}
						value={inputs.email}
						onChange={onChange}
						type="text"
						name="email"
						title="Email"
						label="Email"
						placeholder="john.smith@gmail.com"
					/>
					<Input
						error={getInputError("password")}
						forwardRef={secondInput}
						value={inputs.password}
						onChange={onChange}
						type="password"
						name="password"
						title="Password"
						label="Password"
						placeholder="••••••••••"
					/>
				</Styles.Col>
				<StatusButton className="w-full block" type="submit" status={status}>
					Login
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin className="block" onClick={OAuthSubmit} />
				<Styles.P className="mt-6 text-center">
					{"Not a member? "}
					<Styles.A onClick={openRegister}>Register</Styles.A>
				</Styles.P>
			</ModalStyles.Main>
		</ModalStyles.Wrapper>
	);
}
