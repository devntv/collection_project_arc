import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import styles from './styles.module.css';

const ProductCardVertical = () => (
  <Box className={styles.root}>
    <Skeleton variant="rect" height={120} />
    <Skeleton variant="rect" height={13} style={{ marginTop: 6, borderRadius: 3, marginRight: 50 }} />
    <Skeleton variant="rect" height={26} style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={12} width="40%" style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={12} width="60%" style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={12} width="60%" style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={13} style={{ marginTop: 6, borderRadius: 3 }} />
    <Box>
      <Skeleton variant="rect" height={13} width="40%" style={{ marginTop: 6, borderRadius: 3 }} />
      <Skeleton variant="rect" height={13} style={{ marginTop: 6, borderRadius: 3 }} />
    </Box>
    <Skeleton variant="rect" height={17} width="40%" style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={20} style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={16} style={{ marginTop: 6, borderRadius: 3 }} />
    <Skeleton variant="rect" height={20} style={{ marginTop: 6, borderRadius: 3 }} />
  </Box>
);

export default ProductCardVertical;
