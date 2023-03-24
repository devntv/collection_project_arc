import { Box, Grid, Typography } from '@material-ui/core';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import InputV2 from 'components-v2/atoms/InputV2';
import { PATH_INFO_BILL } from 'constants/Paths';
import React from 'react';
import styles from './styles.module.css';

function OrderTop() {
  return (
    <Grid item xs={12} key="order-info-1" container className={styles.wrapTopBox}>
      <Grid item xs={12} sm={6} className={styles.myOrder}>
        <Typography>Đơn Hàng của tôi</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className={styles.infoOrderRed}>
          <Typography> Xem thông tin xuất hoá đơn đỏ &nbsp;</Typography>
          <a href={PATH_INFO_BILL}>tại đây</a>
        </Box>
      </Grid>

      <Grid item xs={12} container style={{ marginTop: '10px' }} direction="row" className={styles.wrapBottomBox}>
        <Grid container item alignItems="center" className={styles.wrapCodeOrder}>
          <Typography className={styles.codeOrder}>mã đơn</Typography>
          <InputV2 placeholder="nhập mã đơn" className={styles.StyleInputV2} />
        </Grid>
        <Box style={{ margin: '0px 4px' }} className={styles.or}>
          Hoặc
        </Box>
        <Grid container item alignItems="center" style={{ maxWidth: '170px' }}>
          <Typography className={styles.from}>Từ</Typography>
          <InputV2 dateTime />
        </Grid>
        <Grid container item alignItems="center" style={{ maxWidth: '170px' }}>
          <Typography className={styles.from}>đến</Typography>
          <InputV2 dateTime />
        </Grid>
        <Box className={styles.or} style={{ margin: '0px 4px' }}>
          Hoặc
        </Box>
        <Grid container item alignItems="center" className={styles.wrapSearchNameOrder}>
          <Typography className={styles.from}>tìm</Typography>
          <InputV2 placeholder="tên sản phẩm" className={styles.StyleInputV2} />
        </Grid>
        <Grid item lg={2}>
          <ButtonV2 className={styles.BtnSearch}>Tìm kiếm</ButtonV2>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OrderTop;
