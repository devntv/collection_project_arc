import { Grid, Paper, Typography } from '@material-ui/core';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { useRouter } from 'next/router';
import { CustomerClient, getData, isValid } from 'clients';
import { useEffect, useState } from 'react';
import { FormatNumber } from 'utils';
import HeadingRight from './HeadingRight';
import styles from './styles.module.css';

const HeadingLoyaltyV2 = ({ point = 0, levelDatas, customerDatas, isMobile }) => {
  const router = useRouter();
  // console.log(point);
  // console.log(loyaltys);
  // const { point } = customerDatas || 0;

  const [expiredPoint, setExpiredPoint] = useState(0);

  const gotoExchangePage = () => {
    router.push('/users/exchange-loyalty');
  };

  const loadData = async () => {
    const q = JSON.stringify({
      timeFrom: new Date('December 01, 2022 00:00:00'),
      timeTo: new Date('December 31, 2022 23:59:00'),
    });
    const result = await CustomerClient.getAllListHistoryLoyalty({ q });
    if (isValid(result)) {
      const data = getData(result);
      let pointReceived = 0;
      data.forEach((ele) => {
        if (ele?.point > 0) pointReceived += ele.point;
      });
      setExpiredPoint((point - pointReceived).toFixed(2));
    }
  };
  const year = new Date().getFullYear();

  useEffect(() => {
    if (year < 2023) loadData();
  }, []);

  return (
    <Grid item container spacing={2} style={{ marginBottom: '1px' }}>
      <Grid item md={5} xs={12}>
        <Paper className={styles.headingLeft}>
          <Typography>Điểm tích lũy</Typography>

          <Grid item className={styles.wrapInfoPoint}>
            <Typography className={styles.currPoint}>
              <span>{FormatNumber.formatFloatNumber(point)}</span> điểm
            </Typography>
            {/* hard code -> ngày cuối cùng của năm -> hối user sử dụng điểm */}
            <Typography>{expiredPoint > 0 ? `${FormatNumber.formatFloatNumber(expiredPoint)} điểm sẽ hết hạn vào 31/12/2022` : ''}</Typography>
          </Grid>

          <Grid item className={styles.wrapBtnGotoExchange}>
            <ButtonV2 onClick={gotoExchangePage}>Đổi điểm ngay</ButtonV2>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={7} xs={12}>
        <HeadingRight customerDatas={customerDatas} levelDatas={levelDatas} isMobile={isMobile} />
      </Grid>
    </Grid>
  );
};

export default HeadingLoyaltyV2;
