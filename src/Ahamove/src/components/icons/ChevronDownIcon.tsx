import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function ChevronDownIcon({
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
      path="M5.10096 12.4629L14.6092 21.7078C15.0095 22.0974 15.6561 22.0974 16.0574 21.7078L25.5657 12.4629C26.1448 11.9005 26.1448 10.9856 25.5657 10.4223C24.9866 9.85997 24.0468 9.85997 23.4678 10.4223L15.3328 18.3309L7.19994 10.4223C6.61984 9.85997 5.68003 9.85997 5.10096 10.4223C4.5219 10.9856 4.5219 11.9005 5.10096 12.4629Z"
      {...props}
    />
  );
}