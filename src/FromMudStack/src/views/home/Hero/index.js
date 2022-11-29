import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { map } from "styled-components-breakpoint";
import { mb, mr, pb, pt, px } from "styled-components-spacing";
import { colors, Heading, spacing, Text } from "themes/components";

import Button from "components/Button";
import Sparkles from "components/Sparkles";
import HighlightText from "utils/HighlightText";
import LowCard from "./Hero_LowCard";
import MiddleCard from "./Hero_MiddleCard";
import TopCard from "./Hero_TopCard";
import Circles from "./icons/Circles";

const Container = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  ${map(
    { mobile: "column", tablet: "row" },
    (direction) => `flex-direction: ${direction};`
  )}
  ${pb({ mobile: 4, tablet: 8, desktop: 12 })};
  ${pt({ mobile: 4, tablet: 5, desktop: 8 })};
  ${px(2)};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${map(
    {
      mobile: "unset",
      tablet: "50%",
      desktop: "40%",
    },
    (size) => `min-width: ${size};`
  )}
  ${map(
    {
      mobile: "unset",
      tablet: "50%",
      desktop: "550px",
    },
    (size) => `max-width: ${size};`
  )}
  ${map(
    {
      mobile: `0px 0px ${spacing[3]}`,
      tablet: `0px ${spacing[8]} 0px 0px`,
      desktop: `0px ${spacing[4]} 0px 0px`,
    },
    (margin) => `margin: ${margin};`
  )}
`;

const HeroContainer = styled.div`
  display: flex;
  flex-grow: 1;
  ${map(
    {
      mobile: "100%",
      tablet: "auto",
      desktop: "auto",
    },
    (size) => `width: ${size};`
  )}
  ${map(
    {
      mobile: "100%",
      tablet: "512px",
      desktop: "768px",
    },
    (size) => `max-width: ${size};`
  )}
`;

const CTA = styled.div`
  display: flex;
  & > a:first-child {
    ${mr(0)}
  }
`;

const HeroInnerContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${mb(3)};
  position: relative;
`;

const CardWrapper = styled.div`
  position: relative;
`;

const CardShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 4px;
  left: 4px;
  border-radius: 4px;
`;

const Hero = ({}) => {
  return (
    <Container>
      <TextContainer>
        <Text
          variant="tagline"
          style={{
            textTransform: "uppercase",
            marginBottom: "16px",
            color: colors.grey30,
          }}
        >
          the artist’s collaboration platform
        </Text>
        <Heading
          as="h1"
          variant="h1"
          style={{ marginBottom: "16px", color: colors.heading }}
        >
          <Sparkles enabled>
            <HighlightText
              direction="bottom"
              stopOne={`${colors.pink30}`}
              stopTwo={`${colors.purple40}`}
            >
              Level up
            </HighlightText>
          </Sparkles>{" "}
          your game art & your art game.
        </Heading>
        <Text
          variant="subhead"
          style={{ marginBottom: "24px", color: colors.grey10 }}
        >
          mudstack is the only asset management and collaboration platform
          custom built for game studios and digital artists.
        </Text>
        <CTA>
          <Button as={Link} to="/desktop">
            Download desktop beta &rarr;
          </Button>
          <Button
            href="https://calendly.com/mudstack-customers/get-a-demo"
            secondary
            target="_blank"
            rel="nofollow"
            as="a"
          >
            Get a demo
          </Button>
          {/* <Button href="https://app.mudstack.com/explore" rel="nofollow" as="a">
            Try mudstack free &rarr;
          </Button> */}
        </CTA>
      </TextContainer>
      <HeroContainer>
        <HeroInnerContainer>
          <CardContainer style={{ marginLeft: "58px" }}>
            <Circles
              color="#80DBFF"
              style={{
                position: "absolute",
                top: "-70px",
                right: "-75px",
                zIndex: "-1",
              }}
            />
            <CardWrapper
              style={{
                width: "470px",
                height: "112px",
              }}
            >
              <CardShadow
                style={{
                  width: "470px",
                  height: "112px",
                  background:
                    "linear-gradient(68.18deg, #80DBFF 0.54%, #52BFFF 99.37%)",
                }}
              />
              <LowCard style={{ position: "absolute", borderRadius: "4px" }} />
            </CardWrapper>
          </CardContainer>
          <CardContainer>
            <Circles
              color="#54D472"
              style={{
                position: "absolute",
                top: "35px",
                left: "-70px",
                zIndex: "-1",
              }}
            />
            <CardWrapper
              style={{
                width: "479px",
                height: "112px",
              }}
            >
              <CardShadow
                style={{
                  width: "479px",
                  height: "112px",
                  background:
                    "linear-gradient(68.18deg, #54D472 0.54%, #52BFFF 99.37%)",
                }}
              />
              <MiddleCard
                style={{ position: "absolute", borderRadius: "4px" }}
              />
            </CardWrapper>
          </CardContainer>
          <CardContainer style={{ marginLeft: "111px" }}>
            <Circles
              color="#C292FF"
              style={{
                position: "absolute",
                top: "-65px",
                left: "-65px",
                zIndex: "-1",
              }}
            />
            <CardWrapper
              style={{
                width: "255px",
                height: "76px",
              }}
            >
              <CardShadow
                style={{
                  width: "255px",
                  height: "76px",
                  background:
                    "linear-gradient(68.18deg, #FC92F9 0.54%, #A863FF 99.37%)",
                }}
              />
              <TopCard style={{ position: "absolute", borderRadius: "4px" }} />
            </CardWrapper>
          </CardContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </Container>
  );
};

export default Hero;
