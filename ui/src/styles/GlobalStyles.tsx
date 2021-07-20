import "./fonts.css";
import { createGlobalStyle } from "styled-components";
import { Color } from "./theme";
import { editor } from "./tiptap";

export const GlobalStyles = createGlobalStyle`
    ${editor}

    ::selection {
        color: hsl(${Color.pick("brand").get()});
        background-color: hsl(${Color.pick("secondary").get()});
    }

    body,
    #root {
        font-family: Open Sans;
        color: hsl(${Color.pick("text").get()});
        background-color: hsl(${Color.pick("body").get()});
        min-height: 100vh;
    }

    a {
        color: hsl(${Color.pick("link").get()});
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
        color: hsl(${Color.pick("textMuted").get()});
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
