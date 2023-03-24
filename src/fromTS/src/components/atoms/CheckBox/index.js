import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CheckBoxCustom = React.memo(
  forwardRef((props, ref) => {
    const { isChecked, name, label, className, onChange, onClick = null, ...rest } = props;
    const checkBox = <Checkbox ref={ref} checked={isChecked} name={name} onClick={onClick} onChange={onChange} {...rest} />
    return <FormControlLabel control={checkBox} className={className} label={label} {...rest} />;
  }),
);

const CheckBox = styled(CheckBoxCustom)`
  .MuiCheckbox-colorSecondary.Mui-checked {
    color: green;
  }
  input.checked {
    color: green;
  }
  input[type='checkbox']:checked {
    color: green;
    background-color: green;
  }
`;

export default React.memo(CheckBox);
