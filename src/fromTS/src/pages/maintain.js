import { Grid, Typography } from '@material-ui/core';
import { ImageFallback } from 'utils';
import styles from '../styles/maintain.module.css';

// use this function just get PageProps
// export async function getServerSideProps(ctx) {
//   return doWithServerSide(ctx, async () => ({
//     props: {},
//   }));
// }

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

// TODO: translate
const PageMaintain = () => (
  <div className={styles.bg}>
    <div className={styles.contain}>
      <Grid container style={{ width: '100%' }} className={styles.contain_inner}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Hệ thống đang bảo trì !!!
          </Typography>
        </Grid>
        <Grid item align="center">
          <ImageFallback height={500} width={500} src="https://img-proxy.thuocsi.vn/thuocsi-live/web/static/images/maintain.png" isUseLoaderCache />
        </Grid>
        <Grid item>
          <Grid item xs={12}>
            <Typography align="center" variant="subtitle1">
              Website thuocsi.vn bảo trì để nâng cấp hệ thống. Dự kiến bảo trì từ 00h - 2h sáng ngày Thứ 7 (18/03/2023).
              <br />
              thuocsi.vn xin lỗi quý khách hàng về sự bất tiện này.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </div>
);
export default PageMaintain;
