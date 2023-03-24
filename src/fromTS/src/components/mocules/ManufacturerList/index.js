import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const ManufacturerList = ({ manufacturers = [], text = '' }) => (
  <div>
    <div className={styles.total}>
      <i>Hiển thị {manufacturers.length} kết quả tìm kiếm cho</i>
      <strong> {text === '' ? 'Tất cả' : text} </strong>
    </div>
    <Grid container className={styles.container} spacing={2}>
      {manufacturers.map((val) => (
        <Grid item xs={3} key={uuidv4()}>
          <Link href={`manufacturers/${val.slug}`} prefetch={false}>
            <div className={styles.manufacturer}> {val?.name} </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default ManufacturerList;
