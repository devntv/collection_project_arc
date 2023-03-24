import { CircularProgress, Grid, Typography } from '@material-ui/core';
import NewBreadcrumbs from 'components/mocules/Breadcrumbs';
import SellerList from 'components/mocules/SellerList';
import { BRAND_NAME } from 'constants/Enums';
import styles from './styles.module.css';

const SellerContainer = ({ sellers, total, search, breadcrumbs = [], loading = false, title = '' }) => (
  <Grid container spacing={2}>
    <Grid container item>
      {search ? (
        <>
          <Grid item xs={12}>
            <NewBreadcrumbs breadcrumbs={breadcrumbs} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.textSearchRes}>
              Có tất cả <strong>{total}</strong> nhà bán hàng tìm kiếm
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              {title || `${BRAND_NAME} Store`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {total > 0 && (
              <Typography className={styles.textSearchRes}>
                Hiển thị <strong>{total}</strong> nhà bán hàng
              </Typography>
            )}
          </Grid>
        </>
      )}
    </Grid>

    {loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
          position: 'relative',
          width: '100%',
          minHeight: '30vh',
        }}
      >
        <CircularProgress size={40} thickness={4} style={{ color: '#4caf50' }} />
      </div>
    ) : (
      <SellerList sellers={sellers} total={total} search={search} />
    )}
  </Grid>
);
export default SellerContainer;
