import React from 'react';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';

const CustomFab = ({ className, children, handleClick, disabled, ...rest }) => (
  <Fab
    className={`${className} ${disabled ? 'fab--disabled' : ''}`}
    onClick={handleClick}
    disableFocusRipple
    disableRipple
    {...rest}
  > {children}
  </Fab>
);

const StyledFab = styled(CustomFab)`
    border: 1px solid #00b46e;
    box-shadow: none;
    &.fab--disabled {
        background-color: transparent !important;
        border-color: transparent !important;
        color: #919aa3;
        pointer-events: auto !important;
        &:hover {
            cursor: pointer;
            background-color: white !important;
            color: #00b46e;
        }
    }
`;

export default React.memo(StyledFab);
