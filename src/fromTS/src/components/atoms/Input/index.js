import { OutlinedInput } from '@material-ui/core';
import React, { forwardRef, memo } from 'react';
import styled from 'styled-components';

const InputCustom = memo(
  forwardRef((props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <OutlinedInput ref={ref} className={className} {...rest}>
        {children}
      </OutlinedInput>
    );
  }),
);

const Input = styled(InputCustom)`
  padding: 0.25rem;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 0.25rem;
  margin: 1rem 1rem 1rem 0rem;
  height: 50px;
  width: 100%;
  border: none;

  // .MuiOutlinedInput-notchedOutline {
  //   border: 4px solid #20c997 !important;
  //   border-radius: 0.25rem !important;
  // }

  .MuiOutlinedInput-root .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 4px solid #20c997 !important;
    border-radius: 0.25rem !important;
  }

  &.input__info {
    height: 2.24em !important;
    margin-bottom: 0 !important;

    & .MuiInputBase-input {
      border-radius: 4px;
      background-color: white;
      border-color: #ced4da !important;
      font-size: 16px;
      padding: 10px 0 10px 12px;
      height: 100%;
    }

    & .MuiInputBase-adornedEnd {
      padding-right: 0 !important;
    }

    & .Mui-disabled {
      box-shadow: none !important;
      border: none !important;
    }
  }
`;

export default React.memo(Input);
