import { Button } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo } from 'react';
import styles from './styles.module.css';

const NewMinusButton = memo(({ className, ...restProps }) => (
  <>
    <Button {...restProps} classes={{ root: clsx(styles.buttons, styles.button_root_minus) }} className={clsx(styles.button_minus, className)}>
      -
    </Button>
  </>
));

export default NewMinusButton;
