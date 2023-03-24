import React from 'react';
import clsx from 'clsx';
import { RIBBON_STATUS } from 'constants/Enums';
import styles from './styles.module.css';

const Ribbon = ({ status = RIBBON_STATUS.UP, percent = '63' }) => (
  <div className={clsx(styles.ribbon, styles[`price_${status}`])}>
    <span className={clsx(styles.ribbon_percent, styles[`price_${status}`])}>{percent}%</span>
    <span className={styles.ribbon_status}>{status === RIBBON_STATUS.UP ? 'Tăng' : 'Giảm'}</span>
  </div>
);

export default Ribbon;
