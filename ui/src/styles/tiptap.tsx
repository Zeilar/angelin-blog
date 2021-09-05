import { css } from "styled-components";

export const tiptap = css`
	.editing {
		.ProseMirror,
		.tiptap {
			outline: 0;
			padding: 1rem;
			min-height: 400px;
			overflow-y: auto;
			resize: vertical;
			${props => css`
				box-shadow: ${props.theme.shadow.pick("elevate")};
				background-color: ${props.theme.color.rgb("primary", 2)};
				border: 1px solid transparent;
			`}
		}

		${props => css`
			&.error {
				border-color: ${props.theme.color.rgb("error")};
			}
		`}
	}

	.ProseMirror,
	.tiptap {
		> * + * {
			margin-top: 0.75em;
		}

		ul,
		ol {
			padding: 0 1rem;
			margin-left: 1rem;
		}

		ol {
			list-style-type: decimal;
		}

		ul {
			list-style-type: disc;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-weight: revert;
			font-size: revert;
		}

		code {
			background-color: rgba(0, 0, 0, 0.25);
			padding: 0.25rem;
			${props => css`
				border-radius: ${props.theme.borderRadius}px;
			`}
		}

		pre {
			background-color: rgba(0, 0, 0, 0.35);
			padding: 0.75rem 1rem;
			${props => css`
				border-radius: ${props.theme.borderRadius}px;
				color: ${props.theme.color.rgb("text")};
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
				border-left: 2px solid ${props.theme.color.rgb("brand")};
			`}
		}

		hr {
			border: none;
			border-top: 2px solid rgba(13, 13, 13, 1);
			margin: 2rem 0;
		}
	}
`;
