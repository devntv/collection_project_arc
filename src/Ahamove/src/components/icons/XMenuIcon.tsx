import React from 'react';
import IconComponent from '../IconComponent';

type Props = React.SVGProps<SVGSVGElement>;

export default function XMenuIcon({
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
      path="M17.8874 16.0001L26.2768 7.61072C26.798 7.08994 26.798 6.24495 26.2768 5.72417C25.7556 5.20295 24.9115 5.20295 24.3902 5.72417L16.0008 14.1136L7.61097 5.72417C7.08974 5.20295 6.24564 5.20295 5.72442 5.72417C5.20319 6.24495 5.20319 7.08994 5.72442 7.61072L14.1143 16.0001L5.72442 24.3896C5.20319 24.9103 5.20319 25.7553 5.72442 26.2761C5.98503 26.5363 6.32658 26.6666 6.66769 26.6666C7.0088 26.6666 7.35035 26.5363 7.61097 26.2757L16.0008 17.8862L24.3902 26.2757C24.6509 26.5363 24.9924 26.6666 25.3335 26.6666C25.6746 26.6666 26.0162 26.5363 26.2768 26.2757C26.798 25.7549 26.798 24.9099 26.2768 24.3891L17.8874 16.0001Z"
      {...props}
    />
  );
}