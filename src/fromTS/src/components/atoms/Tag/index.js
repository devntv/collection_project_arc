import { Typography } from '@material-ui/core';
import React from 'react';

import styles from './style.module.css';

const Tag = ({ border, name, color, icon, date = null }) => (
  <div className={styles.tag_root} style={{ color, border }}>
    {icon}
    <Typography className={styles.text}>
      {name}
      {date && `: ${date}`}
    </Typography>
  </div>
);

export default Tag;
