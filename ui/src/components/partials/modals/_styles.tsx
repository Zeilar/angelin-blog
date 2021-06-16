import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Col } from "../../styled-components/layout";

export const Background = styled.div`
	position: fixed;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	transition: 0.25s;
	pointer-events: none;
	&.active {
		pointer-events: all;
		background-color: rgba(0, 0, 0, 0.35);
	}
`;

export const Wrapper = styled(Col)`
	position: absolute;
	transform: translateX(-50%) scale(0.5);
	left: 50%;
	top: 30%;
	min-width: 400px;
	pointer-events: none;
	opacity: 0;
	transition: 0.25s;
	padding: 30px;
	border-radius: ${theme.borderRadius}px;
	background-color: rgb(${theme.color.primary});
	box-shadow: ${theme.shadow.elevate};
	&.active {
		pointer-events: all;
		opacity: 1;
		transform: translateX(-50%) scale(1);
	}
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
	border-radius: ${theme.borderRadius}px;
	&:hover {
		background-color: rgb(${theme.color.secondary});
	}
	&:focus {
		outline: 0;
	}
`;
