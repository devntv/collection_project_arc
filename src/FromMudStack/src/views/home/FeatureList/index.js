import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import styled from "styled-components";
import { map } from "styled-components-breakpoint";
import { mb, my, px } from "styled-components-spacing";
import { colors, Heading, Text } from "themes/components";

import HighlightText from "utils/HighlightText";
import CloudIcon from "./icons/Cloud";
import CollaborateIcon from "./icons/Collaborate";
import InspectIcon from "./icons/Inspect";
import VersionIcon from "./icons/Version";
import SearchWebp from "./Search.webp";
import ViewerWebm from "./Viewer.js";

import AnimatedFiles from "./images/animated-files.svg";

import BottomLeft from "./images/Feature-BG-Bottom-Left.png";
import BottomRight from "./images/Feature-BG-Bottom-Right.png";
import TopLeft from "./images/Feature-BG-Top-Left.png";
import TopRight from "./images/Feature-BG-Top-Right.png";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  ${my({ mobile: 3, tablet: 0 })}
`;

const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${map(
    {
      tablet: "480px",
      desktop: "540px",
      xl: "650px",
    },
    (size) => `max-width: ${size};`
  )}
  ${px(2)};
  margin: 0 auto;
  text-align: center;
`;

const FeatureContainer = styled.div`
  display: flex;
  ${map(
    {
      mobile: "column",
      tablet: "row",
      desktop: "row",
    },
    (direction) => `flex-direction: ${direction};`
  )}
  width: 100%;
  ${px(2)};
  ${my({ mobile: 4, tablet: 5, desktop: 8, xl: 8 })}
`;

const HeadingContainer = styled.div`
  ${mb(2)};
  & > h3 {
    color: ${colors.grey5};
    margin: 0;
  }
`;

const IconContainer = styled.div`
  ${map(
    {
      mobile: "32px",
      tablet: "40px",
    },
    (size) => `width: ${size}; height: ${size};`
  )}
  background: ${`linear-gradient(to bottom right,${colors.pink30},${colors.purple40})`};
  ${map(
    {
      mobile: "4px",
      tablet: "8px",
    },
    (padding) => `padding: ${padding};`
  )}
  ${mb(1)};
  border-radius: 8px;
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  ${map(
    {
      mobile: "unset",
      tablet: "50%",
      desktop: "768px",
    },
    (size) => `max-width: ${size};`
  )}
  ${(props) =>
    map(
      {
        mobile: 1,
        tablet: props.reverse ? 2 : 1,
        desktop: props.reverse ? 2 : 1,
      },
      (order) => `order: ${order};`
    )}
  ${(props) =>
    map(
      {
        mobile: "0px 0px 32px",
        tablet: props.reverse ? "0px 0px 0px 64px" : "0px 64px 0px 0px",
        desktop: props.reverse ? "0px 0px 0px 88px" : "0px 88px 0px 0px",
      },
      (margin) => `margin: ${margin};`
    )}
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-flex: 1;
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
      mobile: "320px",
      tablet: "512px",
      desktop: "640px",
    },
    (size) => `max-width: ${size};`
  )}
  ${map(
    {
      tablet: "40%",
      desktop: "55%",
    },
    (size) => `min-width: ${size};`
  )}
  picture,
  img,
  video,
  object {
    width: 100%;
    height: auto;
    margin: auto 0px;
  }
  ${(props) =>
    map(
      {
        mobile: 2,
        tablet: props.reverse ? 1 : 2,
        desktop: props.reverse ? 1 : 2,
      },
      (order) => `order: ${order};`
    )}
  ${(props) =>
    props.background
      ? `background: url("${props.background}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  `
      : ""}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0px;
  color: ${colors.grey10};
  & > p + p {
    margin-top: 16px;
  }
`;

const Anchor = styled.div`
  ${my({ mobile: 2, tablet: 3, xl: 5 })}
