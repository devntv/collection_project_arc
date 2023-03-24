import { Container } from '@material-ui/core';
import { getData, getFirst, isValid, LIMIT_DEFAULT, OFFSET_DEFAULT, TicketClient } from 'clients';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import TicketList from 'components/organisms/TicketList';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services/SsrService';
import TicketService from 'services/TicketService';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Danh sách phản hồi');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT, fromTime = null, toTime = null, id = null } = ctx.query;
      const result = await TicketService.getListTicket({ ctx, offset, limit, createdFrom: fromTime, createdTo: toTime });
      let ticketList = [];
      let total = 0;
      if (isValid(result)) {
        ticketList = getData(result);
        total = result.total;
      }
      let ticketSelected = null;
      if (id) {
        const ticketDetailRes = await TicketClient.getDetailTicket({ ctx, ticketId: id });
        if (isValid(ticketDetailRes)) {
          ticketSelected = getFirst(ticketDetailRes);
        }
      }

      return {
        props: {
          offset,
          limit,
          ticketList,
          total,
          pageSize: Math.ceil(result.total / limit),
          filter: {
            fromTime,
            toTime,
          },
          id,
          ticketSelected,
          page: offset / limit + 1,
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const MyTicket = ({ user, isMobile, ...props }) => (
  <Template isMobile={isMobile}>
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <InfoContainer value={7} title="Danh sách phản hồi" subTitle="Phản hồi của tôi" name={user?.name}>
          <TicketList {...props} user={user} />
        </InfoContainer>
      </Container>
    </div>
  </Template>
);
export default withLogin(MyTicket);
