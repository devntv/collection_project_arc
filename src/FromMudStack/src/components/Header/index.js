import React from "react";
import styled from "styled-components";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Header = () => {
  return (
    <Container>
      <Desktop />
      <Mobile />
    </Container>
  );
};

export default Header;