`;

const FeatureList = () => {
  return (
    <Container>
      <SectionTitleContainer>
        <Heading
          variant="h1"
          as="h2"
          style={{ color: colors.grey5, marginBottom: "16px" }}
        >
          <HighlightText stopOne={colors.pink30} stopTwo={colors.purple40}>
            Revitalize
          </HighlightText>{" "}
          your art pipelines.
        </Heading>
        <Text variant="subhead" style={{ color: colors.grey10 }}>
          The future of digital art is in the cloud, not on your local drives.
          Get a top down view of all your content that's easy for your whole
          team to understand.
        </Text>
      </SectionTitleContainer>

      <Anchor id="storage">
        <FeatureContainer>
          <TextColumn>
            <TextContainer>
              <HeadingContainer>
                <IconContainer>
                  <CloudIcon />
                </IconContainer>
                <Heading variant="h3">
                  Locate your files,{" "}
                  <HighlightText
                    direction="bottom right"
                    stopOne={`${colors.pink30}`}
                    stopTwo={`${colors.purple40}`}
                  >
                    like a wizard
                  </HighlightText>
                  .
                </Heading>
              </HeadingContainer>
              <Text>
                Searching without preview and tags is no fun. Stop digging
                through dozens of folders to find the files you need.
              </Text>
              <Text>
                Preview, search, tag and organize files to create a system that
                works for you.
              </Text>
            </TextContainer>
          </TextColumn>
          <ContentColumn background={BottomLeft}>
            <img src={SearchWebp} />
          </ContentColumn>
        </FeatureContainer>
      </Anchor>

      <Anchor id="review">
        <FeatureContainer>
          <TextColumn reverse>
            <TextContainer>
              <HeadingContainer>
                <IconContainer>
                  <InspectIcon style={{ marginRight: "8px" }} />
                </IconContainer>
                <Heading variant="h3">
                  Review assets{" "}
                  <HighlightText
                    direction="bottom right"
                    stopOne={`${colors.pink30}`}
                    stopTwo={`${colors.purple40}`}
                  >
                    anywhere, anytime
                  </HighlightText>
                  .
                </Heading>
              </HeadingContainer>
              <Text>
                You don’t need to consult an oracle just to review art files.
              </Text>
              <Text>
                mudstack’s compatability with a wide array of supported file
                types allows you to view, review, and share files with anyone on
                your team, right in the browser.
              </Text>
            </TextContainer>
          </TextColumn>
          <ContentColumn reverse background={TopRight}>
            <video playsInline loop autoPlay muted preload="auto">
              <source src={ViewerWebm} />
            </video>
          </ContentColumn>
        </FeatureContainer>
      </Anchor>

      <Anchor id="handoff">
        <FeatureContainer>
          <TextColumn>
            <TextContainer>
              <HeadingContainer>
                <IconContainer>
                  <CollaborateIcon />
                </IconContainer>
                <Heading variant="h3">
                  The art of the handoff,{" "}
                  <HighlightText
                    direction="bottom right"
                    stopOne={`${colors.pink30}`}
                    stopTwo={`${colors.purple40}`}
                  >
                    perfected
                  </HighlightText>
                  .
                </Heading>
              </HeadingContainer>
              <Text>
                Checking 5 different apps just to understand the state of work
                is so 2020.
              </Text>
              <Text>
                Close the loop between design, art, and production by making it
                easier to work for everyone. Streamline your processes in one
                platform, tailor made for your team.
              </Text>
            </TextContainer>
          </TextColumn>
          <ContentColumn background={TopLeft}>
            <object
              id="animated-svg"
              type="image/svg+xml"
              data={AnimatedFiles}
            />
          </ContentColumn>
        </FeatureContainer>
      </Anchor>

      <Anchor id="versions">
        <FeatureContainer>
          <TextColumn reverse>
            <TextContainer>
              <HeadingContainer>
                <IconContainer>
                  <VersionIcon />
                </IconContainer>
                <Heading variant="h3">
                  Iterate,{" "}
                  <HighlightText
                    direction="bottom right"
                    stopOne={`${colors.pink30}`}
                    stopTwo={`${colors.purple40}`}
                  >
                    with confidence
                  </HighlightText>
                  .
                </Heading>
              </HeadingContainer>
              <Text>
                Version control doesn’t have to be chaotic. Don’t let branch
                fatigue burn you out.
              </Text>
              <Text>
                Step away from the complexity of source control systems, and get
                version control that was built for artists.
              </Text>
            </TextContainer>
          </TextColumn>
          <ContentColumn reverse background={BottomRight}>
            <StaticImage
              src="./images/version-control.png"
              alt="sequential version control for artists"
              style={{ marginBottom: "16px" }}
            />
          </ContentColumn>
        </FeatureContainer>
      </Anchor>
    </Container>
  );
};

export default FeatureList;
