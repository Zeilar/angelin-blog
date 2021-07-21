import { css } from "styled-components";
import { Color, Shadow, theme } from "./theme";

export const editor = css`
	.editing {
		border-radius: ${theme.borderRadius}px;

		.ProseMirror,
		.tiptap {
			outline: 0;
			padding: 1rem;
			box-shadow: ${Shadow.pick("elevateUnder")};
			min-height: 400px;
			${props => css`
				background-color: hsl(${props.theme.color.get("secondary")});
			`}
		}

		${props => css`
			&.error {
				border: 1px solid hsl(${props.theme.color.get("error")});
			}
		`}
	}

	.ProseMirror,
	.tiptap {
		border-radius: ${theme.borderRadius}px;

		> * + * {
			margin-top: 0.75em;
		}

		ul,
		ol {
			padding: 0 1rem;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			line-height: 1.1;
			font-weight: revert;
			font-size: revert;
		}

		code {
			background-color: rgba(0, 0, 0, 0.25);
			padding: 0.25rem;
			border-radius: ${theme.borderRadius}px;
		}

		pre {
			background-color: rgba(0, 0, 0, 0.35);
			padding: 0.75rem 1rem;
			border-radius: ${theme.borderRadius}px;
			${props => css`
				color: hsl(${props.theme.color.get("text")});
			`}

			code {
				padding: 0;
				background: none;
			}
		}

		img {
			max-width: 100%;
			height: auto;
		}

		blockquote {
			padding: 0.25rem 0 0.25rem 1rem;
			background-color: rgba(0, 0, 0, 0.1);
			${props => css`
				border-left: 2px solid hsl(${props.theme.color.get("brand")});
			`}
		}

		hr {
			border: none;
			border-top: 2px solid rgba(13, 13, 13, 1);
			margin: 2rem 0;
		}
	}
`;
