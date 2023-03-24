import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import clsx from 'clsx';
import styles from './styles.module.css';

const PlusButton = memo(({ className, disabled, ...restProps }) => (
  <>
    <IconButton
      {...restProps}
      disabled={disabled}
      classes={{
        root: clsx(styles.button_root, disabled ? styles.plus_disabled : styles.plus, className),
      }}
    >
      <Add className={styles.icon} />
    </IconButton>
  </>
));

export default PlusButton;
