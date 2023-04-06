import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function ChevronUpIcon({
  height = 32,
  width = 32,
  color = 'inherit',
  ...props
}: Props) {
  return (
    <IconComponent
      height={height}
      width={width}
      color={color}
      path="M25.5655 19.5371L16.0573 10.2922C15.657 9.90262 15.0104 9.90262 14.6091 10.2922L5.1008 19.5371C4.52174 20.0995 4.52174 21.0144 5.1008 21.5777C5.67986 22.14 6.61967 22.14 7.19874 21.5777L15.3337 13.6691L23.4666 21.5777C24.0467 22.14 24.9865 22.14 25.5655 21.5777C26.1446 21.0144 26.1446 20.0995 25.5655 19.5371Z"
      {...props}
    />
  );
}
