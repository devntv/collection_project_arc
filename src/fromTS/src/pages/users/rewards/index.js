import { OFFSET_DEFAULT } from 'clients';
import RewardsMobileScreen from 'components-v2/organisms/pages/rewards/MobileScreen';
import RewardPCScreen from 'components-v2/organisms/pages/rewards/PCScreen';
import Template from 'components/layout/Template';
import { ENUM_GARMINICATION } from 'constants/Enums';
import { withLogin } from 'HOC';
import { doWithServerSide, RewardsService } from 'services';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = getTitle('Chương trình trả thưởng');

// TODO: translate
export async function getServerSideProps(ctx) {
  const {
    status = ENUM_GARMINICATION.ALL,
    offset = OFFSET_DEFAULT,
    limit = 20,
    // q = status !== ENUM_GARMINICATION.ALL ? JSON.stringify({ status }) : null,
  } = ctx.query;
  if (status !== ENUM_GARMINICATION.ALL) ctx.query.q = JSON.stringify({ status });
  return doWithServerSide(ctx, async () => {
    const rewards = await RewardsService.getListReward({ ctx, offset, limit, status });
    const numberByStatus = await RewardsService.getNumberOfEveryStatus({ ctx });
    const { data = [] } = rewards || {};
    return {
      props: {
        status,
        listReward: status !== ENUM_GARMINICATION.ALL ? data.filter((item) => item?.status === status) : data,
        pageSize: Math.ceil(numberByStatus[status] / limit),
        numberByStatus,
        SEO_CONFIG: {
          title,
        },
      },
    };
  });
}
const limit = 20;
const Rewards = ({ user, isMobile, status, listReward, pageSize, numberByStatus }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  return (
    <Template isMobile={isMobile} showTopSearchMV2>
      {isMobileV2 ? (
        <RewardsMobileScreen />
      ) : (
        <RewardPCScreen
          limit={limit}
          status={status}
          user={user}
          listReward={listReward}
          pageSize={pageSize}
          numberByStatus={numberByStatus}
          isMobile={isMobile}
        />
      )}
    </Template>
  );
};
export default withLogin(Rewards);
