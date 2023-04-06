import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function ArrowNarrowUpIcon({
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
      path="M6.35147 9.24855C5.88284 8.77992 5.88284 8.02013 6.35147 7.5515L11.1515 2.7515C11.6201 2.28287 12.3799 2.28287 12.8485 2.7515L17.6485 7.5515C18.1172 8.02013 18.1172 8.77992 17.6485 9.24855C17.1799 9.71718 16.4201 9.71718 15.9515 9.24855L13.2 6.49708L13.2 20.4C13.2 21.0628 12.6627 21.6 12 21.6C11.3373 21.6 10.8 21.0628 10.8 20.4L10.8 6.49708L8.04853 9.24855C7.5799 9.71718 6.8201 9.71718 6.35147 9.24855Z"
      {...props}
    />
  );
}
