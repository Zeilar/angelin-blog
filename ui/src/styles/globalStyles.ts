import { createGlobalStyle } from "styled-components";
import "./fonts.css";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ::selection {
        color: rgb(0, 225, 225);
    }

    html,
    primary,
    #root {
        font-family: Open Sans;
        color: rgb(${theme.color.text});
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
`;
