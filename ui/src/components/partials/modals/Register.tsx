import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import * as ModalStyles from "./_styles";
import { StatusButton, Input } from "../../misc";
import { theme } from "../../../styles/theme";
import * as Styles from "../../styled-components";
import { useInputs, useClickOutside } from "../../hooks";
import { useAuth } from "../../contexts";
import classNames from "classnames";
import { ModalStatus } from "../../../types/modals";
import ContainerLoader from "../../misc/ContainerLoader";
import { RenderProps } from "./";

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
	const { register, loggedIn } = useAuth();

	const wrapper = useClickOutside<HTMLDivElement>(() => open && setOpen(false));

	const [status, setStatus] = useState<ModalStatus>(null);
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
	}, [loggedIn]);

	function oAuthSubmit() {
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
				<ModalStyles.Header className="mb-4">Register</ModalStyles.Header>
				<Styles.P className="mb-10">
					{"Already a member? "}
					<Styles.A onClick={openLogin}>Login</Styles.A>
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
				<StatusButton className="w-full" type="submit" status={status}>
					Register
				</StatusButton>
				<ModalStyles.LoginDivider />
				<ModalStyles.GitHubLogin onClick={oAuthSubmit} />
			</ModalStyles.Main>
		</ModalStyles.Wrapper>
	);
}
