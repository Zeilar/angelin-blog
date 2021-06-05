import styled, { css } from "styled-components";
import { Col } from "../../styled-components/layout";

export const Background = styled.div`
	${({ active }: { active: boolean }) =>
		active &&
		css`
			background-color: rgba(0, 0, 0, 0.65);
			position: fixed;
			overflow: hidden;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
		`}
`;

export const Wrapper = styled(Col)``;
