import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { MOBILE_FLAGSHIP_LABEL, THUOCSI_LABEL } from 'constants/Enums';
import { STORE_IMAGE_DEFAULT } from 'constants/Images';
import { useSetting } from 'context';
import { formatNumber } from 'utils/FormatNumber';
import { ImageFallbackProductImage, ImageFallbackStoreImage } from 'utils/ImageFallback';
import { getProxyImageList } from 'utils/ImageUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SellerListMobile = ({ sellers, loading }) => {
  const { getNameSeller } = useSetting();
  const infoSeller = (seller) => {
    if (['durex', 'sanofi'].includes(seller.slug)) {
      const { name, slug } = seller;
      const { logo, numberProducts } = seller?.sellerStore || {};
      return { name, link: `/flagship-store/${slug}`, logo: logo || STORE_IMAGE_DEFAULT, numberProducts, isStore: true, isVip: true };
    }

    const sellerInfo = getNameSeller({ seller: { code: seller?.code } });
    const { logo = [], numberProducts } = seller?.sellerStore || {};
    const { linkStore = '', linkSeller = '', name, isStore, isVip } = sellerInfo || {};
    return { name: name || seller?.name, link: linkStore || linkSeller, logo, numberProducts, isStore, isVip };
  };

  if (loading) {
    return (
      <>
        {[{}, {}, {}, {}].map(() => (
          <Grid item xs={12} md={6} key={uuidv4()}>
            <Card className={styles.card}>
              <CardContent>
                <div className={styles.wrap_info}>
                  <Skeleton width={40} height={40} variant="circle" />
                  <div className={styles.info}>
                    <Skeleton width={100} height={15} variant="text" />
                    <Skeleton width={100} height={10} variant="text" style={{ marginTop: 10 }} />
                  </div>
                </div>
                <div className={styles.topProductWrapper}>
                  <div className={styles.top_product}>
                    {[{}, {}].map(() => (
                      <div className={styles.productMinimize} style={{ padding: 0 }} key={uuidv4()}>
                        <Skeleton height={200} variant="rect" style={{ width: '100%' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </>
    );
  }
  return (
    <>
      {sellers &&
        sellers.length > 0 &&
        sellers
          .filter((item) => item?.product && (item?.product?.topProducts?.length > 0 || ['durex', 'sanofi'].includes(item?.slug)))
          .map((item) => {
            const { product = {} } = item || {};

            const sellerItem = infoSeller(item);
            return (
              <Grid item xs={12} md={6} key={item.code}>
                <Card className={styles.card}>
                  {sellerItem?.isStore &&
                    (sellerItem?.isVip ? (
                      <span className={styles.flagshipTag}>{MOBILE_FLAGSHIP_LABEL}</span>
                    ) : (
                      <span className={styles.storeTag}>{THUOCSI_LABEL}</span>
                    ))}
                  <CardContent className={styles.mobileCard_content}>
                    <div className={styles.wrap_info}>
                      <LinkComp href={sellerItem?.link} className={styles.avatar}>
                        <ImageFallbackStoreImage
                          className={clsx(styles.img, sellerItem?.isStore === true && styles.img_fixed_brand)}
                          src={sellerItem?.logo?.length > 0 && getProxyImageList(sellerItem.logo, 400)[0]}
                          layout="fill"
                          alt={sellerItem?.name}
                        />
                      </LinkComp>
                      <div className={styles.info}>
                        <LinkComp href={sellerItem?.link}>
                          <Typography className={styles.name}>{sellerItem?.name || ''}</Typography>
                        </LinkComp>

                        <Typography className={styles.numberProducts}>{formatNumber(sellerItem?.numberProducts)} sản phẩm</Typography>
                      </div>
                    </div>
                    <div className={styles.topProductWrapper}>
                      <div className={product?.topProducts.length > 1 ? styles.top_product : styles.top_product_less}>
                        {product?.topProducts.length > 0 &&
                          product?.topProducts?.slice(0, 2).map((prd) => {
                            const { discountPercent, name, displayPriceFormated, salePriceFormated, imageUrls, slug } = prd;
                            return (
                              <LinkComp
                                href={`/product/${slug}`}
                                style={{ width: product?.topProducts.length > 1 ? '100%' : '50%', padding: 0 }}
                                key={`product-link-${slug}}`}
                              >
                                <div className={styles.productMinimize} key={`product-box-${slug}`}>
                                  {discountPercent > 0 && <span className={styles.discountPercent}>-{discountPercent}%</span>}
                                  <div className={styles.flex_center}>
                                    <div className={styles.productImage}>
                                      <ImageFallbackProductImage src={getProxyImageList(imageUrls, 400)[0]} layout="fill" alt={name} />
                                    </div>
                                  </div>
                                  <Typography className={styles.productName}>{name}</Typography>
                                  <Typography className={styles.salePrice}>{discountPercent ? salePriceFormated : ''}</Typography>
                                  <Typography className={styles.displayPrice}>{displayPriceFormated}</Typography>
                                </div>
                              </LinkComp>
                            );
                          })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
    </>
  );
};

export default SellerListMobile;
