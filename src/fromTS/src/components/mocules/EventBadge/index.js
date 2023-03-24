import React from 'react';
import { Badge } from 'components/atoms';

const EventBadge = ({ url, children }) => (
  <Badge
    className="badge--event badge"
    url={url}
  >
    {children}
  </Badge>
);

export default EventBadge;
