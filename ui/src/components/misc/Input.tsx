import { RefObject } from "react";
import styled from "styled-components";
import { Input as StyledInput, FormError, Col, Grid } from "../styled-components";
import classnames from "classnames";

interface Props {
	label?: string;
	errors?: string[];
	value: string;
	containerClass?: string;
	forwardRef?: RefObject<HTMLInputElement>;
	[key: string]: any;
}

export function Input(props: Props) {
	const hasErrors = props.errors && props.errors.length > 0;
	const labelId = `input-${Math.ceil(Math.random() * 100)}`;

	return (
		<Col align="flex-start" className={classnames(props.containerClass, "mt-5")}>
			{hasErrors && (
				<Errors>
					{props.errors?.map((error: string, i: number) => (
						<FormError key={i}>{error}</FormError>
					))}
				</Errors>
			)}
			{props.label && (
				<Label className="mb-2" htmlFor={labelId}>
					{props.label}
				</Label>
			)}
			<InputField
				className={classnames({ error: hasErrors, label: Boolean(props.label) })}
				id={labelId}
				ref={props.forwardRef}
				{...props}
			/>
		</Col>
	);
}

const InputField = styled(StyledInput)`
	width: 100%;
	&.label {
		border-top-left-radius: 0;
	}
`;

const Label = styled.label`
	display: inline;
	cursor: text;
`;

const Errors = styled(Grid)`
	justify-items: flex-start;
	margin-bottom: 1rem;
	grid-gap: 0.25rem;
`;
