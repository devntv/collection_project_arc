import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function ArrowNarrowRightIcon({
  height = 24,
  width = 24,
  color = 'inherit',
  ...props
}: Props) {
  return (
    <IconComponent
      height={height}
      width={width}
      color={color}
      path="M14.7514 6.35147C15.22 5.88284 15.9798 5.88284 16.4484 6.35147L21.2484 11.1515C21.7171 11.6201 21.7171 12.3799 21.2484 12.8485L16.4484 17.6485C15.9798 18.1172 15.22 18.1172 14.7514 17.6485C14.2827 17.1799 14.2827 16.4201 14.7514 15.9515L17.5028 13.2H3.5999C2.93716 13.2 2.3999 12.6627 2.3999 12C2.3999 11.3373 2.93716 10.8 3.5999 10.8H17.5028L14.7514 8.04853C14.2827 7.5799 14.2827 6.8201 14.7514 6.35147Z"
      {...props}
    />
  );
}