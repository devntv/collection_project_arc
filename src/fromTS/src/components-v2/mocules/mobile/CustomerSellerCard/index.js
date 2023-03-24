import { Avatar, Box, Typography } from '@material-ui/core';
import { getLinkCacheFromGG } from 'utils/CacheImageUtils';
import styles from './styles.module.css';

const CustomerSellerCardMobile = ({ info }) => {
  const { customerName = '', avatar = [''], content = '' } = info || {};
  return (
    <Box className={styles.root_card}>
      <div className={styles.avatar_wrap}>
        <Avatar className={styles.avatar_customer} src={getLinkCacheFromGG({ src: avatar[0], width: 200 })} />
        <Typography className={styles.customer_name}>{customerName || 'Ẩn danh'}</Typography>
      </div>
      <Typography className={styles.customer_comment}>{content}</Typography>
    </Box>
  );
};

export default CustomerSellerCardMobile;
