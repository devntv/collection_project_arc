import { colors, spacing } from "./components";

const theme = {
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    xl: 1280,
  },
  spacing,
  colors,
  fontFamily:
    '"Inter Var", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  text: {
    h1: {
      fontFamily: "body",
      fontSize: "48px",
      fontWeight: "black",
      lineHeight: "1.15",
      letterSpacing: "-0.8px",
      color: "heading",
    },
    h2: {
      fontFamily: "body",
      fontSize: "40px",
      fontWeight: "extraBold",
      lineHeight: "1.25",
      letterSpacing: "-0.3px",
      color: "heading",
    },
    h4: {
      fontFamily: "body",
      fontSize: "20px",
      fontWeight: "extraBold",
      lineHeight: "1",
      letterSpacing: "-0.2px",
      color: "heading",
    },
    subhead: {
      fontFamily: "body",
      fontSize: "20px",
      fontWeight: "normal",
      lineHeight: "1.4",
      letterSpacing: "-0.2px",
    },
    tagline: {
      fontFamily: "body",
      fontSize: "14px",
      fontWeight: "semiBold",
      lineHeight: "1.4",
      letterSpacing: "0px",
    },
    h4: {
      fontFamily: "body",
      fontSize: 4,
      fontWeight: "extraBold",
      lineHeight: 3,
      letterSpacing: 2,
      color: "heading",
    },
    body: {
      fontFamily: "body",
      fontSize: [2, 3],
      fontWeight: "regular",
      lineHeight: 3,
      letterSpacing: 2,
      marginBottom: 2,
    },
    small: {
      fontFamily: "body",
      fontSize: 2,
      fontWeight: "regular",
      lineHeight: 3,
      letterSpacing: 2,
      marginBottom: 2,
    },
  },
  buttons: {
    secondary: {
      display: "inline-flex",
      alignItems: "center",
      border: (theme) => `1px solid ${theme.colors.grey50}`,
      borderRadius: "3px",
      height: "38px",
      py: 1,
      px: 2,
      outline: "none",
      color: "white",
      fontWeight: "medium",
      flex: ["0 0 100%", "0 1 auto", "0 1 auto"],
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      textDecoration: "none",
      "&:hover": {
        bg: "white",
        color: "grey70",
      },
      "&:focus": {
        bg: "teal50",
        color: "grey70",
      },
      "&:disabled": {
        bg: "teal60",
        cursor: "not-allowed",
      },
    },
  },
};

export default theme;
