import "./fonts.css";
import { createGlobalStyle, css } from "styled-components";
import { editor } from "./tiptap";

export const GlobalStyles = createGlobalStyle`
    ${editor}

    ${props => css`
		::placeholder {
			color: hsl(${props.theme.color.get("textMuted")});
		}

		::selection {
			color: hsl(${props.theme.color.get("link")});
		}

		body,
		#root {
			font-family: Open Sans;
			color: hsl(${props.theme.color.get("text")});
			background-color: hsl(${props.theme.color.get("body")});
			min-height: 100vh;
		}

		a {
			color: hsl(${props.theme.color.get("link")});
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
