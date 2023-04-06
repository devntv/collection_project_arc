import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export default function XMenuIcon({
  height = 24,
  width = 24,
  color = 'inherit',
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}