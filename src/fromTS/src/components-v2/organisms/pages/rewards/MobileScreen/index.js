import { Box, Button, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import Container from 'components-v2/atoms/Mobile/Container';
import RewardItem from 'components/mocules/RewardItem';
import { ENUM_GARMINICATION, GARMINICATION_STATUS } from 'constants/Enums';
import { useCallback, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RewardsService } from 'services';
import { v4 as uuidV4 } from 'uuid';
import DetailProgram from './DetailProgram';
import styles from './styles.module.css';

const LIMIT_NUMBER = 20;

/**
 * Create page chương trình trả thưởng mobile v2
 * August 05 2022
 * APO: update sau
 */

const RewardsMobileScreen = () => {
  const [currentStatus, setCurrentStatus] = useState(ENUM_GARMINICATION.ALL);
  const [rewards, setRewards] = useState([]);
  const [countStatus, setCountStatus] = useState({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showDetailProgram, setShowDetailProgram] = useState(false);

  // state for detail program
  const [idProgram, setIdProgram] = useState(null);

  const handleChangeStatus = useCallback((status) => {
    setPage(0);
    setCurrentStatus(status);
  }, []);

  // lấy danh chương trình default là tất cả
  useEffect(() => {
    (async () => {
      setRewards([]);
      const reward = await RewardsService.getListRewardMobileV2({ offset: 0, limit: LIMIT_NUMBER, status: currentStatus });
      const { data: listReward = [] } = reward || {};

      setHasMore(listReward.length > 0);
      setRewards(listReward);
    })();
  }, [currentStatus]);

  // lấy số lượng các chương trình group by status
  useEffect(() => {
    (async () => {
      const total = await RewardsService.getNumberOfEveryStatusMobileV2();
      setCountStatus(total);
    })();
  }, []);

  // tải thêm chương trình khi scroll xuống
  useEffect(() => {
    if (page > 0) {
      // chỉ get thêm data nếu page > 0
      (async () => {
        const reward = await RewardsService.getListRewardMobileV2({ offset: page * LIMIT_NUMBER, limit: LIMIT_NUMBER, status: currentStatus });
        const { data: listReward = [] } = reward || {};
        setHasMore(listReward.length > 0);
        setRewards(prev => [...prev, ...listReward]);
      })();
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleCloseDetailProgram = useCallback(() => {
    setShowDetailProgram(false);
  }, []);

  // change id and show modal
  const handleOpenDetailProgram = (idItem) => {
    setShowDetailProgram(true);
    setIdProgram(idItem);
  };

  const renderStatusReward = () => (
    <Box className={styles.groupBtn}>
      {GARMINICATION_STATUS &&
        GARMINICATION_STATUS.map(({ label, value }) => (
          <Button
            key={uuidV4()}
            className={currentStatus === value ? clsx(styles.btnActive, styles.btn) : styles.btn}
            onClick={() => handleChangeStatus(value)}
          >
            {`${label} (${countStatus[value] ?? '-'})`}
          </Button>
        ))}
    </Box>
  );

  const Loader = () => (
    <Box style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box>
      {renderStatusReward()}
      <Container>
        <InfiniteScroll
          height={isTablet ? '90vh' : '85vh'}
          dataLength={rewards?.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={(
            <p style={{ textAlign: 'center' }}>
              <b>Bạn đã xem hết chương trình trả thưởng</b>
            </p>
          )}
        >
          {rewards?.length > 0 &&
            rewards?.map((reward) => (
              <RewardItem
                key={`reward-item-${reward?.gamificationID}`}
                reward={reward}
                isMobile={isMobile}
                handleOpenDetailProgram={handleOpenDetailProgram}
                idItem={reward?.gamificationID}
              />
            ))}
        </InfiniteScroll>
      </Container>
      {/* this is a modal to show program details */}
      <DetailProgram isShow={showDetailProgram} handleClose={handleCloseDetailProgram} idProgram={idProgram} />
    </Box>
  );
};

export default RewardsMobileScreen;
