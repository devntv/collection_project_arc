import { Avatar, Box, Card, Typography } from '@material-ui/core';
import { getLinkCacheFromGG } from 'utils/CacheImageUtils';
import styles from './styles.module.css';

const CustomerSellerCard = ({ info }) => {
  // nếu avatar null thì sao
  const { customerName = '', avatar = [''], content = '' } = info || {};
  return (
    <Box md={4} className={styles.root_card}>
      <div className={styles.avatarWrap}>
        <Avatar className={styles.avatarCustomer} src={getLinkCacheFromGG({ src: avatar[0], width: 200 })} />
      </div>
      <Card className={styles.card}>
        <Typography className={styles.customerName}>{customerName || 'Ẩn danh'}</Typography>
        <Typography style={{ fontSize: '14px', marginTop: '20px', height: '100%' }}>{content}</Typography>
      </Card>
    </Box>
  );
};

export default CustomerSellerCard;
