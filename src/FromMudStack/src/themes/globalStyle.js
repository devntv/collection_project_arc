import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Inter Var';
  src: local('Inter Var'), url('/fonts/Inter.var.woff2') format('woff2');
  font-weight: 1 999;
  font-display: swap;
}

* {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ${(props) => props.theme.fontFamily};
  box-sizing: border-box;
}

strong {
  font-weight: 600;
}

h1, h2, h4, h4 {
  font-family: ${(props) => props.theme.fontFamily};
  margin: 0;
}

p {
  font-family: ${(props) => props.theme.fontFamily};
  margin: 0;
}

body {
  font-family: ${(props) => props.theme.fontFamily};
  background: ${(props) => props.theme.colors.grey90};
  margin: 0;
  font-feature-settings: "ss01", "cv11";
}

pre {
  font-family: Consolas, "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
}

body::-webkit-scrollbar, 
pre::-webkit-scrollbar {
  width: 14px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track,
pre::-webkit-scrollbar-track {
  background: #121216;        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb,
pre::-webkit-scrollbar-thumb {
  background-color: #32343E;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 4px solid #121216;  /* creates padding around scroll thumb */
}
`;

export default GlobalStyles;
