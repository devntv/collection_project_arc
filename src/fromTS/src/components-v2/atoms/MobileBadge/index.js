import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const CustomQuantity = styled.span`
  background-color: #d4323b;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: ${(props) => (props.isProductPage ? '-11%' : '5%')};
  right: ${(props) => (props.isProductPage ? '0%' : '5%')};
  color: #fff;
  font-size: ${(props) => (props.quantity >= props.max ? '10px' : '12px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dots = styled.span`
  background-color: #d4323b;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 11%;
  right: 5%;
`;

const MobileBadge = (props) => {
  const {
    children,
    className,
    quantity = 0,
    isAvartar = false,
    handleOnClick,
    isDot = false,
    optSort = '',
    isProductPage = false,
    ...restProps
  } = props;
  const max = 100;
  if (isAvartar) {
    return (
      <Button className={className} onClick={handleOnClick} {...restProps}>
        {children}
      </Button>
    );
  }
  if (isDot) {
    return (
      <Button className={className} onClick={handleOnClick} {...restProps}>
        {children}
        {optSort && optSort !== '' && <Dots />}
      </Button>
    );
  }
  return (
    <Button className={className} onClick={handleOnClick} {...restProps}>
      {children}
      {quantity > 0 ? (
        <CustomQuantity quantity={quantity} max={max} isProductPage={isProductPage}>
          {quantity >= max ? '99+' : quantity}
        </CustomQuantity>
      ) : (
        ''
      )}
    </Button>
  );
};

const StyledBadge = styled(MobileBadge)`
  &.MuiButtonBase-root {
    min-width: 48px;
  }
  &.Mui-disabled {
    opacity: 0.7;
  }
`;

export default React.memo(StyledBadge);
