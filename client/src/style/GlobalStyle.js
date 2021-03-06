import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }


  html, body {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--text);
  }
  :root {
  --text: #000000;
  --highlight-text: #ffffff;
  --light-text: #121212;
  --lighter-text: #767676;
  --primary: #45BA66;
  --primary-dark: #5B734E;
  --primary-light: #69BF3B;
  --bg: #ffffff;
  --bg-linear: linear-gradient(107.56deg, #DEF9F6 0%, #F9EBDE 100%);
  --gray: #c4c4c4;
  --gray-light: #f2f2f2;
  --red: #ff0000;
}

`;

export default GlobalStyle;
