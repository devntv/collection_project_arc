import Logo from "components/Logo";
import { Link } from "gatsby";
import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { map } from "styled-components-breakpoint";
import { mb, p, pb, px, py } from "styled-components-spacing";
import { colors, Text } from "themes/components";
import useOnClickOutside from "utils/useOnClickOutside";

import DiscordLogo from "../Icons/Discord";
import TwitterLogo from "../Icons/Twitter";
import Approve from "./icons/Approve";
import Cloud from "./icons/Cloud";
import Cup from "./icons/Cup";
import Versions from "./icons/Versions";

const Container = styled.div`
  ${map(
    { mobile: "flex", tablet: "none", desktop: "none" },
    (display) => `display: ${display};`
  )}
  align-items: center;
  justify-content: space-between;
  ${p(2)};
  width: 100%;
  z-index: 200;
  background-color: ${colors.grey90};
`;

const Burger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;
  &:focus {
    outline: none;
  }

  span {
    width: 24px;
    height: 3px;
    background: ${colors.grey20};
    border-radius: 10px;
    transition: opacity 0.15s ease, transform 0.15s ease;
    position: relative;
    transform-origin: 0.5px;

    :first-child {
      transform: ${(props) => (props.open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${(props) => (props.open ? "0" : "1")};
      transform: ${(props) =>
        props.open ? "translateX(20px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${(props) => (props.open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const Menu = styled.nav`
  background: ${colors.grey90};
  height: 100%;
  width: 100%;
  color: ${colors.grey30};
  padding: 24px 32px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const linkStyles = css`
  font-size: 18px;
  ${pb(1)};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s linear;
  color: ${colors.grey20};
  &.active,
  &:hover {
    color: ${colors.grey5};
  }
`;

const StyledLink = styled(Link)`
  ${linkStyles}
  display: block;
`;

const MenuItem = styled.div`
  ${linkStyles}
`;

const Feature = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  background: ${colors.grey70};
  ${px(1)}
  ${py(0)}
  ${mb(1)}
  border-radius: 4px;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    right: 16px;
    width: 2px;
    height: 10px;
    background-color: ${colors.grey40};
  }
  &:before {
    transform: rotate(45deg);
    top: calc(50% - 2px);
  }
  &:after {
    transform: rotate(-45deg);
    top: calc(50% - 8px);
  }
`;

const ExternalLink = styled.a`
  ${linkStyles}
`;

const LinkHeading = styled(Text)`
  font-weight: 500;
  color: ${colors.grey5};
`;

const SuperScript = styled.span`
  color: ${colors.purple30};
  background: ${colors.purple70};
  padding: 4px 8px 3px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-left: 2px;
  margin-right: 4px;
  position: relative;
  top: -8px;
`;

const Description = styled(Text)`
  color: ${colors.grey20};
`;

const Mobile = () => {
  const [open, setOpen] = useState(false);
  const menu = useRef();
  useOnClickOutside(menu, () => setOpen(false));
  return (
    <Container ref={menu}>
      <Logo />
      <Burger open={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Burger>
      <Menu open={open}>
        <Text
          variant="subhead"
          style={{ marginBottom: "24px", fontWeight: "500" }}
        >
          Menu
        </Text>
        <MenuItem activeClassName="active">
          Features
          <div style={{ marginTop: "16px" }}>
            <Feature to="/#storage" onClick={() => setOpen(false)}>
              <Cloud style={{ marginRight: "16px" }} />
              <div>
                <LinkHeading>Cloud Storage for Artists</LinkHeading>
                <Description variant="small">
                  All your teams files in one place.
                </Description>
              </div>
            </Feature>
            <Feature to="/#handoff" onClick={() => setOpen(false)}>
              <Cup style={{ marginRight: "16px" }} />
              <div>
                <LinkHeading>Handoff with Confidence</LinkHeading>
                <Description variant="small">
                  Everything the next artist needs.
                </Description>
              </div>
            </Feature>
            <Feature to="/#review" onClick={() => setOpen(false)}>
              <Approve style={{ marginRight: "16px" }} />
              <div>
                <LinkHeading>Review & Collaborate</LinkHeading>
                <Description variant="small">
                  All your conversations, in context.
                </Description>
              </div>
            </Feature>
            <Feature to="/#versions" onClick={() => setOpen(false)}>
              <Versions style={{ marginRight: "16px" }} />
              <div>
                <LinkHeading>Manage Versions</LinkHeading>
                <Description variant="small">
                  Artist first version control.
                </Description>
              </div>
            </Feature>
          </div>
        </MenuItem>
        <StyledLink to="/desktop" activeClassName="active">
          Desktop <SuperScript>beta</SuperScript> &rarr;
        </StyledLink>
        <StyledLink to="/showcase" activeClassName="active">
          Showcase &rarr;
        </StyledLink>
        <StyledLink to="/pricing" activeClassName="active">
          Pricing &rarr;
        </StyledLink>
        <StyledLink to="/about" activeClassName="active">
          About &rarr;
        </StyledLink>
        <div>
          <a href="https://discord.gg/eXbMXKb5fY" target="_blank">
            <DiscordLogo width={32} height={32} hoverFill={colors.discord} />
          </a>
          <a
            href="https://twitter.com/mudstack"
            target="_blank"
            style={{ marginLeft: "8px" }}
          >
            <TwitterLogo width={32} height={32} hoverFill={colors.twitter} />
          </a>
        </div>
      </Menu>
    </Container>
  );
};

export default Mobile;
