import React from "react";
import styled from "styled-components";
import { colors } from "themes/components";

const StyledSvg = styled.svg`
  ${(props) =>
    props.useFill
      ? `fill: ${props.fillColor ? props.fillColor : colors.grey20};
  transition: 0.2s ease-in-out;
  &:hover {
    fill: ${props.hoverFill};
  }`
      : ""}
`;

const SvgIcon = ({
  width,
  height,
  pos = "left",
  viewBox,
  children,
  useFill = true,
  ...rest
}) => (
  <StyledSvg
    width={width || 18}
    height={height || 18}
    viewBox={viewBox || `0 0 ${width || 18} ${height || 18}`}
    xmlns="http://www.w3.org/2000/svg"
    {...{ ...rest, useFill, ...(useFill ? {} : { fill: "none" }) }}
  >
    {children}
  </StyledSvg>
);

export default SvgIcon;
