import React from "react";
import styled, { ThemeProvider } from "styled-components";

// import GlobalBanner from './GlobalBanner';
import theme from "../themes";
import GlobalStyles from "../themes/globalStyle";
import Footer from "./Footer";
import Header from "./Header";

const Main = styled.main`
  background: ${(props) => props.bg};
  max-width: 1400px;
  margin: 0 auto;
`;

const Layout = ({ bg, seo, children, landing }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {/* <GlobalBanner /> */}
    {!landing && <Header />}
    <Main {...{ bg }}>{children}</Main>
    {!landing && <Footer />}
  </ThemeProvider>
);

export default Layout;
