import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import SellerListMobile from 'components-v2/mocules/mobile/SellerList';
import NewBreadcrumbs from 'components/mocules/Breadcrumbs';
import { formatNumber } from 'utils/FormatNumber';
import styles from './styles.module.css';

const SellerContainerMobile = ({ sellers, total, search, title, loading = false, breadcrumbs = [] }) => (
  <Grid container spacing={2}>
    <Grid container item>
      <NewBreadcrumbs breadcrumbs={breadcrumbs} />
      <Grid item xs={12}>
        {search &&
          (total ? (
            <span className={styles.searchResultText}>
              Tìm thấy <b>{formatNumber(total)}</b> nhà bán hàng
            </span>
          ) : (
            <span className={styles.searchResultText}>Không tìm thấy nhà bán hàng nào</span>
          ))}

        {!search && !loading && <Typography className={styles.searchResultText}>{title}</Typography>}
        {loading && <Skeleton width={300} height={50} variant="text" style={{ margin: '0 15px' }} />}
      </Grid>
    </Grid>

    <SellerListMobile sellers={sellers} loading={loading} />
  </Grid>
);

export default SellerContainerMobile;
