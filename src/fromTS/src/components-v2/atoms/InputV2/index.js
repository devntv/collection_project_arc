import { Box, Input, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

function InputV2({ className, classNameDate, value, dateTime = false, type = 'search', ...restProps }) {
  return (
    <Box className={clsx(styles.wrapInput, className)}>
      {!dateTime ? (
        <Input
          value={value}
          {...restProps}
          classes={{
            root: styles.root_input,
          }}
          inputProps={{ type }}
        />
      ) : (
        <TextField
          id="date"
          type="date"
          className={clsx(styles.styleDateTime, classNameDate)}
          InputLabelProps={{
            shrink: true,
          }}
          classes={{
            root: styles.root_input,
          }}
          {...restProps}
        />
      )}
    </Box>
  );
}

export default React.memo(InputV2);
