import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Button from "components/Button";
import styled from "styled-components";
import { map } from "styled-components-breakpoint";
import { ml, mt, pb, pt, px } from "styled-components-spacing";
import { colors, Heading, Text } from "themes/components";
import HighlightText from "utils/HighlightText";

const Container = styled.div`
  ${map(
    {
      tablet: "flex",
    },
    (flex) => `display: ${flex};`
  )}
  align-items: center;
  max-width: 1080px;
  margin: 0 auto;
  ${pt({ mobile: 2, tablet: 8, desktop: 12 })}
  ${pb({ mobile: 2, tablet: 4 })}
  ${px(2)}
  ${mt({ mobile: 2, tablet: 8, desktop: 12 })}
`;

const Content = styled.div`
  flex: 0 0 50%;
  ${ml({ tablet: 4 })};
  ${mt({ mobile: 4, tablet: 0 })};
  color: ${colors.grey5};
`;

const Desktop = () => {
  return (
    <Container>
      <StaticImage
        src="./images/desktop.png"
        alt="screenshot from desktop app"
        objectFit="contain"
      />
      <Content>
        <Heading variant="h2">
          <HighlightText stopOne={colors.pink30} stopTwo={colors.purple40}>
            Mudstack for Desktop
          </HighlightText>
        </Heading>
        <Text variant="subhead" style={{ marginTop: "16px" }}>
          Manage your local assets, versions and workflows with an artist-first
          tool. When it's time to collaborate, move seamlessly to mudstack's
          integrated cloud storage and empower your team with version control
          and review tools.
        </Text>
        <Button as={Link} secondary to="/desktop" style={{ marginTop: "16px" }}>
          Download desktop beta &rarr;
        </Button>
      </Content>
    </Container>
  );
};

export default Desktop;
