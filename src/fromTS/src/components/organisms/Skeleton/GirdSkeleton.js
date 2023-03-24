import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProductHorizontalSkeleton } from 'components/mocules';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';

const GridSkeletonProductHorizontal = ({ counts = 0, hasPagingTop = false, hasPagingBottom = false, pages = 1 }) => {
  const rows = [];
  let num = pages > 12 ? 13 : pages;
  if (num < 3) num = 3;
  const page = [];
  for (let i = 0; i < counts; i += 1) {
    rows.push(
      <Grid xl={2} lg={3} md={4} xs={6} className={styles.item} key={uuidv4()} item>
        <ProductHorizontalSkeleton />
      </Grid>,
    );
  }
  for (let i = 0; i < num; i += 1) {
    page.push(<Skeleton key={uuidv4()} variant="circle" width={32} height={32} />);
  }
  return (
    <Grid item className={styles.root} xs={12}>
      {hasPagingTop && <div className={styles.pagingSkeleton}>{page}</div>}
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        direction="row"
        spacing={2}
        style={{ marginTop: hasPagingTop ? '30px' : '0px' }}
      >
        {rows}
      </Grid>
      {hasPagingBottom && <div className={styles.pagingSkeleton}>{page}</div>}
    </Grid>
  );
};

export default GridSkeletonProductHorizontal;
