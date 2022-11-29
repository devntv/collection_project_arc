import { Link } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import { map } from "styled-components-breakpoint";
import { mx, px, py } from "styled-components-spacing";
import { colors } from "themes/components";
import Logo from "../Logo";

import DiscordLogo from "components/Icons/Discord";
import TwitterLogo from "components/Icons/Twitter";
import Approve from "./icons/Approve";
import Change from "./icons/Change";
import Cloud from "./icons/Cloud";
import Cup from "./icons/Cup";
import Tasks from "./icons/Tasks";
import Versions from "./icons/Versions";

const Container = styled.div`
  ${map(
    {
      mobile: "none",
      tablet: "flex",
      desktop: "flex",
    },
    (display) => `display: ${display};`
  )}
  user-select: none;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  ${px(2)}
  ${py(1)}
  background-color: ${colors.grey90};
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  padding-right: 16px;
  margin: auto 16px auto 0px;
`;

const HeaderDropdownLink = styled.div`
  position: relative;
  cursor: pointer;
  height: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.2px;
  color: ${colors.grey30};
  margin: auto 24px auto 0px;
  transition: color 0.3s ease-in-out;
  text-decoration: none;
  ${(props) =>
    props.active
      ? `text-decoration: none;
    color: ${colors.grey5};`
      : ""}
`;

const HeaderLink = styled(Link)`
  position: relative;
  cursor: pointer;
  height: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.2px;
  color: ${colors.grey30};
  ${map(
    {
      tablet: "12px",
      desktop: "24px",
    },
    (margin) => `margin: auto ${margin} auto 0px;`
  )}
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${colors.grey5};
  }
  &.active {
    color: ${colors.grey5};
    text-decoration: none;
  }
  &.secondary {
    ${map(
      {
        tablet: "none",
        desktop: "block",
      },
      (display) => `display: ${display};`
    )}
  }
`;

const SuperScript = styled.span`
  color: ${colors.purple30};
  background: ${colors.purple70};
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-left: 4px;
  position: relative;
  top: -4px;
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  margin: auto 0px auto auto;
  & > a[data-link="social"] {
    @media (min-width: 768px) and (max-width: 852px) {
      display: none;
    }
    ${mx(0)}/* & > svg {
      fill: ${colors.grey30};
    } */
    /* &:hover {
      & > svg {
        fill: ${colors.purple30};
      }
    } */
  }
`;

const ActionLink = styled.a`
  padding: 8px;
  color: ${colors.grey30};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.5px;
  text-decoration: none;
  margin: auto 8px auto 0px;
  transition: color 0.2s ease;
  &:hover {
    color: ${colors.grey5};
  }
`;

const GetStartedButton = styled.a`
  padding: 8px 16px;
  background-color: ${colors.teal40};
  color: ${colors.grey90};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.3px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${colors.teal50};
  }
`;

const DropdownContainer = styled.div`
  cursor: default;
  position: absolute;
  width: max-content;
  ${map(
    {
      mobile: "left: 0; top: 0;",
      tablet: "top: 32px; left: -16px",
      desktop: "top: 32px; left: -16px",
    },
    (position) => `${position};`
  )}
  display: flex;
  ${map(
    {
      mobile: "column",
      tablet: "row",
      desktop: "row",
    },
    (direction) => `flex-direction: ${direction};`
  )}
  background: ${colors.grey70};
  border-radius: 4px;
  box-shadow: 4px 4px 10px rgba(18, 18, 22, 0.8);
`;

const DropdownLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const DropdownLinkHeader = styled.h4`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: ${colors.grey5};
`;

const Tag = styled.span`
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  line-height: 1.5;
  letter-spacing: -0.2px;
  color: ${colors.teal40};
  margin: auto 0px auto 8px;
`;

const DropdownLinkSubtext = styled.div`
  font-size: 12px;
  line-height: 1.5;
  color: ${colors.grey30};
`;

const DropdownLinkContainer = styled.a`
  display: flex;
  ${(props) =>
    map(
      {
        mobile: "margin-bottom: 24px;",
        tablet: props.margin ? "margin-bottom: 24px;" : "margin-bottom: 0px;",
        desktop: props.margin ? "margin-bottom: 24px;" : "margin-bottom: 0px;",
      },
      (margin) => `${margin}`
    )}
  ${DropdownLinkHeader} {
    color: ${(props) =>
      props.future ? `${colors.grey20}` : `${colors.grey5}`};
    &:hover {
      color: ${(props) =>
        props.future ? `${colors.grey20}` : `${colors.grey5}`};
    }
  }
  ${DropdownLinkSubtext} {
    color: ${colors.grey30};
    &:hover {
      color: ${(props) =>
        props.future ? `${colors.grey30}` : `${colors.grey5}`};
    }
  }
  text-decoration: none;
`;

const DropdownLinkTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownDivider = styled.div`
  border: 1px solid ${colors.grey90};
  ${map(
    {
      mobile: "width: auto; height: 1px;",
      tablet: "height: auto; width: 1px;",
      desktop: "height: auto; width: 1px;",
    },
    (dimensions) => `${dimensions}`
  )}
`;

