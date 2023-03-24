import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { BlockTitle } from 'components/mocules';
import NewBreadcrumbs from 'components/mocules/Breadcrumbs';
import SellerListV2 from 'components/mocules/SellerListV2';
import { formatNumber } from 'utils/FormatNumber';
import styles from './styles.module.css';

const SellerContainerV2 = ({ sellers, total, search, title, loading = false, icon = '', breadcrumbs = [], type = '' }) => (
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

        {!search && !loading && <BlockTitle title={title} icon={icon} style={{ marginTop: breadcrumbs.length ? 30 : 0 }} />}
        {loading && <Skeleton width={300} height={50} variant="text" />}
      </Grid>
    </Grid>

    <SellerListV2 sellers={sellers} loading={loading} type={type} />
  </Grid>
);

export default SellerContainerV2;
