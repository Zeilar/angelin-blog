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
        color: rgb(0, 200, 0);
    }

    html,
    body,
    #root {
        font-family: Open Sans;
        color: rgb(225, 225, 225);
        background-color: rgb(15, 15, 15);
        min-height: 100vh;
    }

    a {
        color: rgb(0, 127, 255);
        text-decoration: none;
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
