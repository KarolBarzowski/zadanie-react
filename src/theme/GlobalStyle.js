import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #F0F7FF;
    font-family: "Poppins", sans-serif;
  }
`;

export default GlobalStyle;
