import { Grid } from '@material-ui/core';
import Template from 'components/layout/Template';
import { BRAND_NAME } from 'constants/Enums';
import { doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Về chúng tôi');

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {
      SEO_CONFIG: {
        title,
      },
    },
  }));
}

// TODO: translate
export default function AboutUs() {
  return (
    <Template>
      <div className={styles.wrapper}>
        <Grid alignItems="center" spacing={4} container>
          <Grid style={{ margin: '50px 0' }} md={6} xs={12} item>
            <img className={styles.img} src="/images/about_us/ab-1.jpg" alt="About us 01" />
          </Grid>
          <Grid md={6} xs={12} item>
            <h2 className={styles.title}>THÔNG TIN VỀ {BRAND_NAME}</h2>
            <p className={styles.fs18}>
              {BRAND_NAME} được thành lập từ năm 2018, là một trong những startup thành công dẫn đầu trong lĩnh vực công nghệ về y tế và dịch vụ y tế.
            </p>
            <p className={styles.fs18}>
              Hiện tại {BRAND_NAME} là nền tảng bao gồm website và ứng dụng di động cung cấp và phân phối thuốc và dược phẩm cho hơn 1.000 nhà thuốc
              và phòng khám trên khắp Việt Nam, đồng thời {BRAND_NAME} đang dần mở rộng mạng lưới phân phối thuốc và dược phẩm của mình ra các nước
              trong khu vực Đông Nam Á như Cambodia.
            </p>
          </Grid>
        </Grid>
        <Grid style={{ margin: '50px 0' }} alignItems="center" spacing={4} container>
          <Grid md={6} xs={12} item>
            <h2 className={styles.title}>Mục tiêu của chúng tôi</h2>
            <p className={styles.fs18}>
              Trong tương lai, thuocsi.vn hướng đến không những giúp phát triển hệ thống Y tế tại Việt Nam mà còn là nền tảng hiện đại hóa các kênh
              phân phối truyền thống.
            </p>
            <p className={styles.fs18}>
              Trong chuỗi phân phối hiện tại, đã có nhiều doanh nghiệp, cá nhân và tổ chức khác nhau tham gia trong chuỗi phân phối của chúng tôi.
            </p>
            <p className={styles.fs18}>
              Với tầm nhìn này, chúng tôi dần thay đổi các kênh phân phối lâu đời, giúp nâng cao chất lượng y tế đến mọi vùng miền nhằm duy trì chất
              lượng cuộc sống.
            </p>
          </Grid>
          <Grid md={6} xs={12} item>
            <img className={styles.img} src="/images/about_us/ab-2.jpg" alt="About us 01" />
          </Grid>
        </Grid>
        <Grid style={{ margin: '50px 0' }} alignItems="center" spacing={4} container>
          <Grid md={6} xs={12} item>
            <img className={styles.img} src="/images/about_us/ab-3.jpg" alt="About us 01" />
          </Grid>
          <Grid md={6} xs={12} item>
            <h2 className={styles.title}>Sứ mệnh</h2>
            <p className={styles.fs18}>
              Ứng dụng công nghệ tối đa để cho ra mô hình giải quyết các vấn đề Y Tế một cách nhanh chóng, hiệu quả và chất lượng cao.
            </p>
          </Grid>
        </Grid>
      </div>
    </Template>
  );
}
