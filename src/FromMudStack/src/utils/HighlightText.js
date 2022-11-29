import { css } from "styled-components";
import { map } from "styled-components-breakpoint";

export const BodyStyles = css`
  ${map(
    {
      mobile: "14px",
      tablet: "16px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  font-weight: 400;
  line-height: 1.55;
`;

export const H1Styles = css`
  ${map(
    {
      mobile: "26px",
      tablet: "32px",
      desktop: "36px",
      xl: "42px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.5px;
`;

export const H2Styles = css`
  ${map(
    {
      mobile: "20px",
      tablet: "24px",
      desktop: "28px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.3px;
`;

export const H3Styles = css`
  ${map(
    {
      mobile: "18px",
      tablet: "22px",
      desktop: "24px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.2px;
`;

export const H4Styles = css`
  ${map(
    {
      mobile: "16px",
      tablet: "18px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  font-weight: 800;
  line-height: 1.25;
`;

export const SmallTextStyles = css`
  ${map(
    {
      mobile: "12px",
      tablet: "14px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  font-weight: 400;
  line-height: 1.55;
`;
