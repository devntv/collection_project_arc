import { getFirst } from 'clients';
import BottomDrawerMV2 from 'components-v2/atoms/Mobile/BottomDrawer';
import RewardItemDetail from 'components/mocules/RewardItem/indexDetail';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { RewardsService } from 'services';
import styles from './styles.module.css';

const DetailProgram = ({ isShow, handleClose, idProgram }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await RewardsService.getRewardDetailById(idProgram);
      setData(getFirst(result));
      setLoading(false);
    })();
  }, [idProgram]);

  return (
    <BottomDrawerMV2 containerClass={styles.containerDrawer} isShow={isShow} handleClose={handleClose}>
      {data && !loading && <RewardItemDetail arrow reward={data} isMobile={isMobile} />}
    </BottomDrawerMV2>
  );
};

export default memo(DetailProgram);
