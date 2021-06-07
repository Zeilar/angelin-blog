import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

export const Button = styled.button`
	user-select: none;
`;

export const Input = styled.input`
	background-color: rgb(${theme.color.bodyDark});
	outline: 0;
	border: 0;
	min-width: 3rem;
	color: inherit;
	font: inherit;
	transition: 0.1s;
	padding: 10px;
	&:focus {
		box-shadow: 0 0 0 1px rgb(${theme.color.brand});
	}
`;
