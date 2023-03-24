/* eslint-disable react/destructuring-assignment */
import { Box, Grid, Tooltip } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { COLOR_STORE } from 'constants/Icons';
import { getHardcodeStoreByTagList } from 'constants/flagship-store';
import { useSetting } from 'context';
import { memo } from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';
/*
 Internal Seller: 
- Có Hóa Đơn => "MedX"
- Không hóa đơn => Không hiện thị
External Seller:
- Doanh nghiệp => hiện tên doanh nghiệp
- Cá nhân => "Đối tác của thuocsi"



*/
const SellerInfo = (props) => {
  const partnerName = `Đối tác của ${BRAND_NAME}`;
  // const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  // gọi tới cache chung lấy seller map
  const { seller = {}, tags = [], isProductCard = false, isWishlist = false, isChat = false, containerClass, isWebView = false } = props;
  const { code } = seller;

  const { mapStoreActives = new Map(), getNameSeller } = useSetting();
  const { sellerName, fullNameSeller, isDisplayStore, linkSeller, linkStore } = getNameSeller({ seller, tags });

  // const isActiveStore = mapStoreActives?.get(code) || null;
  // hiển thị với seller là doanh nghiệp ngoài

  // hard code store
  const flagshipStore = getHardcodeStoreByTagList(tags);

  if (flagshipStore) {
    return (
      <Grid
        className={clsx(
          styles.supplierTitle,
          containerClass,
          {
            [styles.supplierTitle_mv2]: isMobileV2,
          },
          isChat && styles.m0,
        )}
        item
        xs={12}
        container
        justifyContent="flex-start"
        direction="row"
      >
        <Tooltip disableTouchListener={isMobileV2} title={flagshipStore.name}>
          <Grid className={isWishlist ? styles.supplier_title_v2 : styles.name} item xs={12} container justifyContent="flex-start" direction="row">
            {!isProductCard ? (
              <strong>Cung cấp bởi: </strong>
            ) : (
              <ImageFallbackStatic width="14" height="16" src={COLOR_STORE} alt={flagshipStore.name} className={styles.image_logo} />
            )}
            <>
              {isWebView ? (
                <Box
                  className={clsx(
                    styles.link,
                    {
                      [styles.link_mv2]: isMobileV2,
                    },
                    isWishlist && styles.supplier_title_v2,
                    isChat && styles.sellerProduct,
                  )}
                  stopProp
                  style={{ fontSize: !isChat && 12 }}
                >
                  {flagshipStore.name}
                </Box>
              ) : (
                <LinkComp
                  target="_blank"
                  className={clsx(
                    styles.link,
                    {
                      [styles.link_mv2]: isMobileV2,
                    },
                    isWishlist && styles.supplier_title_v2,
                    isChat && styles.sellerProduct,
                  )}
                  stopProp
                  style={{ fontSize: !isChat && 12 }}
                  href={flagshipStore.url}
                >
                  {flagshipStore.name}
                </LinkComp>
              )}
            </>
          </Grid>
        </Tooltip>
      </Grid>
    );
  }

  return (
    <Grid
      className={clsx(
        styles.supplierTitle,
        {
          [styles.supplierTitle_mv2]: isMobileV2,
        },
        isChat && styles.m0,
      )}
      item
      xs={12}
      container
      justifyContent="flex-start"
      direction="row"
    >
      {sellerName && (
        <Tooltip disableTouchListener={isMobileV2} title={fullNameSeller}>
          <Grid className={isWishlist ? styles.supplier_title_v2 : styles.name} item xs={12} container justifyContent="flex-start" direction="row">
            {!isProductCard ? (
              <strong>Cung cấp bởi: </strong>
            ) : (
              <ImageFallbackStatic width="14" height="16" src={COLOR_STORE} alt={sellerName} className={styles.image_logo} />
            )}
            {mapStoreActives?.get(code) ? (
              <>
                {isWebView ? (
                  <Box
                    stopProp
                    className={clsx(
                      styles.link,
                      {
                        [styles.link_mv2]: isMobileV2,
                      },
                      isWishlist && styles.supplier_title_v2,
                      isChat && styles.sellerProduct,
                    )}
                  >
                    {sellerName}
                    {!isProductCard && (
                      <Tooltip title="Xem cửa hàng">
                        <OpenInNewIcon style={{ color: '#676F77', paddingTop: '10px', marginBottom: '-3px' }} />
                      </Tooltip>
                    )}
                  </Box>
                ) : (
                  <LinkComp
                    stopProp
                    target="_blank"
                    className={clsx(
                      styles.link,
                      {
                        [styles.link_mv2]: isMobileV2,
                      },
                      isWishlist && styles.supplier_title_v2,
                      isChat && styles.sellerProduct,
                    )}
                    href={linkStore}
                  >
                    {sellerName}
                    {!isProductCard && (
                      <Tooltip title="Xem cửa hàng">
                        <OpenInNewIcon style={{ color: '#676F77', paddingTop: '10px', marginBottom: '-3px' }} />
                      </Tooltip>
                    )}
                  </LinkComp>
                )}
              </>
            ) : (
              <>
                {isDisplayStore ? (
                  <>
                    {isWebView ? (
                      <Box
                        stopProp
                        className={clsx(
                          styles.link,
                          {
                            [styles.link_mv2]: isMobileV2,
                          },
                          isWishlist && styles.supplier_title_v2,
                          isChat && styles.sellerProduct,
                        )}
                      >
                        {sellerName}
                      </Box>
                    ) : (
                      <LinkComp
                        stopProp
                        target="_blank"
                        className={clsx(
                          styles.link,
                          {
                            [styles.link_mv2]: isMobileV2,
                          },
                          isWishlist && styles.supplier_title_v2,
                          isChat && styles.sellerProduct,
                        )}
                        href={linkSeller}
                      >
                        {sellerName}
                      </LinkComp>
                    )}
                  </>
                ) : (
                  <>
                    {isWebView ? (
                      <Box
                        stopProp
                        className={clsx(
                          styles.link,
                          {
                            [styles.link_mv2]: isMobileV2,
                          },
                          isWishlist && styles.supplier_title_v2,
                          sellerName === partnerName && styles.text_tf_none,
                          isChat && styles.sellerProduct,
                        )}
                      >
                        {sellerName === partnerName ? `Đối Tác Của ${BRAND_NAME}` : sellerName}
                      </Box>
                    ) : (
                      <LinkComp
                        stopProp
                        target="_blank"
                        className={clsx(
                          styles.link,
                          {
                            [styles.link_mv2]: isMobileV2,
                          },
                          isWishlist && styles.supplier_title_v2,
                          sellerName === partnerName && styles.text_tf_none,
                          isChat && styles.sellerProduct,
                        )}
                        href={linkSeller}
                      >
                        {sellerName === partnerName ? `Đối Tác Của ${BRAND_NAME}` : sellerName}
                      </LinkComp>
                    )}
                  </>
                  // <span
                  //   className={clsx(
                  //     styles.link,
                  //     {
                  //       [styles.link_mv2]: isMobileV2,
                  //     },
                  //     isWishlist && styles.supplier_title_v2,
                  //   )}
                  // >
                  //   {sellerName}
                  // </span>
                )}
              </>
            )}
          </Grid>
        </Tooltip>
      )}
    </Grid>
  );
};

export default memo(SellerInfo);
