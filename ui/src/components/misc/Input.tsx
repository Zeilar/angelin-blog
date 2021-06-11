import styled from "styled-components";
import { Input as StyledInput } from "../styled-components/interactive";
import { Col } from "../styled-components/layout";

interface Props {
	label?: string;
	errors?: string[];
}

export default function Input({ label, errors }: Props) {
	return (
		<Col>
			{errors?.map(error => (
				<Error>{error}</Error>
			))}
			{label && <Label>{label}</Label>}
			<StyledInput error={errors?.length ? true : false} />
		</Col>
	);
}

const Label = styled.label``;

const Error = styled.p``;
