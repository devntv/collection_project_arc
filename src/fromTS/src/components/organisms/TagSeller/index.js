import { Typography } from '@material-ui/core';
import styles from './styles.module.css';

const TagSeller = ({ label }) => (
  <div className={styles.fastInvoice}>
    <Typography className={styles.tag}>{label}</Typography>
  </div>
);
export default TagSeller;
