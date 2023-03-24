import { Button, Grid, Typography } from '@material-ui/core';
import { getData, isValidWithoutData, TicketClient } from 'clients';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { ReturnOrderIcon } from 'constants/Images';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { ACCESS_TOKEN, RETURN_ORDER_DOMAIN, RETURN_ORDER_DOMAIN_TICKETID } from 'sysconfig';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';

function ButtonReturnOrder({ disabled, orderId, className, V2style }) {
  const router = useRouter();
  const [ticketReturn, setTicketReturn] = React.useState([]);
  const token = Cookies.get(ACCESS_TOKEN);
  const returnOrderRes = React.useCallback(async () => {
    const res = await TicketClient.getTicketReturn(orderId);
    setTicketReturn(getData(res));
  }, [orderId]);

  React.useEffect(() => {
    returnOrderRes();
  }, []);
  const handleRedirectPOS = async () => {
    const statusRes = await TicketClient.getVerifyTickerReturn(orderId);
    if (isValidWithoutData(statusRes)) {
      router.push(`${RETURN_ORDER_DOMAIN}?token=${token}&orderId=${orderId}`);
    } else {
      NotifyUtils.error('Bạn đã nhập kho đơn hàng thành công nên không thể tạo yêu cầu. Vui lòng liên hệ CS để được hỗ trợ!');
    }
  };

  return (
    <Grid className={styles.wrapBtn}>
      {ticketReturn.length > 0 ? (
        ticketReturn?.map(({ code, ticketId }) => (
          <Grid container alignItems="center" key={code} justifyContent="center" className={clsx(styles.wrapTicketId, className)}>
            <Typography className={styles.ticketCode}>Phiếu yêu cầu trả:</Typography>
            <LinkComp
              style={{ color: '#2360d8', cursor: 'pointer', fontSize: '16px' }}
              href={`${RETURN_ORDER_DOMAIN_TICKETID}?ticketId=${ticketId}&token=${token}`}
              aria-hidden="true"
              className={styles.redirectLink}
            >
              {ticketId}
            </LinkComp>
          </Grid>
        ))
      ) : (
        <Button
          style={{ display: V2style ? 'none' : '' }}
          disabled={disabled}
          onClick={handleRedirectPOS}
          startIcon={<Image src={ReturnOrderIcon} width={29} height={29} />}
          className={styles.btnReturn}
        >
          Yêu cầu trả
        </Button>
      )}
    </Grid>
  );
}

export default ButtonReturnOrder;
