import styled, { css } from "styled-components";

interface Flexbox {
	justify?: string;
	align?: string;
	block?: boolean;
}

interface CssGrid {}

const flexbox = css(
	({ justify, align, block }: Flexbox) =>
		css`
			display: flex;
			justify-content: ${justify};
			align-items: ${align};
			width: ${block ? "100%" : null};
		`
);

const grid = css(
	(props: CssGrid) => css`
		display: grid;
	`
);

export const Row = styled.div`
	${flexbox}
	flex-direction: row;
`;

export const Col = styled.div`
	${flexbox}
	flex-direction: column;
`;

export const Grid = styled.div`
	${grid}
`;
