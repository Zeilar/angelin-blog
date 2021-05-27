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
        font-family: Roboto;
        color: rgb(225, 225, 225);
        background-color: rgb(30, 30, 30);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 700;
        font-family: Heebo;
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
