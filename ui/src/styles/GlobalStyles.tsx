import "./fonts.css";
import { createGlobalStyle, css } from "styled-components";
import { editor } from "./tiptap";

export const GlobalStyles = createGlobalStyle`
    ${editor}

    ::-webkit-scrollbar {
        width: 1rem;
    }

    ${props => css`
		::-webkit-scrollbar-thumb {
			background-color: ${props.theme.color.rgb("brand")};
			background-clip: padding-box;
			border: 4px solid transparent;
			border-radius: 100px;
		}

		::placeholder {
			color: ${props.theme.color.rgb("textMuted")};
		}

		::selection {
			background-color: ${props.theme.color.rgb("brand")};
			color: ${props.theme.color.rgb("text")};
		}

		body {
			overflow: overlay;
		}

		body,
		#root {
			font-family: Open Sans;
			color: ${props.theme.color.rgb("text")};
			background-color: ${props.theme.color.rgb("body")};
			min-height: 100vh;
		}

		a {
			color: ${props.theme.color.rgb("link")};
			text-decoration: none;
		}
	`}

    a,
    button {
        cursor: pointer;
    }

    input,
    textarea {
        font: inherit;
    }

    img,
    svg {
        max-width: 100%;
        height: auto;
    }

    img,
    svg,
    ::placeholder {
        user-select: none;
    }

    code {
        font-family: JetBrains Mono, monospace;
    }

`;
