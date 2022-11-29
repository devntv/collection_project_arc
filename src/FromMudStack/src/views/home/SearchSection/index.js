import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { map } from "styled-components-breakpoint";
import { mb, px } from "styled-components-spacing";
import { colors, Heading, spacing, Text } from "themes/components";

import HighlightText from "utils/HighlightText";
import FileSystemHierarchy from "./images/FileSystemHierarchy.png";
import Filtering from "./images/Filtering.png";
import FullSearch from "./images/FullSearch.png";
import Libraries from "./images/Libraries.png";
import VisualSearch from "./images/VisualSearch.png";

const Wrapper = styled.div`
  position: relative;
  ${px(2)};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const TextBody = styled.div`
  color: ${colors.grey10};
  ${map(
    {
      mobile: "100%",
      tablet: "40%",
      desktop: "30%",
    },
    (width) => `width: ${width};`
  )}
  ${(props) =>
    map(
      {
        mobile: props.bottom ? "55vh" : "15vh",
        tablet: props.bottom ? "30vh" : "30vh",
        desktop: props.bottom ? "40vh" : "15vh",
      },
      (margin) => `margin-bottom: ${margin};`
    )}
  ${(props) =>
    map(
      {
        mobile: props.top ? "10vh" : "0vh",
        tablet: props.top ? "40vh" : "0vh",
      },
      (margin) => `margin-top: ${margin};`
    )}
  & > svg {
    ${mb(1)};
  }
`;

const ImageContainerWrapper = styled.div`
  ${map(
    {
      mobile: "100%",
      tablet: "60%",
      desktop: "65%",
    },
    (width) => `width: ${width};`
  )}
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
`;

const ImageContainer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  right: 0;
`;

const ImageWrapper = styled.div`
  ${map(
    {
      mobile: "padding: 76vh 0 0;",
      tablet: "padding: 20vh 0 20vh;",
    },
    (padding) => `${padding}`
  )}
  ${map(
    {
      mobile: spacing[1],
      tablet: spacing[7],
      desktop: spacing[7],
    },
    (padding) => `padding-left: ${padding};`
  )}
  ${map(
    {
      mobile: spacing[1],
      tablet: spacing[3],
      desktop: spacing[3],
    },
    (padding) => `padding-right: ${padding};`
  )}
`;

const Image = styled.img`
  opacity: 0;
  width: 100%;
  ${map(
    {
      mobile: "10vh",
      tablet: "auto",
      desktop: "auto",
    },
    (bottom) => `bottom: ${bottom};`
  )}
  position: ${(props) => (props.active ? "relative" : "absolute")};
  display: ${(props) => (props.active ? "flex" : "none")};
  &.visible {
    opacity: 1;
  }
`;

