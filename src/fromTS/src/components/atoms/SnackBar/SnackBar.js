import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const CustomSnackBar = React.memo((props) => {
  const {
    alertType = 'success',
    className,
    onClose,
    children,
    autoHideDuration = 3000,
    vertical = 'top',
    horizontal = 'right',
    // TransitionComponent = 'GrowTransition',
    variant = 'filled',
    ...rest
  } = props;

  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      className={className}
      {...rest}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
      // TransitionComponent={TransitionComponent}
    >
      <Alert onClose={onClose} variant={variant} severity={alertType}>
        {children}
      </Alert>
    </Snackbar>
  );
});

export default CustomSnackBar;
