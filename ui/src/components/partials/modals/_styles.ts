import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";
import { Col } from "../../styled-components/layout";
import { H3 } from "../../styled-components/typography";

export const Background = styled.div`
	position: fixed;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	transition: 0.25s;
	pointer-events: none;
	${({ active }: { active: boolean }) =>
		active &&
		css`
			pointer-events: all;
			background-color: rgba(0, 0, 0, 0.65);
		`}
`;

export const Wrapper = styled(Col)`
	position: absolute;
	transform: translateX(-50%) scale(0.5);
	left: 50%;
	top: 30%;
	min-width: 25%;
	pointer-events: none;
	opacity: 0;
	transition: 0.25s;
	padding: 30px;
	background-color: rgb(${theme.color.bodyLight});
	${({ active }: { active: boolean }) =>
		active &&
		css`
			pointer-events: all;
			opacity: 1;
			transform: translateX(-50%) scale(1);
		`}
`;

export const Close = styled.button.attrs({ type: "button" })`
	display: flex;
	background: none;
	border: 0;
	width: 2rem;
	height: 2rem;
	position: absolute;
	right: 10px;
	top: 10px;
	cursor: pointer;
	color: inherit;
	transition: 0.05s;
	&:hover {
		background-color: rgb(${theme.color.border});
	}
`;

export const Title = styled(H3)`
	color: rgb(${theme.color.brand});
	margin-bottom: 50px;
	border-bottom: 3px solid rgb(${theme.color.brand});
	padding-bottom: 15px;
`;
