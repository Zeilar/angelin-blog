import styled, { css } from "styled-components";

export const header = css`
	font-weight: 700;
	font-family: Heebo;
	color: white;
`;

export const text = css`
	font-size: 1rem;
	font-family: Open Sans;
	color: rgb(225, 225, 225);
`;

export const H1 = styled.h1`
	${header}
	font-size: 4rem;
`;

export const H2 = styled.h2`
	${header}
	font-size: 3rem;
`;

export const H3 = styled.h3`
	${header}
	font-size: 2.5rem;
`;

export const H4 = styled.h4`
	${header}
	font-size: 2rem;
`;

export const H5 = styled.h5`
	${header}
	font-size: 1.5rem;
`;

export const H6 = styled.h6`
	${header}
	font-size: 1.25rem;
`;

export const P = styled.p`
	${text}
`;
