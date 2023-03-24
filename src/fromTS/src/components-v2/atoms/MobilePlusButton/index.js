import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './styles.module.css';

const MobilePlusButton = memo(({ className, rootClass, disabled, ...restProps }) => (
  <>
    <IconButton
      {...restProps}
      disabled={disabled}
      classes={{
        root: clsx(styles.mobile_button_root, rootClass, disabled ? styles.mobile_plus_disabled : styles.mobile_plus, className),
      }}
    >
      <Add className={styles.mobile_icon} />
    </IconButton>
  </>
));

export default MobilePlusButton;
