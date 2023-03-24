import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import clsx from 'clsx';

import styles from './styles.module.css';

const MinusButton = memo(({ className, ...restProps }) => (
  <>
    <IconButton
      {...restProps}
      classes={{ root: clsx(styles.button_root, styles.button_root_minus) }}
      className={clsx(styles.minus, className)}
    >
      <Remove className={styles.icon} />
    </IconButton>
  </>
));

export default MinusButton;
