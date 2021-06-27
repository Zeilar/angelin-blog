import { css } from "styled-components";
import { theme } from "./theme";

export const editor = css`
	.editing {
		.ProseMirror,
		.tiptap {
			background-color: rgb(${theme.color.secondary});
			outline: 0;
			padding: 1rem;
			border: 1px solid rgb(${theme.color.primary});
			box-shadow: ${theme.shadow.elevate};
		}
	}

	.ProseMirror,
	.tiptap {
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
			background-color: rgba(#616161, 0.1);
			color: #616161;
		}

		pre {
			background-color: rgba(0, 0, 0, 0.35);
			color: #fff;
			padding: 0.75rem 1rem;
			border-radius: 0.5rem;

			code {
				color: inherit;
				padding: 0;
				background: none;
				font-size: 0.8rem;
			}
		}

		img {
			max-width: 100%;
			height: auto;
		}

		blockquote {
			padding-left: 1rem;
			border-left: 2px solid rgba(#0d0d0d, 0.1);
		}

		hr {
			border: none;
			border-top: 2px solid rgba(#0d0d0d, 0.1);
			margin: 2rem 0;
		}
	}
`;
