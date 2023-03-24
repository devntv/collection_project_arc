import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { PASSWORD_SECURITY_WARNING } from 'constants/data';
import styles from './styles.module.css';

function PasswordWarningText({ className }) {
  return <Typography className={clsx(styles.text_warning, className && className)}>{PASSWORD_SECURITY_WARNING}</Typography>;
}

export default PasswordWarningText;
