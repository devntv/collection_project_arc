import { Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import RewardItem from 'components/mocules/RewardItem';
import InfoContainer from 'components/organisms/InfoContainer';
import { GARMINICATION_STATUS } from 'constants/Enums';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styles from './styles.module.css';

const RewardPCScreen = ({ limit, status, user, listReward, pageSize, numberByStatus, isMobile }) => {
  const router = useRouter();
  const { offset = 0 } = router?.query || {};
  // eslint-disable-next-line no-unused-vars
  const [numPage, setNumpage] = useState((+offset + limit) / limit);
  const handleChangeOrderStatus = (statusR) => {
    router.push({
      pathname: router.pathname,
      query: {
        status: statusR,
      },
    });
    setNumpage(1);
  };

  const handleChangePage = (_, page) => {
    const offsetByPage = (page - 1) * limit;
    setNumpage(page);
    router.push({
      pathname: router.pathname,
      query: {
        offset: offsetByPage,
        limit,
        status,
      },
    });
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <InfoContainer value={13} subTitle="Chương trình trả thưởng" name={user?.name}>
          <Box style={{ width: '100%' }}>
            <Paper className={styles.header}>
              <Typography variant="h5" className={styles.title}>
                Chương trình trả thưởng
              </Typography>
              <Box className={styles.groupBtn}>
                {GARMINICATION_STATUS &&
                  GARMINICATION_STATUS.map(({ label, value }) => (
                    <Button
                      key={uuidV4()}
                      className={status === value ? clsx(styles.btnActive, styles.btn) : styles.btn}
                      onClick={() => handleChangeOrderStatus(value)}
                    >
                      {`${label} (${numberByStatus[value]})`}
                    </Button>
                  ))}
              </Box>
            </Paper>
            {listReward.length > 0 ? (
              listReward.map((item) => <RewardItem key={uuidV4()} reward={item} isMobile={isMobile} />)
            ) : (
              <Typography style={{ marginTop: '20px' }}>Danh sách rỗng</Typography>
            )}
            {listReward.length > 0 && (
              <Grid item xs={12}>
                <div className={styles.justify_center}>
                  <Pagination defaultPage={numPage} count={pageSize} onChange={handleChangePage} page={numPage} />
                </div>
              </Grid>
            )}
          </Box>
        </InfoContainer>
      </Container>
    </div>
  );
};

export default RewardPCScreen;
