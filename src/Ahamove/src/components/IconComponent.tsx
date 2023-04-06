import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export default function IconComponent({
  height = 24,
  width = 24,
  color = 'inherit',
  path,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d={path} fill={color} />
    </svg>
  );
}