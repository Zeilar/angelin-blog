import { RefObject } from "react";
import * as Styles from "../styled-components";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string | null;
	value: string;
	containerClass?: string;
	forwardRef?: RefObject<HTMLInputElement>;
	[key: string]: any;
}

export function Input(props: Props) {
	return (
		<Styles.Col
			className={classNames(props.containerClass, "mt-5 relative")}
			align="flex-start"
		>
			{props.label && <Styles.Label className="mb-2">{props.label}</Styles.Label>}
			{props.error && <Styles.InputError message={props.error} className="mb-2" />}
			<Styles.Input
				{...props}
				ref={props.forwardRef}
				className={classNames(
					{ label: Boolean(props.label), error: Boolean(props.error) },
					"w-full",
					props.className
				)}
			/>
		</Styles.Col>
	);
}
