import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import * as ModalStyles from "./_styles";
import { StatusButton, Input, ContainerLoader } from "../../misc";
import { theme } from "../../../styles/theme";
import * as Styles from "../../styled-components";
import { useInputs, useClickOutside } from "../../hooks";
import { UserContext } from "../../contexts";
import classNames from "classnames";
import { IStatus } from "../../../types/modals";
import { RenderProps } from "./";
import { useContext } from "react";

interface Props extends RenderProps {
	openLogin(): void;
}

interface Inputs {
	email: string;
	password: string;
	passwordConfirm: string;
}

type InputError = string | null | Record<keyof Inputs, string>;

export function Register({ open, setOpen, openLogin }: Props) {
	const { register, loggedIn } = useContext(UserContext);

	const wrapper = useClickOutside<HTMLDivElement>(() => open && setOpen(false));

	const [status, setStatus] = useState<IStatus>(null);
	const { inputs, onChange, empty } = useInputs<Inputs>({
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [errors, setErrors] = useState<InputError>(null);

	const firstInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (open && firstInput.current) {
			firstInput.current.focus();
		}
	}, [open]);

	useEffect(() => {
		setTimeout(() => {
			empty();
			setErrors(null);
		}, theme.durations.modalsAfterResponse + theme.durations.modalsFade);
	}, [loggedIn, empty]);

	function OAuthSubmit() {
		setStatus("loading");
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loggedIn) return;

		setStatus("loading");
		setErrors(null);

		const { ok, error } = await register({
			email: inputs.email,
			password: inputs.password,
			passwordConfirm: inputs.passwordConfirm,
		});

		if (ok) {
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
			if (ok) empty();
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
				<Styles.H6 className="mb-6 text-center">Register</Styles.H6>
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
						containerClass="mb-2"
						value={inputs.password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, "password")}
						type="password"
						title="Password"
						label="Password"
						placeholder="••••••••••"
					/>
					<Input
						error={getInputError("passwordConfirm")}
						value={inputs.passwordConfirm}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							onChange(e, "passwordConfirm")
						}
						type="password"
						title="Password Confirmation"
						label="Password Confirmation"
						placeholder="••••••••••"
					/>
				</Styles.Col>
				<StatusButton className="w-full block" type="submit" status={status}>
					Register
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin className="block" onClick={OAuthSubmit} />
				<Styles.P className="mt-6 text-center">
					{"Already a member? "}
					<Styles.A onClick={openLogin}>Login</Styles.A>
				</Styles.P>
			</ModalStyles.Main>
		</ModalStyles.Wrapper>
	);
}
