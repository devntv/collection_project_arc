import { Box } from '@material-ui/core';
import { PHONEFRAME } from 'constants/Images';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from '../styles.module.css';

const RightFooter = () => (
  <Box style={{ float: 'right' }} className={styles.phoneFrame}>
    <ImageFallbackStatic src={PHONEFRAME} width="150.71" height="304.17" alt="phone frame" />
  </Box>
);
export default RightFooter;
