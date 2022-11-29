import React from "react";
import styled, { css } from "styled-components";
import { map } from "styled-components-breakpoint";
import { colors } from "themes/components";

export const ButtonStyles = css`
  display: inline-block;
  border: 0;
  border-radius: 4px;
  height: 32px;
  ${map(
    {
      mobile: "12px",
      desktop: "16px",
    },
    (p) => `padding: 8px ${p} 9px;`
  )}
  outline: none;
  background: ${(props) =>
    props.secondary ? colors.teal70 : props.bg ? props.bg : colors.teal40};
  color: ${(props) => (props.secondary ? colors.teal40 : colors.grey90)};
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.3px;
  width: fit-content;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${colors.grey90};
    background: ${(props) =>
      props.secondary
        ? colors.teal40
        : props.hover
        ? props.hover
        : colors.teal50};
  }
  &:disabled {
    color: ${colors.grey70};
    background: ${colors.teal50};
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.button`
  ${ButtonStyles}
`;

export const Button = ({ children, ...props }) => (
  <ButtonContainer {...props}>{children}</ButtonContainer>
);

export default Button;
