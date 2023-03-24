import { Card, CardContent, Chip, Grid, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { FLAGSHIP_LABEL, THUOCSI_LABEL } from 'constants/Enums';
import { FLAGSHIP_STORE_SLUGS } from 'constants/flagship-store';
import { STORE_IMAGE_DEFAULT } from 'constants/Images';
import { useSetting } from 'context';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackProductImage, ImageFallbackStoreImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SellerList = ({ sellers }) => {
  const { getNameSeller } = useSetting();
  const infoSeller = (seller) => {
    if (FLAGSHIP_STORE_SLUGS.includes(seller.slug)) {
      const { name, slug } = seller;
      const { logo } = seller?.sellerStore || {};
      return { name, link: `/flagship-store/${slug}`, logo: logo || STORE_IMAGE_DEFAULT, isStore: true, isVip: true };
    }

    const sellerInfo = getNameSeller({ seller: { code: seller?.code } });
    const { logo = [] } = seller?.sellerStore || {};
    const { linkStore = '', linkSeller = '', name, avatar = [], isStore = false, isVip = null } = sellerInfo || {};
    const logoStore = logo?.length > 0 ? logo : avatar;
    return { name, link: isStore ? linkStore : linkSeller, logo: logoStore, isStore, isVip };
  };

  const Price = (prd) => {
    const { errorMessageProduct = null, displayPrice = 0, salePrice = 0 } = prd;
    if (errorMessageProduct) return <Typography style={{ fontSize: '12px', color: 'red' }}>{errorMessageProduct}</Typography>;
    if (displayPrice !== salePrice)
      return (
        <div className={styles.price_wrap}>
          <Typography className={styles.sale_price}>{formatCurrency(displayPrice)}</Typography>
          <Typography className={styles.price}>{formatCurrency(salePrice)}</Typography>
        </div>
      );
    return <Typography className={styles.sale_price}>{formatCurrency(displayPrice)}</Typography>;
  };

  return (
    <>
      {sellers &&
        sellers.length > 0 &&
        sellers
          .filter((item) => item?.product && (item?.product?.topProducts?.length > 0 || FLAGSHIP_STORE_SLUGS.includes(item?.slug)))
          .map((item) => {
            const { product = {} } = item || {};
            const sellerItem = infoSeller(item);

            return (
              <Grid item xs={12} md={6} key={uuidv4()}>
                <Card className={styles.card}>
                  <CardContent style={{ paddingTop: 20 }}>
                    <div className={styles.wrap_info}>
                      <LinkComp href={sellerItem?.link} className={styles.avatar}>
                        <ImageFallbackStoreImage
                          className={styles.img}
                          src={sellerItem?.logo?.length > 0 && sellerItem.logo[0]}
                          width="67"
                          height="67"
                          alt=""
                        />
                      </LinkComp>
                      <div className={styles.info}>
                        <LinkComp href={sellerItem?.link}>
                          <Typography className={styles.name}>{sellerItem?.name || ''}</Typography>
                        </LinkComp>
                      </div>
                    </div>
                    <div className={product?.topProducts.length > 2 ? styles.top_product : styles.top_product_less}>
                      {product?.topProducts.length > 0 &&
                        product?.topProducts.map((prd) => (
                          <div style={{ width: '32%' }} key={uuidv4()}>
                            <LinkComp href={`/product/${prd?.slug}`}>
                              <div className={styles.product_image}>
                                <ImageFallbackProductImage
                                  className={styles.img}
                                  src={prd?.imageUrls && prd?.imageUrls[0]}
                                  fallbackSrc={prd?.imageUrls[0]}
                                  width="100%"
                                  height="100%"
                                  alt=""
                                />
                              </div>
                            </LinkComp>
                            <div style={{ height: '35px' }}>{Price(prd)}</div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  {sellerItem?.isStore && (
                    <Chip
                      label={sellerItem?.isVip ? FLAGSHIP_LABEL : THUOCSI_LABEL}
                      className={styles.chip}
                      style={{ background: sellerItem?.isVip ? '#b98f0f' : '#09884D' }}
                    />
                  )}
                </Card>
              </Grid>
            );
          })}
    </>
  );
};

export default SellerList;
