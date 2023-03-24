import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { formatNumber } from 'utils/FormatNumber';
import styles from './styles.module.css';

export default function BlockTitle({ icon, title, total, totalTitle, loading, ...rest }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} {...rest}>
      {loading ? (
        <Box className={styles.titleWrapper}>
          <Skeleton width={200} height={50} />
        </Box>
      ) : (
        <>
          <Box className={styles.titleWrapper}>
            <span>{icon}</span>
            <Typography className={styles.title} style={{ marginLeft: icon ? '12px' : '0' }}>
              {title}
            </Typography>
          </Box>

          {total && (
            <span className={styles.total}>
              {formatNumber(total)} {totalTitle}
            </span>
          )}
        </>
      )}
    </div>
  );
}
