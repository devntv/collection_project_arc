import { Box, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import InfoTabsV2 from 'components-v2/mocules/InfoTabsV2';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import { MY_ORDER_URL } from 'constants/Paths';
import { useRouter } from 'next/router';
import deviceUtils from 'utils/deviceUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const useStyles = makeStyles(() => ({
  tabRoot: {
    width: '100%',
    height: '40px!important',
    padding: '0',
    minHeight: '40px!important',
  },
  tabSelected: {
    color: '#00b46e',
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'inherit',
    display: 'flex',
    padding: '36px 0',
    justifyContent: 'space-between',
  },
  tabs: {
    width: '35%',
  },
  indicator: {
    display: 'none',
  },
  tabWrapper: {
    '& > span': {
      display: 'flex',
      flexDirection: 'row!important',
      justifyContent: 'flex-start',
      height: '40px',

      '& > svg': {
        marginRight: '10px',
      },
    },
    textTransform: 'none!important',
  },
}));

export default function InfoContainer({ children, value, title, subTitle, balance, name, isMobile }) {
  const classes = useStyles();
  const router = useRouter();
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const isTablet = deviceUtils.isTablet();
  const isDeviceMobile = isTablet || isMobile;
  const { query = {} } = router;
  let defaultBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: subTitle, url: router.pathname },
  ];

  if (router?.pathname === '/my-order/[id]') {
    defaultBreadscrumbs = [
      { name: 'Trang chủ', url: '/' },
      { name: 'Danh sách đơn hàng', url: MY_ORDER_URL },
      { name: `Chi tiết đơn hàng #${query?.id}`, url: router.asPath },
    ];
  }

  return (
    <>
      {!isMobileV2 && (
        <Box className={styles.wrapDirect}>
          <Breadcrumbs breadcrumbs={defaultBreadscrumbs} />
        </Box>
      )}
      <div className={clsx(classes.root, styles.root_mobile, isMobile ? styles.mobile_view : '')}>
        {!isMobile &&  <InfoTabsV2 value={value} balance={balance} name={name} isMobile={isMobile} />}
        <div className={styles.full_width}>
          {!isMobile && !isMobileV2 && (
            <Grid item xs={12} style={{ display: title ? 'block' : 'none' }}>
              <div className={styles.title}>{title}</div>
            </Grid>
          )}
          <Grid className={styles.full_width_mb} container direction="column" value={value} style={{ overflow: isDeviceMobile ? 'hidden' : 'unset' }}>
            {children}
          </Grid>
        </div>
      </div>
    </>
  );
}
