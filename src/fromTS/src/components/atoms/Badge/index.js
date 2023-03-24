import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Badge = ({ children, url = null, className }) => {
  const router = useRouter();
  const handleClick = () => {
    if (url) router.push(url);
  };
  return (
    <Button className={className} onClick={handleClick}>
      {children}
    </Button>
  );
};

const StyledBadge = styled(Badge)`
  &.badge {
    position: absolute;
    left: -0.25em;
    top: 1px;
    color: white;
    padding: 3.3px 6.67px;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    font-size: 11px;
    /* font-weight: bold; */
    line-height: 1;
    z-index: 3;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: -0.1875rem;
      border-left: 0.1875rem solid transparent;
    }

    &--event {
      background: #dc3545;

      &:hover {
        color: #17a2b8;
      }

      &::after {
        border-top: 0.1875rem solid #dc3545;
      }
    }

    &--new {
      background: #f9b514;
      &::after {
        border-top: 0.1875rem solid #bc8505;
      }
    }

    &--contract-price {
      background: #fef5f0;
      color: #a70404;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      &::after {
        border-top: 0.1875rem solid #bc8505;
      }
    }
  }
`;

export default React.memo(StyledBadge);
