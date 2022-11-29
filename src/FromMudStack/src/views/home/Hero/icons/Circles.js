import React from "react";
import SvgIcon from "utils/SvgIcon";

const Circles = ({ color, style }) => {
  return (
    <SvgIcon
      width="150"
      height="150"
      viewBox="0 0 150 150"
      style={style}
      useFill={false}
    >
      <circle opacity="0.3" cx="75" cy="75" r="4.72973" fill={color} />
      <circle
        opacity="0.3"
        cx="75"
        cy="75"
        r="10.4865"
        stroke={color}
        strokeWidth="2"
      />
      <circle
        opacity="0.3"
        cx="75"
        cy="75"
        r="17.2432"
        stroke={color}
        strokeWidth="2"
      />
      <circle
        opacity="0.25"
        cx="75"
        cy="75"
        r="24"
        stroke={color}
        strokeWidth="2"
      />
      <circle
        opacity="0.2"
        cx="75"
        cy="75"
        r="31.0068"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle
        opacity="0.2"
        cx="75"
        cy="75"
        r="37.7635"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle opacity="0.2" cx="75" cy="75" r="44.7703" stroke={color} />
      <circle opacity="0.15" cx="75" cy="75" r="51.527" stroke={color} />
      <circle opacity="0.15" cx="75" cy="75" r="58.2838" stroke={color} />
      <circle
        opacity="0.15"
        cx="75"
        cy="75"
        r="66.5169"
        stroke={color}
        strokeWidth="0.75"
      />
      <circle
        opacity="0.15"
        cx="75"
        cy="75"
        r="74.625"
        stroke={color}
        strokeWidth="0.75"
      />
    </SvgIcon>
  );
};

export default Circles;
