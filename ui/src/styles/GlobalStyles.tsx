import "./fonts.css";
import { createGlobalStyle } from "styled-components";
import { color, theme } from "./theme";
import { editor } from "./tiptap";

export const GlobalStyles = createGlobalStyle`
    ${editor}

    ::selection {
        color: hsl(${theme.color.brand});
        background-color: rgba(0, 0, 0, 0.15);
    }

    html,
    #root {
        font-family: Open Sans;
        color: rgb(${color.pick("text").get()});
        background-color: rgb(${theme.color.body});
        min-height: 100vh;
    }

    a {
        color: rgb(${theme.color.link});
        text-decoration: none;
    }

    a,
    button {
        cursor: pointer;
    }

    input,
    textarea {
        font: inherit;
    }

    ::placeholder {
        color: rgb(${theme.color.textMuted});
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
