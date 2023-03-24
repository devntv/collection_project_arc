import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useMobileV2 from 'zustand-lib/storeMobile';
import NewCountdownTimer from '../StyledCountdownTimer';
import styles from './styles.module.css';

export default function TitleComponent({ title, icon, dealEndDay, sellerName, sellerAvatar, isSlug = false }) {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  return (
    <>
      {sellerAvatar && sellerName && (
        <Box className={clsx(styles.wrapper_title_with_date)}>
          <Avatar alt={`Nhà bán hàng ${sellerName}`} src="/static/images/avatar/1.jpg" className={styles.avatar} />
          <Typography className={styles.title}>{sellerName}</Typography>
        </Box>
      )}
      {title && icon && (
        <Box
          className={clsx(dealEndDay ? styles.wrapper_title_with_date : styles.wrapper_titlem, {
            [styles.wrapper_titlem_mv2]: isMobileV2,
          })}
          style={isSlug ? { padding: '10px 0 6px 0' } : {}}
        >
          <Grid container className={styles.wrapper_icon_name}>
            <Grid className={clsx(isMobileV2 && styles.wrapper_icon_mv2)} item>
              {icon}
            </Grid>
            <Grid item style={{ flex: '1' }}>
              <Typography
                className={clsx(styles.title, {
                  [styles.title_mv2]: isMobileV2,
                })}
              >
                {title}
              </Typography>
            </Grid>
          </Grid>

          {dealEndDay && <NewCountdownTimer dealEndDay={dealEndDay} />}
        </Box>
      )}
    </>
  );
}
