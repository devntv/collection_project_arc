import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { LinkComp } from 'components/atoms';
import { ENUM_SELLER_TYPE } from 'constants/data/mobile';
import { FLAGSHIP_LABEL, MONITORING_COLLECTOR_TYPE, THUOCSI_LABEL } from 'constants/Enums';
import { FLAGSHIP_STORE_SLUGS } from 'constants/flagship-store';
import { STORE_IMAGE_DEFAULT } from 'constants/Images';
import { useSetting } from 'context';
import { useRouter } from 'next/router';
import { gtag } from 'utils';
import { formatNumber } from 'utils/FormatNumber';
import { ImageFallbackProductImage, ImageFallbackStoreImage } from 'utils/ImageFallback';
import { getProxyImageList } from 'utils/ImageUtils';
import MonitorUtils from 'utils/MonitorUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SellerListV2 = ({ sellers, loading, type = '' }) => {
  const { getNameSeller } = useSetting();
  const getInfoSeller = (seller, typeSeller) => {
    if (FLAGSHIP_STORE_SLUGS.includes(seller.slug)) {
      const { name, slug } = seller;
      const { logo, numberProducts } = seller?.sellerStore || {};
      return { name, link: `/flagship-store/${slug}`, logo: logo || STORE_IMAGE_DEFAULT, numberProducts, isStore: true, isVip: true };
    }
    if (typeSeller === ENUM_SELLER_TYPE.FLAGSHIP) {
      return seller;
    }
    const sellerInfo = getNameSeller({ seller: { code: seller?.code } });
    const { logo = [], numberProducts } = seller?.sellerStore || {};
    const { linkStore = '', linkSeller = '', name, isStore, isVip } = sellerInfo || {};
    return { ...sellerInfo, name: name || seller?.name, link: isStore ? linkStore : linkSeller, logo, numberProducts, isStore, isVip };
  };
  const router = useRouter();
  // const getSellerByCode = useSellers((state) => state.getSellerByCode);

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
                    {[{}, {}, {}].map(() => (
                      <div className={styles.productMinimize} style={{ padding: 0 }} key={uuidv4()}>
                        <Skeleton height={250} variant="rect" style={{ width: '100%' }} />
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
          .filter((item) => item?.product && (item?.product?.topProducts?.length > 0 || FLAGSHIP_STORE_SLUGS.includes(item?.slug)))
          .map((item) => {
            const { product = {}, code } = item || {};
            const sellerItem = getInfoSeller(item, type);
            return (
              <Grid item xs={12} md={6} key={code}>
                <Card className={styles.card}>
                  {sellerItem?.isStore &&
                    (sellerItem?.isVip ? (
                      <span className={styles.flagshipTag}>{FLAGSHIP_LABEL}</span>
                    ) : (
                      <span className={styles.storeTag}>{THUOCSI_LABEL}</span>
                    ))}
                  <CardContent>
                    <div className={styles.wrap_info}>
                      <LinkComp href={sellerItem?.link} className={styles.avatar}>
                        <ImageFallbackStoreImage
                          className={styles.img}
                          src={sellerItem?.logo?.length > 0 && getProxyImageList(sellerItem.logo)[0]}
                          layout="fill"
                          alt={sellerItem?.name}
                          onClick={() => {
                            if (sellerItem?.isVip) {
                              gtag.clickFlagshipStoreNameID(sellerItem?.name, code);
                            } else {
                              gtag.clickSellerNameID(sellerItem?.name, code);
                            }
                          }}
                        />
                      </LinkComp>
                      <div className={styles.info}>
                        <LinkComp href={sellerItem?.link}>
                          <Typography
                            className={styles.name}
                            onClick={() => {
                              if (sellerItem?.isVip) {
                                gtag.clickFlagshipStoreNameID(sellerItem?.name, code);
                              } else {
                                gtag.clickSellerNameID(sellerItem?.name, code);
                              }
                            }}
                          >
                            {sellerItem?.name || ''}
                          </Typography>
                        </LinkComp>

                        <Typography className={styles.numberProducts}>{formatNumber(sellerItem?.numberProducts)} sản phẩm</Typography>
                      </div>
                    </div>
                    <div className={styles.topProductWrapper}>
                      <div className={product?.topProducts?.length > 1 ? styles.top_product : styles.top_product_less}>
                        {product?.topProducts?.length > 0 &&
                          product?.topProducts.map((prd) => {
                            const { discountPercent, name, displayPriceFormated, salePriceFormated, imageUrls, slug } = prd;
                            return (
                              <LinkComp href={`/product/${slug}`} style={{ width: '100%', padding: 0 }} key={uuidv4()}>
                                <Box
                                  className={styles.productMinimize}
                                  key={uuidv4()}
                                  onClick={async () => {
                                    // const sellerInfo = await getSellerByCode({ code: product?.sellerCode });
                                    gtag.viewItemInPage({ product: { ...prd, sellerInfo: sellerItem }, path: router.pathname });
                                    MonitorUtils.sendSKUEvent(
                                      MONITORING_COLLECTOR_TYPE.SKU_DETAIL_VIEW,
                                      { ...prd, sellerInfo: sellerItem },
                                      router.pathname,
                                    );
                                  }}
                                >
                                  {discountPercent > 0 && <span className={styles.discountPercent}>-{discountPercent}%</span>}
                                  <div className={styles.productImage}>
                                    <ImageFallbackProductImage
                                      src={imageUrls && getProxyImageList(imageUrls)[0]}
                                      fallbackSrc={imageUrls[0]}
                                      layout="fill"
                                      alt={name}
                                    />
                                  </div>
                                  <Typography className={styles.productName}>{name}</Typography>
                                  <Typography className={styles.salePrice}>{discountPercent ? salePriceFormated : ''}</Typography>
                                  <Typography className={styles.displayPrice}>{displayPriceFormated}</Typography>
                                </Box>
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

export default SellerListV2;
