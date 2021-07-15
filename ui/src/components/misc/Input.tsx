import { RefObject } from "react";
import styled from "styled-components";
import * as Styles from "../styled-components";
import classnames from "classnames";
import { useState } from "react";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errors?: string[];
	value: string;
	containerClass?: string;
	forwardRef?: RefObject<HTMLInputElement>;
	[key: string]: any;
}

export function Input(props: Props) {
	const [stayFocused, setStayFocused] = useState(false);
	const hasErrors = props.errors && props.errors.length > 0;

	function blurHandler(e: any) {
		setStayFocused(e.target.value.length > 0);
	}

	return (
		<Styles.Col
			className={classnames(props.containerClass, "mt-5 relative")}
			align="flex-start"
		>
			{hasErrors && (
				<Errors>
					{props.errors?.map((error: string, i: number) => (
						<Styles.FormError key={i}>{error}</Styles.FormError>
					))}
				</Errors>
			)}
			{props.label && <label className="mb-2 cursor-text">{props.label}</label>}
			<Styles.Input
				className={classnames(
					{
						error: hasErrors,
						label: Boolean(props.label),
						active: stayFocused,
					},
					"w-full"
				)}
				onBlur={blurHandler}
				ref={props.forwardRef}
				{...props}
			/>
		</Styles.Col>
	);
}

const Errors = styled(Styles.Grid)`
	justify-items: flex-start;
	margin-bottom: 1rem;
	grid-gap: 0.25rem;
`;
