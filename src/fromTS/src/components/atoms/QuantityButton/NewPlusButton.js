import { Button } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo } from 'react';
import styles from './styles.module.css';

const NewPlusButton = memo(({ className, disabled, ...restProps }) => (
  <>
    <Button
      {...restProps}
      disabled={disabled}
      classes={{
        root: clsx(styles.buttons, disabled ? (styles.plus_disabled, styles.button_plus) : styles.button_plus, className),
      }}
    >
      +
    </Button>
  </>
));

export default NewPlusButton;
