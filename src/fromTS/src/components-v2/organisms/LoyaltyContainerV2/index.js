/* eslint-disable no-unused-vars */
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LOYALTY_BTN_VIEW_MORE, VOUCHER_TITLE_TS } from 'constants/Icons';
import Link from 'next/link';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import VoucherNew from '../VoucherNew';
import styles from './styles.module.css';

const LoyaltyContainerV2 = ({ loyaltys = [] }) => {
  const [seeMore, setSeeMore] = useState(true);
  const handleChangeViewMore = () => {
    setSeeMore(!seeMore);
  };

  return (
    <Grid item container>
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '20px' }}
        className={styles.wrapLoyaltyTop}
      >
        <Grid item sm={6} xs={12} justifyContent="flex-start" className={styles.exchangeLoyalty} container>
          <Typography>Đổi điểm tích lũy</Typography>
        </Grid>
        <Grid item sm={6} xs={12} container justifyContent="flex-end" style={{ display: 'flex' }} className={styles.gotoLoyaltyPage}>
          <Link href="/users/loyalty_points" prefetch={false}>{`<< Quay lại điểm tích lũy`}</Link>
        </Grid>
      </Grid>
      <Grid container item className={styles.wrapExchangeLoyalty} style={{ display: 'flex' }} alignItems="center">
        <Grid container alignItems="center" item justifyContent="space-between" xs={12} style={{ display: 'flex' }}>
          <Grid container item sm={6} className={styles.wrapTitleLoyalty}>
            <VOUCHER_TITLE_TS />
            <Typography>Mã giảm giá từ thuốc sỉ</Typography>
          </Grid>
          <Grid container item sm={6} justifyContent="flex-end" style={{ paddingRight: '16px' }} className={styles.totalCode}>
            <Typography>{loyaltys?.length || ''} Mã giảm giá</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={styles.wrapVoucher}>
          {seeMore
            ? loyaltys && loyaltys?.slice(0, 3).map((loyalty) => <VoucherNew loyalty={loyalty} key={uuidv4()} />)
            : loyaltys?.map((loyalty) => {
                if (loyaltys === 0) {
                  return (
                    <React.Fragment key={uuidv4()}>
                      <VoucherNew loyalty={loyalty} />
                      <Grid className={styles.fakeVoucher}>
                        <VoucherNew />
                      </Grid>
                    </React.Fragment>
                  );
                }
                return <VoucherNew loyalty={loyalty} key={uuidv4()} />;
              })}
          <Grid className={styles.fakeVoucher}>
            <VoucherNew />
          </Grid>
        </Grid>

        <Grid
          container
          xs={12}
          item
          alignItems="center"
          justifyContent="center"
          style={{ cursor: 'pointer' }}
          onClick={handleChangeViewMore}
          className={clsx(!seeMore ? styles.rotateIcon : '', loyaltys?.length > 3 ? '' : styles.hiddenViewmore)}
        >
          <LOYALTY_BTN_VIEW_MORE />
          <Typography className={styles.viewMore}>{!seeMore ? 'Ẩn' : 'Xem thêm'}</Typography>
        </Grid>
      </Grid>

      {/* <LoyaltyModal open={loyaltyModalOpen} onClose={loyaltyModalToggle} loyaltys={loyaltys} point={point} handleReloadData={loadData} /> */}
    </Grid>
  );
};

export default LoyaltyContainerV2;
