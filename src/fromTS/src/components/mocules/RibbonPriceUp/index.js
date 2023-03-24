import React from 'react';
import { Ribbon } from 'components/atoms';
import { RIBBON_STATUS } from 'constants/Enums';

const RibbonPriceUp = (props) => (
  <Ribbon status={RIBBON_STATUS.UP} {...props} />
);

export default RibbonPriceUp;
