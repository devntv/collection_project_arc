import React from 'react';
import { Input } from 'components/atoms';

const CustomInput = (props) => (
  <Input className="input__info" {...props} />
);

export default React.memo(CustomInput);
