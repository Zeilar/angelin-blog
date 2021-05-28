import { createGlobalStyle } from "styled-components";
import "./fonts.css";

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
        color: rgb(123, 234, 123);
    }

    html,
    body {
        font-family: Open Sans;
        color: rgb(225, 225, 225);
        background-color: rgb(30, 30, 30);
    }

    a {
        color: rgb(0, 127, 255);
    }

    a,
    button {
        cursor: pointer;
    }

    img,
    svg {
        max-width: 100%;
        height: auto;
    }
`;
