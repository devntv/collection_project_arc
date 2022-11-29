import React from "react";
import styled from "styled-components";

import { H1Styles, H2Styles, H3Styles, H4Styles } from "./typographyStyles";

const H1 = styled.h1`
  ${H1Styles};
`;

const H2 = styled.h2`
  ${H2Styles};
`;

const H3 = styled.h3`
  ${H3Styles};
`;

const H4 = styled.h4`
  ${H4Styles};
`;

const Heading = ({ className, variant, style, children, ...props }) => {
  let Component = H4;
  switch (variant) {
    case "h1":
      Component = H1;
      break;
    case "h2":
      Component = H2;
      break;
    case "h3":
      Component = H3;
      break;
  }
  return (
    <Component className={className} style={style} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
