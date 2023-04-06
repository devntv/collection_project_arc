import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function ArrowNarrowLeftIcon({
  height = 24,
  width = 24,
  path,
  color = 'inherit',
  ...props
}: Props) {
  return (
    <IconComponent
      height={height}
      width={width}
      color={color}
      path="M9.24855 17.6485C8.77993 18.1172 8.02013 18.1172 7.5515 17.6485L2.7515 12.8485C2.28287 12.3799 2.28287 11.6201 2.7515 11.1515L7.5515 6.35147C8.02013 5.88284 8.77992 5.88284 9.24855 6.35147C9.71718 6.8201 9.71718 7.5799 9.24855 8.04853L6.49708 10.8L20.4 10.8C21.0628 10.8 21.6 11.3373 21.6 12C21.6 12.6627 21.0628 13.2 20.4 13.2L6.49708 13.2L9.24855 15.9515C9.71718 16.4201 9.71718 17.1799 9.24855 17.6485Z"
      {...props}
    />
  );
}
