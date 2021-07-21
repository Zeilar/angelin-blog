import styled, { css } from "styled-components";

export const header = css`
	font-weight: 700;
	font-family: Heebo;
	color: white;
	letter-spacing: 1px;
`;

export const text = css`
	font-size: 1rem;
	font-family: Open Sans;
	${props => css`
		color: hsl(${props.theme.color.get("text")});
		&.muted {
			color: hsl(${props.theme.color.get("textMuted")});
		}
	`}
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
	font-weight: 600;
	font-size: 1.5rem;
`;

export const H6 = styled.h6`
	${header}
	font-weight: 600;
	font-size: 1.25rem;
`;

export const P = styled.p`
	${text}
`;

export const Span = styled.span`
	${text}
`;

export const A = styled.a`
	${text}
	cursor: pointer;
	display: inline-flex;
	font-weight: 600;
	${props => css`
		color: hsl(${props.theme.color.get("brand")});
		&:hover {
			color: hsl(${props.theme.color.pick("brand").darken().get()});
		}
	`}
`;

export const Label = styled.label`
	${text}
	font-weight: 600;
	cursor: text;
`;
