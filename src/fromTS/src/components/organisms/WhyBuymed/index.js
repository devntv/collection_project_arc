import { Container, Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';

import styles from './style.module.css';

const WhyBuymed = () => (
  <div className={styles.why_buymed_wrapper}>
    <Container fixed>
      <Grid container>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-quality', styles.icon)} />
          </Grid>
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>SẢN PHẨM CHẤT LƯỢNG</div>
            <div style={{ fontSize: '15px', fontWeight: 400, color: '#fff', textAlign: 'center' }}>Từ nhà máy, nhà phân phối uy tín</div>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-news-professional', styles.icon)} />
          </Grid>
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>TIN TỨC CHUYÊN MÔN</div>
            <div style={{ fontSize: '15px', fontWeight: 400, color: '#fff', textAlign: 'center' }}>Cập nhật tin tức mới, và chính xác</div>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-ship-express', styles.icon)} />
          </Grid>
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>GIAO HÀNG NHANH</div>
            <div style={{ fontSize: '15px', fontWeight: 400, color: '#fff', textAlign: 'center' }}>Đảm bảo trong 36 giờ, an toàn và tin cậy</div>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-support', styles.icon)} />
          </Grid>
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>ĐỘI NGŨ CHUYÊN NGHIỆP</div>
            <div style={{ fontSize: '15px', fontWeight: 400, color: '#fff', textAlign: 'center' }}>Tư vấn miễn phí, tận tình và chu đáo</div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default React.memo(WhyBuymed);
