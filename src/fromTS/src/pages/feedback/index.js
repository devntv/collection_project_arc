import { Container, Grid, Typography } from '@material-ui/core';
import { getData, TicketClient } from 'clients';
import FormFeedbackAccount from 'components/mocules/FormFeedbackAccount';
import NewTemplate from 'components/newlayout/template';
import { BRAND_NAME, EnumsTicket } from 'constants/Enums';
import { doWithServerSide } from 'services';
import styled from 'styled-components';
import styles from './styles.module.css';

const title = `Xin chào, ${BRAND_NAME} có thể giúp gì cho bạn?`;

// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    let reasonsList = [];
    const [reasonsRes] = await Promise.all([TicketClient.getListReasonsWithoutLogin(ctx)]);

    reasonsList = getData(reasonsRes)?.filter((item) => item.ticketType === EnumsTicket.TicketEnums.ACCOUNT);

    return {
      props: {
        reasonsList,
        SEO_CONFIG: {
          title,
        },
      },
    };
  });
}

const PageFeedback = ({ reasonsList }) => {
  const HeaderTitle = styled(Typography)`
    font-size: 24px;
    padding: 10px;
    font-weight: 700;
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
        </Grid>
        <Grid className={styles.orderStatus} container>
          <Grid item sm={12}>
            <FormFeedbackAccount reasonsList={reasonsList} />
          </Grid>
        </Grid>
      </Container>
    </NewTemplate>
  );
};

export default PageFeedback;