const EasyMode = () => {
  const [activeImage, setActiveImage] = useState(1);
  const text1Ref = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();
  const text4Ref = useRef();
  const text5Ref = useRef();

  const handleScroll = (event) => {
    const offSet = window?.innerHeight - 250;
    if (text1Ref?.current?.getBoundingClientRect().bottom <= offSet) {
      setActiveImage(1);
    }
    if (text2Ref?.current?.getBoundingClientRect().bottom <= offSet) {
      setActiveImage(2);
    }
    if (text3Ref?.current?.getBoundingClientRect().bottom <= offSet) {
      setActiveImage(3);
    }
    if (text4Ref?.current?.getBoundingClientRect().bottom <= offSet) {
      setActiveImage(4);
    }
    if (text5Ref?.current?.getBoundingClientRect().bottom <= offSet) {
      setActiveImage(5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      <TextContainer>
        <TextBody ref={text1Ref} top>
          <StaticImage
            src="./images/IconHardMode.png"
            alt="Crying emoji"
            width={48}
            style={{ marginBottom: "16px" }}
          />
          <Heading
            variant="h2"
            style={{
              color: colors.grey5,
              marginBottom: "24px",
            }}
          >
            The{" "}
            <HighlightText stopOne={colors.orange30} stopTwo={colors.red40}>
              hard mode
            </HighlightText>{" "}
            way...
          </Heading>
          <Text variant="subhead">
            When folder structures and file naming conventions need their own
            documentation, you know something is broken.
          </Text>
          <Text variant="subhead" style={{ marginTop: "24px" }}>
            Finding and previewing your files shouldn't have to be a chore. Now
            there's a better way.
          </Text>
        </TextBody>

        <TextBody ref={text2Ref}>
          <StaticImage
            src="./images/IconEasyMode.png"
            alt="Heart face emoji"
            width={48}
            style={{ marginBottom: "16px" }}
          />
          <Heading
            variant="h2"
            style={{
              color: colors.grey5,
              marginBottom: "24px",
            }}
          >
            Get{" "}
            <HighlightText stopOne={colors.teal40} stopTwo={colors.green40}>
              easy mode
            </HighlightText>{" "}
            with mudstack.
          </Heading>
          <Text variant="subhead" style={{ marginTop: "24px" }}>
            Forget Google Drive, Box or your network drives. This is cloud
            storage built for artists.
          </Text>
        </TextBody>

        <TextBody ref={text3Ref}>
          <StaticImage
            src="./images/IconVisualSearch.png"
            alt="Crying emoji"
            width={32}
            style={{ marginBottom: "16px" }}
          />
          <Heading
            variant="h4"
            as="h3"
            style={{ color: colors.grey5, marginTop: "0" }}
          >
            Find your files{" "}
            <HighlightText stopOne={colors.teal40} stopTwo={colors.green40}>
              from anywhere
            </HighlightText>
            .
          </Heading>
          <Text variant="subhead">
            Wave goodbye to complicated naming conventions. Visually identify
            your assets and favorite the ones that matter.
          </Text>
          <Text variant="subhead" style={{ marginTop: "24px" }}>
            Your team always has the most updated versions, no matter where they
            are.
          </Text>
        </TextBody>

        <TextBody ref={text4Ref}>
          <StaticImage
            src="./images/IconOrganize.png"
            alt="Crying emoji"
            width={32}
            style={{ marginBottom: "16px" }}
          />
          <Heading
            variant="h4"
            as="h3"
            style={{ color: colors.grey5, marginTop: "0" }}
          >
            Organize assets{" "}
            <HighlightText stopOne={colors.teal40} stopTwo={colors.green40}>
              your way
            </HighlightText>
            .
          </Heading>
          <Text variant="subhead">
            Texture libraries. Libraries for props. Libraries for models.
            Characters. Chairs. Spaceships.
          </Text>
          <Text variant="subhead" style={{ marginTop: "24px" }}>
            Combined with tags, you have a powerful asset management system that
            is infinitely customizable for how you work.
          </Text>
        </TextBody>

        <TextBody ref={text5Ref} bottom>
          <StaticImage
            src="./images/IconFindFast.png"
            alt="Crying emoji"
            width={32}
            style={{ marginBottom: "16px" }}
          />
          <Heading
            variant="h4"
            as="h3"
            style={{ color: colors.grey5, marginTop: "0" }}
          >
            Find what you need,{" "}
            <HighlightText stopOne={colors.teal40} stopTwo={colors.green40}>
              fast
            </HighlightText>
            .
          </Heading>
          <Text variant="subhead">
            Search by name. Search by tags. Search by asset type and
            collaborators. Sort by last update or most recently created. Filter
            your favorites.
          </Text>
          <Text variant="subhead" style={{ marginTop: "24px" }}>
            Stop struggling with cloud storage solutions that weren't built for
            you.
          </Text>
        </TextBody>

        <ImageContainerWrapper>
          <ImageContainer>
            <ImageWrapper>
              <Image
                src={FileSystemHierarchy}
                className={activeImage === 1 && "visible"}
                active={activeImage === 1}
              />
              <Image
                src={FullSearch}
                className={activeImage === 2 && "visible"}
                active={activeImage === 2}
                border
              />
              <Image
                src={VisualSearch}
                className={activeImage === 3 && "visible"}
                active={activeImage === 3}
                border
              />
              <Image
                src={Libraries}
                active={activeImage === 4}
                className={activeImage === 4 && "visible"}
                border
              />
              <Image
                src={Filtering}
                active={activeImage === 5}
                className={activeImage === 5 && "visible"}
                border
              />
            </ImageWrapper>
          </ImageContainer>
        </ImageContainerWrapper>
      </TextContainer>
    </Wrapper>
  );
};

export default EasyMode;
