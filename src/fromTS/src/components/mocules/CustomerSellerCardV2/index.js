import { Avatar, Box } from '@material-ui/core';
import { getLinkImageStaticCache } from 'utils/CacheImageUtils';
import styles from './styles.module.css';

const CustomerSellerCardV2 = ({ info, borderAvatarColor, isMobileV2 = false }) => {
  const { customerName = '', avatar = [''], content = '' } = info || {};

  if (isMobileV2) {
    return (
      <Box md={4} className={styles.mobileRoot_card}>
        <div className={styles.mobileAvatarWrap}>
          <Avatar
            className={styles.mobileAvatarCustomer}
            src={getLinkImageStaticCache({ url: avatar[0], width: 200 })}
            style={{ border: `1px solid ${borderAvatarColor}` }}
          />
          <h3 className={styles.customerName}>{customerName || 'Ẩn danh'}</h3>
        </div>
        <div className={styles.mobileCard}>
          <p className={styles.mobileContent}>{content}</p>
        </div>
      </Box>
    );
  }
  return (
    <Box md={4} className={styles.root_card}>
      <div className={styles.avatarWrap}>
        <Avatar
          className={styles.avatarCustomer}
          src={getLinkImageStaticCache({ url: avatar[0], width: 200 })}
          style={{ border: `1px solid ${borderAvatarColor}` }}
        />
      </div>
      <div className={styles.card}>
        <h3 className={styles.customerName}>{customerName || 'Ẩn danh'}</h3>
        <p className={styles.content}>{content}</p>
      </div>
    </Box>
  );
};

export default CustomerSellerCardV2;
