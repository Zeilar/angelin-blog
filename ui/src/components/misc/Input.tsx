import { RefObject } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { Input as StyledInput, FormError, Col, Grid } from "../styled-components";
import classnames from "classnames";

interface Props<T> {
	label?: string;
	errors?: string[];
	value: string;
	containerClass?: string;
	forwardRef?: RefObject<T>;
	[key: string]: any;
}

export function Input<T>(props: Props<T>) {
	const hasErrors = props.errors && props.errors.length > 0;
	const labelId = `input-${Math.ceil(Math.random() * 100)}`;

	return (
		<Col align="flex-start" className={classnames(props.containerClass, "mt-5")}>
			{hasErrors && (
				<Errors>
					{props.errors?.map((error, i: number) => (
						<FormError key={i}>{error}</FormError>
					))}
				</Errors>
			)}
			{props.label && (
				<Label className="mb-2" htmlFor={labelId}>
					{props.label}
				</Label>
			)}
			<InputField error={hasErrors} id={labelId} {...props} />
		</Col>
	);
}

const InputField = styled(StyledInput)`
	width: 100%;
	${({ label }: any) =>
		label &&
		css`
			border-top-left-radius: 0;
		`}
`;

const Label = styled.label`
	display: inline;
	cursor: text;
`;

const Errors = styled(Grid)`
	justify-items: flex-start;
	margin-bottom: 15px;
	grid-gap: 5px;
`;