const FeaturesDropdown = ({ onMouseLeave }) => {
  return (
    <DropdownContainer onMouseLeave={onMouseLeave}>
      <DropdownLinkColumn>
        <DropdownLinkContainer margin href="/#storage">
          <Cloud style={{ marginRight: "8px" }} />
          <DropdownLinkTextContainer>
            <DropdownLinkHeader>Cloud Storage for Artists</DropdownLinkHeader>
            <DropdownLinkSubtext>
              All your teams files in one place.
            </DropdownLinkSubtext>
          </DropdownLinkTextContainer>
        </DropdownLinkContainer>
        <DropdownLinkContainer href="/#review">
          <Approve style={{ marginRight: "8px" }} />
          <DropdownLinkTextContainer>
            <DropdownLinkHeader>Review & Collaborate</DropdownLinkHeader>
            <DropdownLinkSubtext>
              All your conversations, in context.
            </DropdownLinkSubtext>
          </DropdownLinkTextContainer>
        </DropdownLinkContainer>
      </DropdownLinkColumn>
      <DropdownLinkColumn>
        <DropdownLinkContainer margin href="/#handoff">
          <Cup style={{ marginRight: "8px" }} />
          <DropdownLinkTextContainer>
            <DropdownLinkHeader>Handoff with Confidence</DropdownLinkHeader>
            <DropdownLinkSubtext>
              Everything the next artist needs.
            </DropdownLinkSubtext>
          </DropdownLinkTextContainer>
        </DropdownLinkContainer>
        <DropdownLinkContainer href="/#versions">
          <Versions style={{ marginRight: "8px" }} />
          <DropdownLinkTextContainer>
            <DropdownLinkHeader>Manage Versions</DropdownLinkHeader>
            <DropdownLinkSubtext>
              Artist first version control.
            </DropdownLinkSubtext>
          </DropdownLinkTextContainer>
        </DropdownLinkContainer>
      </DropdownLinkColumn>
      <DropdownDivider />
      <DropdownLinkColumn>
        <DropdownLinkContainer margin future>
          <Tasks style={{ marginRight: "8px" }} />
          <DropdownLinkTextContainer>
            <DropdownLinkHeader>
              Task Management<Tag>Coming Soon</Tag>
            </DropdownLinkHeader>
            <DropdownLinkSubtext>
              Manage your team’s tasks in one platform.
            </DropdownLinkSubtext>
          </DropdownLinkTextContainer>
        </DropdownLinkContainer>
        <DropdownLinkContainer future>
          <Change style={{ marginRight: "8px" }} />
          <DropdownLinkTextContainer>
            <DropdownLinkHeader>
              Pipeline Management<Tag>Coming Soon</Tag>
            </DropdownLinkHeader>
            <DropdownLinkSubtext>
              Setup your pipelines and own your workflows.
            </DropdownLinkSubtext>
          </DropdownLinkTextContainer>
        </DropdownLinkContainer>
      </DropdownLinkColumn>
    </DropdownContainer>
  );
};

const Header = () => {
  const [featureDropdownOpen, setFeatureDropdownOpen] = useState(false);
  return (
    <Container onMouseLeave={() => setFeatureDropdownOpen(false)}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <HeaderDropdownLink
        active={featureDropdownOpen}
        onMouseEnter={() => setFeatureDropdownOpen(true)}
      >
        {featureDropdownOpen && (
          <FeaturesDropdown
            onMouseLeave={() => setFeatureDropdownOpen(false)}
          />
        )}
        Features
      </HeaderDropdownLink>
      <HeaderLink to="/desktop" activeClassName="active" partiallyActive={true}>
        Desktop
        <SuperScript>beta</SuperScript>
      </HeaderLink>
      <HeaderLink to="/showcase" activeClassName="active" className="secondary">
        Showcase
      </HeaderLink>
      <HeaderLink to="/pricing" activeClassName="active">
        Pricing
      </HeaderLink>
      <HeaderLink to="/about" activeClassName="active" className="secondary">
        About
      </HeaderLink>
      <RightLinks>
        <a
          href="https://discord.gg/eXbMXKb5fY"
          data-link="social"
          target="_blank"
          rel="nofollow"
        >
          <DiscordLogo fillColor={colors.grey30} hoverFill={colors.discord} />
        </a>
        <a
          href="https://twitter.com/mudstack"
          data-link="social"
          target="_blank"
          rel="nofollow"
        >
          <TwitterLogo fillColor={colors.grey30} hoverFill={colors.twitter} />
        </a>
        <ActionLink
          href="https://showcase.mudstack.com/meetings/chloe-warnock/discovery-call"
          target="_blank"
          rel="nofollow"
        >
          Get a demo
        </ActionLink>
        <ActionLink href="https://app.mudstack.com/login" rel="nofollow">
          Log in
        </ActionLink>
        {/* <GetStartedButton
          href="https://app.mudstack.com/explore"
          rel="nofollow"
        >
          Try mudstack free &rarr;
        </GetStartedButton> */}
      </RightLinks>
    </Container>
  );
};

export default Header;
