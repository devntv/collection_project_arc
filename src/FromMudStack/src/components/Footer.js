import { Link } from "gatsby";
import React from "react";
import styled, { css } from "styled-components";
import { map } from "styled-components-breakpoint";
import { mb, ml, mr, my, pb, pt, px } from "styled-components-spacing";
import { colors } from "themes/components";

import Text from "themes/components/Text";
import HighlightText from "utils/HighlightText";
import CustomerTermsFile from "../pages/terms-of-service/Mudstack_Customer_Terms_of_Service.pdf";
import PrivacyPolicyFile from "../pages/terms-of-service/Mudstack_Privacy_Policy.pdf";
import UserTermsFile from "../pages/terms-of-service/Mudstack_User_Terms_of_Service.pdf";
import Button from "./Button";
import DiscordLogo from "./Icons/Discord";
import ExternalIcon from "./Icons/External";
import LinkedinLogo from "./Icons/Linkedin";
import TwitterLogo from "./Icons/Twitter";
import YouTubeLogo from "./Icons/Youtube";
import Logo from "./Logo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  ${px(2)};
  background-color: ${colors.grey90};
`;

const FooterTop = styled.div`
  color: ${colors.grey5};
  display: flex;
  ${map(
    {
      mobile: "column",
      tablet: "row",
    },
    (direction) => `flex-direction: ${direction};`
  )}
  width: 100%;
  ${pt(8)};
  ${my({ tablet: 1, desktop: 3 })};
`;

const leftCol = css`
  ${map(
    {
      mobile: "0 0 100%",
      tablet: "0 0 35%",
      desktop: "0 0 30%",
      xl: "0 0 25%",
    },
    (flex) => `flex: ${flex};`
  )}
  ${map(
    {
      tablet: "10%",
      desktop: "5%",
      xl: "15%",
    },
    (marginRight) => `margin-right: ${marginRight};`
  )}
  ${mb(3)}
`;

const rightCol = css`
  ${map(
    {
      mobile: "0 0 100%",
      tablet: "0 0 60%",
      desktop: "0 0 65%",
      xl: "0 0 55%",
    },
    (flex) => `flex: ${flex};`
  )}
`;

const CtaSection = styled.div`
  ${leftCol}
  ${map(
    {
      mobile: "350px",
      tablet: "auto",
    },
    (maxWidth) => `max-width: ${maxWidth};`
  )}
  color: ${colors.grey20};
`;

const LinksContainer = styled.div`
  ${rightCol}
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterBottom = styled.div`
  display: flex;
  ${map(
    {
      mobile: "column",
      tablet: "row",
    },
    (direction) => `flex-direction: ${direction};`
  )}
  width: 100%;
  ${map(
    {
      mobile: "16px auto 32px auto",
      tablet: "32px auto 48px auto",
    },
    (margin) => `margin: ${margin};`
  )}
`;

const Links = styled.div`
  ${map(
    {
      mobile: "0 0 100%",
      tablet: "0 0 50%",
      desktop: "unset",
    },
    (flex) => `flex: ${flex};`
  )}
  ${mb(4)};
`;

const SectionHeader = styled.h4`
  color: ${colors.grey5};
  ${mb(1)};
  ${pb(1)};
  position: relative;
  &:after {
    content: "";
    width: 16px;
    height: 2px;
    background-color: ${colors.purple30};
    position: absolute;
    top: 32px;
    left: 0;
  }
`;

const LogoContainer = styled.div`
  ${leftCol}
`;

const TaglineSection = styled.div`
  ${rightCol}
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > a {
    ${mb(0)}
    ${mr(0)}
  }
`;

const linkStyles = css`
  display: flex;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.grey30};
  text-decoration: none;
  cursor: pointer;
  ${my(0)};
  transition: color 0.3s ease;
  &:hover,
  &:focus {
    color: ${colors.grey5};
  }
`;

const InternalLink = styled(Link)`
  ${linkStyles}
`;

const ExternalLink = styled.a`
  ${linkStyles}
`;

const Badge = styled.span`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  color: ${colors.grey90};
  background: ${colors.teal40};
  ${ml(0)};
  padding: 0 8px;
  border-radius: 8px;
`;

const Social = styled.div`
  display: flex;
  & > a {
    margin: 0;
    ${mr(0)};
  }
`;

const Tagline = styled.div`
  font-weight: 800;
  font-size: 18px;
  line-height: 1.15;
  letter-spacing: -0.2px;
  color: ${colors.grey5};
`;

