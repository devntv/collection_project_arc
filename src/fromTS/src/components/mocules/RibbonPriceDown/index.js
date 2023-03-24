import React from 'react';
import { Ribbon } from 'components/atoms';
import { RIBBON_STATUS } from 'constants/Enums';

const RibbonPriceDown = (props) => (
  <Ribbon status={RIBBON_STATUS.DOWN} {...props} />
);

export default RibbonPriceDown;
