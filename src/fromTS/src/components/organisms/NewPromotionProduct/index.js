import { Grid } from '@material-ui/core';
import ProductCardNew from 'components/mocules/ProductCardNew';
import { getLinkTagDeal } from 'utils';
import styles from './styles.module.css';

const NewPromotionProduct = ({ products = [], isHalfProgress = false, isCampaignPage = false }) => (
  <>
    {products?.length > 0 ? (
      <div className={styles.product_grid_wrapper}>
        <Grid container spacing={1}>
          {products.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`products-${index}`} item xs={6} sm={4} md={3} lg={3} xl={2} className={styles.customGrid}>
              <ProductCardNew
                product={item}
                category
                isHalfProgress={isHalfProgress}
                isCampaignPage={isCampaignPage}
                link={getLinkTagDeal(item)}
                isLinkTagDeal
              />
            </Grid>
          ))}
        </Grid>
      </div>
    ) : (
      <p className={styles.noData}>Không có sản phẩm khuyến mãi</p>
    )}
  </>
);
export default NewPromotionProduct;
