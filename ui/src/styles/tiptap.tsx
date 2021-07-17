import { css } from "styled-components";
import { Color, theme } from "./theme";

export const editor = css`
	.editing {
		border-radius: ${theme.borderRadius}px;

		.ProseMirror,
		.tiptap {
			background-color: hsl(${Color.pick("secondary").get()});
			outline: 0;
			padding: 1rem;
			box-shadow: ${theme.shadow.elevateUnder};
		}
		&.error {
			border: 1px solid hsl(${Color.pick("error").get()});
		}
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
			color: hsl(${Color.pick("text").get()});
			padding: 0.75rem 1rem;
			border-radius: ${theme.borderRadius}px;

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
			border-left: 2px solid hsl(${Color.pick("brand").get()});
		}

		hr {
			border: none;
			border-top: 2px solid rgba(13, 13, 13, 1);
			margin: 2rem 0;
		}
	}
`;
