import { Box, Grid } from '@material-ui/core';
import { isValid } from 'clients';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import InputV2 from 'components-v2/atoms/InputV2';
import PaginationV2 from 'components-v2/mocules/PaginationV2';
import { PAGE_SIZE } from 'constants/data';
import { useRouter } from 'next/router';
import React from 'react';
import { CustomerService } from 'services';
import { gtag, NotifyUtils, ValidateUtils } from 'utils';
import ReferralTableV2 from './ReferralTableV2';
import styles from './styles.module.css';

function ReferralListV2({ isMobile }) {
  const [phoneNumber, setPhone] = React.useState('');
  const [referrals, setReferrals] = React.useState([]);
  const [page] = React.useState(1);
  const [size] = React.useState(1000);
  // pagination
  const [pageSize, setPageSize] = React.useState(1);
  const [referalPerpage, setReferalPerPage] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageScroll = React.useRef(null);
  const router = useRouter();
  const loadData = React.useCallback(async () => {
    const [referralsRes] = await Promise.all([CustomerService.getReferralList({ offset: (page - 1) * size, limit: size })]);
    if (isValid(referralsRes)) {
      setReferrals(referralsRes.data);
    } else {
      setReferrals([]);
    }
  }, [page, size]);

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    const totalPage = Math.ceil(referrals?.length / PAGE_SIZE) || 1;
    const referralLastPage = currentPage * PAGE_SIZE;
    const referalFirstPage = referralLastPage - PAGE_SIZE;
    const data = referrals?.slice(referalFirstPage, referralLastPage);
    setPageSize(totalPage);
    setReferalPerPage(data);
  }, [referrals, currentPage]);

  const handlePageChange = (e, value) => {
    e.preventDefault();
    window.scrollTo({
      top: pageScroll.current.offsetTop - 100,
      left: pageScroll.current.offsetTop - 100,
      behavior: 'smooth',
    });
    router.replace(
      {
        pathname: router.pathname,
        query: { page: value },
      },
      undefined,
      { scroll: false },
    );
    setCurrentPage(+value);
  };

  const handleSendSMS = async () => {
    try {
      if (ValidateUtils.isEmpty(phoneNumber)) throw Error('Bạn chưa nhập số điện thoại');
      if (!ValidateUtils.validatePhone(phoneNumber)) throw Error('Số điện thoại vừa nhập sai định dạng');
      const res = await CustomerService.sendSms({ phoneNumber });
      if (isValid(res)) {
        NotifyUtils.success('Gửi SMS giới thiệu thành công');
        setPhone('');
        loadData();
      } else {
        NotifyUtils.error(`Gửi sms không thành công: ${res.message}`);
        setPhone('');
      }
      gtag.referral();
    } catch (error) {
      NotifyUtils.error(error?.message || 'Gửi SMS không thành công');
      setPhone('');
    }
  };

  const handleRetrySms = async ({ code }) => {
    const res = await CustomerService.retrySendSMS({ code });
    if (!isValid(res)) {
      NotifyUtils.error(`Gửi sms không thành công: ${res.message}`);
    } else {
      NotifyUtils.success('Gửi SMS giới thiệu thành công');
      loadData();
    }
    gtag.referral();
  };

  return (
    <>
      <Grid container className={styles.wrapRefer} ref={pageScroll}>
        <Grid item xs={12}>
          <Grid item xs={12} justifyContent="flex-start" container className={styles.title}>
            Giới thiệu bạn bè
          </Grid>
          <Box className={styles.wrapSend}>
            <Grid item container alignItems="center" className={styles.boxSend}>
              <Grid item lg={9} xs={12} className={styles.calcBox}>
                <InputV2
                  style={{ flex: 1 }}
                  placeholder="Nhập số điện thoại bạn bè"
                  value={phoneNumber}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendSMS()}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item lg={3} xs={12} className={clsx(styles.calcBox, isMobile && styles.wrapperBtn)}>
                <ButtonV2 onClick={handleSendSMS} btnType="success" tooltipTitle="gửi sms giới thiệu" className={styles.btnSend}>
                  Gửi sms giới thiệu
                </ButtonV2>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <ReferralTableV2 referrals={referalPerpage || referrals} handleRetrySms={handleRetrySms} />
            </Grid>
          </Grid>
          <Box className={styles.wrapPagging}>
            <PaginationV2 count={pageSize} page={Number(currentPage)} defaultPage={Number(page)} onChange={handlePageChange} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ReferralListV2;
