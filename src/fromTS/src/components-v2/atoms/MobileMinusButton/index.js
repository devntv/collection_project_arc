import { IconButton } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './styles.module.css';

const MobileMinusButton = memo(({ className, rootClass, disabled, ...restProps }) => (
  <>
    <IconButton
      disabled={disabled}
      {...restProps}
      classes={{
        root: clsx(styles.mobile_button_root, styles.mobile_button_root_minus, rootClass, {
          [styles.mobile_plus_disabled]: disabled,
        }),
      }}
      className={clsx(styles.mobile_minus, className)}
    >
      <Remove className={styles.mobile_icon} />
    </IconButton>
  </>
));

export default MobileMinusButton;
