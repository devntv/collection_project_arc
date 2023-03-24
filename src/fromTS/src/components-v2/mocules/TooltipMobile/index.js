import { Tooltip, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import deviceUtils from 'utils/deviceUtils';

const CustomizeTooltip = withStyles({
  tooltip: {
    backgroundColor: '#ffffff',
    boxShadow: ' 0px 0px 6px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
    width: 'auto',
    maxWidth: '249px',
    border: '1px solid #e9e9e9',
    padding: '10px',
    color: 'black',
  },
})(Tooltip);

function TooltipMobile({ valueTitle = '', children, isMobile, classNameChildren, classNameTooltip }) {
  const isTablet = deviceUtils.isTablet();
  const isDeviceMobile = isTablet || isMobile;
  const [isHoverTooltip, setIsHoverTooltip] = React.useState(false);
  if (!children || !isDeviceMobile || !valueTitle) return null;

  return (
    <CustomizeTooltip enterTouchDelay={0} title={valueTitle} open={isHoverTooltip} placement="top" className={clsx(classNameTooltip)}>
      <div
        onClick={() => setIsHoverTooltip(true)}
        onMouseOver={() => setIsHoverTooltip(true)}
        onMouseLeave={() => setIsHoverTooltip(false)}
        onFocus={() => setIsHoverTooltip(true)}
        role="presentation"
        className={clsx(classNameChildren)}
      >
        {children}
      </div>
    </CustomizeTooltip>
  );
}

export default TooltipMobile;
