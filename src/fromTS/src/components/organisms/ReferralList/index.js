import { Button, Grid } from '@material-ui/core';
import { isValid } from 'clients';
import { Input } from 'components/atoms';
import { useCallback, useEffect, useState } from 'react';
import { CustomerService } from 'services';
import { gtag, NotifyUtils, ValidateUtils } from 'utils';
import ReferralTable from './ReferralTable';
import styles from './styles.module.css';

const ReferralList = () => {
  const [phoneNumber, setPhone] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [page] = useState(1);
  const [size] = useState(1000);

  const loadData = useCallback(async () => {
    const [referralsRes] = await Promise.all([CustomerService.getReferralList({ offset: (page - 1) * size, limit: size })]);
    if (isValid(referralsRes)) {
      setReferrals(referralsRes.data);
    } else {
      setReferrals([]);
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const handleSendSMS = async () => {
    try {
      if (ValidateUtils.isEmpty(phoneNumber)) throw Error('số điện thoại không đươc rỗng');
      if (!ValidateUtils.validatePhone(phoneNumber)) throw Error('số điện thoại sai định dạng');
      const res = await CustomerService.sendSms({ phoneNumber });
      if (isValid(res)) {
        NotifyUtils.success('Gửi SMS giới thiệu thành công');
        loadData();
      } else {
        NotifyUtils.error(`Gửi sms không thành công: ${res.message}`);
      }
      gtag.referral();
    } catch (error) {
      NotifyUtils.error(error?.message || 'Gửi SMS không thành công');
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
    <Grid item container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={4}>
            <Input
              placeholder="Nhập số điện thoại bạn bè"
              className={styles.input}
              value={phoneNumber}
              onKeyDown={(e) => e.key === 'Enter' && handleSendSMS()}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item className={styles.button_container}>
            <Button className={styles.button} onClick={handleSendSMS}>
              Gửi SMS giới thiệu
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <ReferralTable referrals={referrals} handleRetrySms={handleRetrySms} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReferralList;
