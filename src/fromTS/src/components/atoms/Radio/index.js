import React from 'react';
import { Radio } from '@material-ui/core';
import styled from 'styled-components';

const RadioEle = React.memo((props) => {
  const { className } = props;
  return <Radio className={className} {...props} />;
});

const styledRadio = styled(RadioEle)`
  color: green[400];
`;

export default React.memo(styledRadio);
