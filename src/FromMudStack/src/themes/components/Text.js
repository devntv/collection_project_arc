import React from "react";
import styled from "styled-components";
import { map } from "styled-components-breakpoint";

import { BodyStyles, SmallTextStyles } from "./typographyStyles";

const Bodytext = styled.p`
  ${BodyStyles};
`;

const Subhead = styled.p`
  ${map(
    {
      mobile: "16px",
      tablet: "18px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  line-height: 1.5;
  letter-spacing: -0.2px;
`;

const Tagline = styled.p`
  ${map(
    {
      mobile: "12px",
      tablet: "14px",
    },
    (fontSize) => `font-size: ${fontSize};`
  )};
  ${map(
    {
      mobile: "2.4px",
      tablet: "3px",
    },
    (ls) => `letter-spacing: ${ls};`
  )};
  font-weight: 500;
  line-height: 1.4;
  text-transform: uppercase;
`;

const SmallText = styled.p`
  ${SmallTextStyles};
`;

const Text = ({ variant, style, children, ...props }) => {
  let Component = Bodytext;
  switch (variant) {
    case "subhead":
      Component = Subhead;
      break;
    case "tagline":
      Component = Tagline;
      break;
    case "small":
      Component = SmallText;
      break;
  }
  return (
    <Component {...{ style }} {...props}>
      {children}
    </Component>
  );
};

export default Text;
