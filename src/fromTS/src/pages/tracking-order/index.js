/* eslint-disable import/no-named-as-default-member */
import { Container, Grid, TextField, Typography } from '@material-ui/core';
import { getFirst } from 'clients';
import Button from 'components/atoms/Button';
import StatusOrder from 'components/mocules/StatusOrder';
import NewTemplate from 'components/newlayout/template';
import { doWithServerSide } from 'services';
import TrackingOrderService from 'services/TrackingOrderService';
import styled from 'styled-components';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Tra cứu thông tin vận chuyển của đơn hàng');

// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const { query } = ctx;
    const { orderCode = null } = query;
    let logsOrderResult = {};
    if (orderCode) {
      let id = 0;
      let so = null;
      if (orderCode && +orderCode > 1) {
        id = Number(orderCode);
      } else {
        so = orderCode;
      }
      logsOrderResult = await TrackingOrderService.getDataLogsOrder({ ctx, id, so });
    }
    return {
      props: {
        logsOrderResult,
        orderCode,
        SEO_CONFIG: {
          title,
        },
      },
    };
  });
}

const TrackingOrder = ({ logsOrderResult = {}, orderCode }) => {
  const order = getFirst(logsOrderResult, {});
  const { logsTpl } = order;

  const HeaderTitle = styled(Typography)`
    font-size: 24px;
    padding: 10px;
    font-weight: 700;
  `;

  const InputOrder = styled(TextField)`
    padding: 0 10px 0 0;
    font-size: 12px;
    width: 160px;
  `;

  // const InputPhoneNumber = styled(TextField)`
  //   padding: 0 10px 0 0;
  //   font-size: 12px;
  //   width: 250px;
  // `;

  const ButtonSearchOrder = styled(Button)``;

  const OrderDetailGrid = styled(Grid)`
    margin-top: 15px;
    padding: 10px;
  `;

  return (
    <NewTemplate>
      <Container maxWidth="lg" style={{ minHeight: '300px' }}>
        <Grid container>
          <Grid item md={12} xs={12}>
            <HeaderTitle className={styles.title} variant="h1">
              {title}
            </HeaderTitle>
          </Grid>
          <Grid item md={12} xs={12}>
            <form noValidate className={styles.form}>
              <OrderDetailGrid>
                <InputOrder variant="outlined" placeholder="Mã đơn hàng" id="orderCode" name="orderCode" defaultValue={orderCode} autoFocus />
                {/* <InputPhoneNumber variant="outlined" placeholder="Số điện thoại người nhận" /> */}
                <ButtonSearchOrder type="submit">Tìm kiếm</ButtonSearchOrder>
              </OrderDetailGrid>
            </form>
          </Grid>
        </Grid>
        <Grid className={styles.orderStatus} container>
          <Grid item sm={12}>
            <StatusOrder logsTpl={logsTpl} orderCode={orderCode} />
          </Grid>
        </Grid>
      </Container>
    </NewTemplate>
  );
};

export default TrackingOrder;
