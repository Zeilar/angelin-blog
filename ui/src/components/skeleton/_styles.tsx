import { css } from "styled-components";

export const skeleton = css`
	color: transparent !important;
	user-select: none;
	animation: pulse 1s infinite alternate;
	max-width: 100%;
	${(props: any) => css`
		${props.size && `font-size: ${props.size}rem`};
		width: ${props.width ? `${props.width}rem` : "100%"};
		@keyframes pulse {
			0% {
				background-color: ${props.theme.color.rgb("primary", 2)};
			}
			100% {
				background-color: ${props.theme.color.rgb("primary", 3)};
			}
		}
	`}
`;
