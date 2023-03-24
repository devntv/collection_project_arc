import React from 'react';
import { LineItemSkeleton } from 'components/mocules';
import { Grid } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';

const GridLineItem = ({ counts = [] }) => {
  const rows = [];
  for (let i = 0; i < counts; i += 1) {
    rows.push(<LineItemSkeleton className={styles.item} key={uuidv4()} item />);
  }
  return (
    <Grid item className={styles.root} xs={12}>
      {rows}
    </Grid>
  );
};

export default GridLineItem;
