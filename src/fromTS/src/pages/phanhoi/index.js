import { Container, Grid, TextField, Typography } from '@material-ui/core';
import { getData, getFirst, isValid, OrderClient, TicketClient } from 'clients';
import Button from 'components/atoms/Button';
import FormFeedback from 'components/mocules/FormFeedback';
import NewTemplate from 'components/newlayout/template';
import { EnumsTicket } from 'constants/Enums';
import { doWithServerSide } from 'services';
import styled from 'styled-components';
import styles from './styles.module.css';

const title = 'Phản hồi về đơn hàng';

// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const { id = null } = ctx.query;
    let order = {};
    let reasonsList = [];
    if (id) {
      const [orderRes, reasonsRes] = await Promise.all([
        OrderClient.getOrderByIdWithoutLogin({ ctx, id }),
        TicketClient.getListReasonsWithoutLogin(ctx),
      ]);

      const orderInfo = getFirst(orderRes);
      if (orderInfo) {
        order = {
          isValid: isValid(orderRes),
          orderCode: orderInfo.orderCode,
          orderId: orderInfo.orderId,
          createdTime: orderInfo.createdTime,
          status: orderInfo.status,
          customerCode: orderInfo.customerCode,
          customerPhoneRaw: orderInfo.customerPhone,
          customerPhone: orderInfo.customerPhone ? `*******${orderInfo.customerPhone.substr(7, 3)}` : '',
        };
      }
      reasonsList = getData(reasonsRes)?.filter((item) => item.ticketType === EnumsTicket.TicketEnums.ORDER);
    }

    return {
      props: {
        id,
        order,
        reasonsList,
        SEO_CONFIG: {
          title,
        },
      },
    };
  });
}

const PagePhanHoi = ({ id, order, reasonsList }) => {
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

  const ButtonSearchOrder = styled(Button)``;

  const OrderDetailGrid = styled(Grid)`
    margin-top: 15px;
    padding: 10px;
  `;

  return (
    <NewTemplate>
      <Container maxWidth="lg" style={{ minHeight: '300px' }}>
        <Grid container className={styles.container}>
          <Grid item md={12} xs={12}>
            <HeaderTitle className={styles.title} variant="h1">
              {title}
            </HeaderTitle>
          </Grid>
          <Grid item md={12} xs={12}>
            <form noValidate className={styles.form}>
              <OrderDetailGrid>
                <InputOrder variant="outlined" placeholder="Mã đơn hàng" id="id" name="id" defaultValue={id} autoFocus />
                <ButtonSearchOrder type="submit">Tìm kiếm</ButtonSearchOrder>
              </OrderDetailGrid>
            </form>
          </Grid>
        </Grid>
        <Grid className={styles.orderStatus} container>
          <Grid item sm={12}>
            <FormFeedback reasonsList={reasonsList} order={order} id={id} />
          </Grid>
        </Grid>
      </Container>
    </NewTemplate>
  );
};

export default PagePhanHoi;
