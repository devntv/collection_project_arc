import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function ArrowNarrowDownIcon({
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
      path="M17.6485 14.7515C18.1172 15.2201 18.1172 15.9799 17.6485 16.4486L12.8485 21.2486C12.3799 21.7172 11.6201 21.7172 11.1515 21.2486L6.35147 16.4486C5.88284 15.9799 5.88284 15.2201 6.35147 14.7515C6.8201 14.2829 7.5799 14.2829 8.04853 14.7515L10.8 17.503L10.8 3.60003C10.8 2.93728 11.3373 2.40002 12 2.40002C12.6627 2.40002 13.2 2.93728 13.2 3.60003L13.2 17.503L15.9515 14.7515C16.4201 14.2829 17.1799 14.2829 17.6485 14.7515Z"
      {...props}
    />
  );
}