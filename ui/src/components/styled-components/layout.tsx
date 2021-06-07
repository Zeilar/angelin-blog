import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

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

export const Container = styled.div`
	${flexbox}
`;

export const mediaQuery = (size: number) => `@media(max-width: ${size}px)`;
export const phone = mediaQuery(theme.breakpoints.phone);
export const tablet = mediaQuery(theme.breakpoints.tablet);