const Footer = () => (
  <Container>
    <FooterTop>
      <CtaSection>
        <Text style={{ margin: "0 0 24px 0" }}>
          Game studios work best when everyone executes. mudstack helps you get
          there.
        </Text>
        <Text style={{ margin: "0 0 24px 0" }}>
          Let your teams focus on being artists.
        </Text>
        <ButtonsContainer>
          <Button as={Link} to="/desktop" rel="nofollow">
            Download desktop beta &rarr;
          </Button>
          <Button
            as="a"
            secondary
            href="https://calendly.com/mudstack-customers/get-a-demo"
            rel="nofollow"
          >
            Get a demo
          </Button>
        </ButtonsContainer>
      </CtaSection>
      <LinksContainer>
        <Links>
          <SectionHeader>Features</SectionHeader>
          <InternalLink to="/#storage">Cloud Storage for Artists</InternalLink>
          <InternalLink to="/#review">Review & Collaborate</InternalLink>
          <InternalLink to="/#handoff">Handoff with Confidence</InternalLink>
          <InternalLink to="/#versions">Manage your Versions</InternalLink>
          <ExternalLink
            style={{ marginTop: "24px" }}
            href="https://mudstack.canny.io/"
            target="blank"
          >
            Roadmap
            <ExternalIcon
              fillColor={`${colors.grey40}`}
              style={{ marginLeft: "4px" }}
            />
          </ExternalLink>
          <ExternalLink
            href="https://mudstack.canny.io/feature-requests"
            target="blank"
          >
            Request Features
            <ExternalIcon
              fillColor={`${colors.grey40}`}
              style={{ marginLeft: "4px" }}
            />
          </ExternalLink>
          <ExternalLink
            href="https://mudstack.canny.io/changelog"
            target="blank"
          >
            Changelog
            <ExternalIcon
              fillColor={`${colors.grey40}`}
              style={{ marginLeft: "4px" }}
            />
          </ExternalLink>
        </Links>
        <Links>
          <SectionHeader>Resources</SectionHeader>
          <InternalLink to="/pricing">Pricing</InternalLink>
          <ExternalLink href="https://docs.mudstack.com">
            Documentation
          </ExternalLink>
          <SectionHeader style={{ marginTop: "40px" }}>Legal</SectionHeader>
          <ExternalLink href={PrivacyPolicyFile} download>
            Privacy Policy
          </ExternalLink>
          <ExternalLink href={CustomerTermsFile} download>
            Customer Terms of Service
          </ExternalLink>
          <ExternalLink href={UserTermsFile} download>
            User Terms of Service
          </ExternalLink>
        </Links>
        <Links>
          <SectionHeader>Connect</SectionHeader>
          <Social>
            <ExternalLink href="https://discord.gg/eXbMXKb5fY" target="_blank">
              <DiscordLogo hoverFill={colors.discord} />
            </ExternalLink>
            <ExternalLink href="https://twitter.com/mudstack" target="_blank">
              <TwitterLogo hoverFill={colors.twitter} />
            </ExternalLink>
            <ExternalLink
              href="https://linkedin.com/company/mudstack"
              target="_blank"
            >
              <LinkedinLogo hoverFill={`${colors.linkedin}`} />
            </ExternalLink>
            <ExternalLink
              href="https://www.youtube.com/channel/UCzEYEPcsnwYkjLxqiINjBHQ"
              target="blank"
            >
              <YouTubeLogo hoverFill={`${colors.youtube}`} />
            </ExternalLink>
          </Social>
          <InternalLink to="/about">About</InternalLink>
          <InternalLink to="/showcase">Showcase</InternalLink>
          <InternalLink to="/podcast">Podcast</InternalLink>
          <InternalLink to="/careers">
            Careers
            {/* <Badge>We're Hiring!</Badge> */}
          </InternalLink>
          <InternalLink to="/press">Press</InternalLink>
        </Links>
      </LinksContainer>
    </FooterTop>
    <FooterBottom>
      <LogoContainer>
        <Logo style={{ marginRight: "24px" }} />
      </LogoContainer>
      <TaglineSection>
        <Tagline>
          <HighlightText
            direction="bottom"
            stopOne={`${colors.pink30}`}
            stopTwo={`${colors.purple40}`}
          >
            Level up
          </HighlightText>{" "}
          your game art & your art game.
        </Tagline>
      </TaglineSection>
    </FooterBottom>
  </Container>
);

export default Footer;
