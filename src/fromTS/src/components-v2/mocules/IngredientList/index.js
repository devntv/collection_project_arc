import React from 'react';
import Link from 'next/link';
import { Grid, Box, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const IngredientList = ({ ingredients = [], text = '', word, defaultValue }) => {
  const listIngredients = ingredients.map((val) => (
    <Grid className={styles.item} item xs={6} md={3} key={`ingredients-${uuidv4()}`}>
      <Link href={`ingredients/${val.slug}`} prefetch={false}>
        <Box className={styles.ingredient}> {val?.name} </Box>
      </Link>
    </Grid>
  ));
  return (
    <Box>
      <Box className={styles.total}>
        <Box display="inline" className={styles.value}>
          {/* Hiển thị <span style={{ fontWeight: '600' }}>{ingredients.length}</span> kết quả tìm kiếm cho{' '} */}
          {text === '' && word === '' ? (
            'Vui lòng nhập hoặc chọn từ khóa để tìm kiếm '
          ) : (
            <Typography display="inline" className={styles.value}>
              Hiển thị <span style={{ fontWeight: '600' }}>{ingredients.length}</span> kết quả tìm kiếm cho&nbsp;
            </Typography>
          )}
        </Box>
        <Typography display="inline" className={styles.value}>
          {/* {text === defaultValue ? 'tất cả ' : text}
          {word === defaultValue ? '' : word} */}
          {text === '' || (text === defaultValue && word === defaultValue) ? 'tất cả hoạt chất' : word || text}
        </Typography>
      </Box>
      <Grid container className={styles.container} spacing={2}>
        {listIngredients}
      </Grid>
    </Box>
  );
};

export default IngredientList;
