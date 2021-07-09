import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

export const mediaQuery = (size: number) => `@media(max-width: ${size}px)`;
export const phone = mediaQuery(theme.breakpoints.phone);
export const tablet = mediaQuery(theme.breakpoints.tablet);

interface Flexbox {
	justify?: string;
	align?: string;
	block?: boolean;
	direction?: "row" | "column";
}

interface CssGrid {}

export const flexbox = css(
	({ justify, align, block, direction }: Flexbox) =>
		css`
			display: flex;
			justify-content: ${justify};
			align-items: ${align};
			width: ${block ? "100%" : null};
			flex-direction: ${direction};
		`
);

export const grid = css(
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

export const Container = styled.div`
	flex-direction: column;
	${flexbox}
	width: 1200px;
	margin-left: auto;
	margin-right: auto;
	${tablet} {
		width: calc(100% - 2rem);
	}
`;
