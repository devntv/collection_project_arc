/* eslint-disable react/destructuring-assignment */
import { Avatar, Box, Divider, Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
// import { getFirst } from 'clients';
import { LinkComp } from 'components/atoms';
import { ICON_CHAT_NGAY, STORE_BLUE_ICON, STORE_ICON_2 } from 'constants/Icons';
import { LOGO_MEDX } from 'constants/Images/default';
import { useSetting } from 'context';
import { isMobile } from 'react-device-detect';
import { gtag } from 'utils';
// import { useEffect, useState } from 'react';
// import { SupplierService } from 'services';
import { BRAND_NAME } from 'constants/Enums';
import { ImageFallbackStatic, ImageFallbackStoreImage } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const ButtonChatNgay = ({ isMobileV2, sellerCode }) => (
  <LinkComp
    className={styles.linkShop}
    href="#"
    onClick={() => {
      if (window?.openBuyerChat) window?.openBuyerChat({ sellerCode });
    }}
  >
    <ImageFallbackStatic src={`${ICON_CHAT_NGAY}?size=origin`} className={styles.sellerIcon} width={14} height={16} alt="" />
    <Typography variant={`${isMobileV2 ? 'body2' : 'body'}`} style={{ marginLeft: 5 }}>
      Chat Ngay
    </Typography>
  </LinkComp>
);

const SellerInfoProductDetail = (props) => {
  // gọi tới cache chung lấy seller map
  const { seller = {}, tags = [], flagshipStoreInfo = null } = props;
  const { code } = seller;
  const { getNameSeller } = useSetting();
  const { sellerName, isDisplayStore, linkStore, linkSeller, avatar = [], isStore = false, isInternal } = getNameSeller({ seller, tags });
  const partnerName = `Đối tác của ${BRAND_NAME}`;
  const beta = useMobileV2((state) => state.beta);
  const isMobileV2 = isMobile && beta;
  // const [yearNumber, setYearNumber] = useState(null);

  // không show nút chat ngay đối với các seller từ bên supplier
  // các seller đó là seller internal & các seller flagshipstore durex & sanofi
  const isShowBtnChat = isStore && !isInternal;

  // yearNumber
  // useEffect(async () => {
  //   // số năm hợp tác với thuocsi -> deprecate
  //   const supplierRes = await SupplierService.getInfoSupplier({});
  //   if (isValid(supplierRes)) {
  //     const yearNumberCur = new Date().getFullYear() - getFirst(supplierRes).yearFounded;
  //     setYearNumber(yearNumberCur);
  //   }
  // }, []);

  if (flagshipStoreInfo) {
    const { primaryColor } = flagshipStoreInfo;

    return (
      <div style={{ position: 'relative', marginTop: 8 }}>
        <span className={styles.flagshipTag} style={{ backgroundColor: primaryColor }}>
          Gian hàng hãng
        </span>
        <div className={styles.avatar_name}>
          <Avatar
            src={flagshipStoreInfo.logo[0]}
            className={clsx(styles.avatar, { [styles.avatar_mv2]: isMobileV2 })}
            style={{ border: `1px solid ${primaryColor}` }}
          />
          <div>
            <Typography className={styles.name}>{flagshipStoreInfo.name}</Typography>
            <Typography className={styles.subName}>Nhà cung cấp</Typography>
          </div>
        </div>
        <div className={styles.btnLinkCustomShop}>
          <span>
            <LinkComp
              name="Xem Store"
              className={styles.linkCustomShop}
              href={flagshipStoreInfo.url}
              style={{ border: '1px solid #025BAC' }}
              onClick={() => {
                gtag.clickViewShop(flagshipStoreInfo.name);
              }}
            >
              <img src={STORE_BLUE_ICON} className={styles.sellerIcon} width="14px" height="16px" alt="" />
            </LinkComp>
          </span>
        </div>
        <Typography className={styles.subNameBottom}>Hàng chính hãng {flagshipStoreInfo.slug.toUpperCase()} do MedX phân phối</Typography>
      </div>
    );
  }

  return (
    <>
      {code && sellerName && (
        <div style={{ marginTop: isMobileV2 ? '12px' : '5px' }}>
          <div className={styles.avatar_name}>
            {sellerName === 'MEDX' ? (
              <ImageFallbackStoreImage src={`${LOGO_MEDX}?size=origin`} className={styles.sellerIcon} width={50} height={17} alt="" />
            ) : (
              <Avatar src={avatar[0]} className={clsx(styles.avatar, { [styles.avatar_mv2]: isMobileV2 })} />
            )}
            <div>
              <Typography className={clsx(styles.name, sellerName === partnerName && styles.text_tf_none)}>
                {sellerName === partnerName ? `Đối Tác Của ${BRAND_NAME}` : sellerName}
              </Typography>
            </div>
          </div>
          <div className={styles.btnLinkShop}>
            {isStore ? (
              <Grid container justifyContent="space-between">
                <Grid item>
                  <LinkComp
                    className={styles.linkShop}
                    href={linkStore}
                    onClick={() => {
                      gtag.clickViewShop(sellerName);
                    }}
                  >
                    <ImageFallbackStatic src={`${STORE_ICON_2}?size=origin`} className={styles.sellerIcon} width={14} height={16} alt="" />
                    <Typography variant={`${isMobileV2 ? 'body2' : 'body'}`} style={{ marginLeft: 5 }}>
                      Xem Store
                    </Typography>
                  </LinkComp>
                </Grid>
                {isShowBtnChat && (
                  <Grid item>
                    <ButtonChatNgay isMobileV2={isMobileV2} sellerCode={code} />
                  </Grid>
                )}
              </Grid>
            ) : (
              <>
                {isDisplayStore && (
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <LinkComp
                        className={styles.linkShop}
                        href={linkSeller}
                        onClick={() => {
                          gtag.clickViewShop(sellerName);
                        }}
                      >
                        <ImageFallbackStatic src={`${STORE_ICON_2}?size=origin`} className={styles.sellerIcon} width={14} height={16} alt="" />
                        <Typography variant={`${isMobileV2 ? 'body2' : 'body'}`} style={{ marginLeft: 5 }}>
                          Xem Store
                        </Typography>
                      </LinkComp>
                    </Grid>
                    {isShowBtnChat && (
                      <Grid item>
                        <ButtonChatNgay sellerCode={code} />
                      </Grid>
                    )}
                  </Grid>
                )}
              </>
            )}
            {/* <Button className={styles.linkShop} startIcon={<AddCircleOutlineIcon />}>
              Theo dõi
            </Button> */}
          </div>
        </div>
      )}

      {/* hiện tại không có số này */}
      {/* {!Number.isNaN(yearNumber) && (
        <div className={styles.cooperation}>
          <div className={styles.years}>
            <Typography className="yearsNumber">{yearNumber}+</Typography>
            <Typography style={{ color: '#fff', fontSize: 10, lineHeight: '13px' }}>năm</Typography>
          </div>
          <Typography className={styles.cooperationText}>Hợp tác cùng thuốc sỉ</Typography>
        </div>
      )} */}
      {code && sellerName && (
        <>
          <div className={styles.row}>
            <Typography>Đánh giá</Typography>
            <Rating name="rating" value={5} readOnly size="small" />
          </div>
          <Divider />
        </>
      )}

      {/* <div className={styles.row}>
        <Typography>Sản phẩm</Typography>
        <Typography>67</Typography>
      </div>
      <div className={styles.row}>
        <Typography>Người theo dõi</Typography>
        <Typography>13k</Typography>
      </div> */}
      {/* <Typography className={sellerName && styles.bottom}>
        Hệ thống sẽ chọn nhà cung cấp tốt nhất cho bạn.
        <a href="/terms-and-condition"> Điều khoản sử dụng</a>
      </Typography> */}
      <Box className={styles.bottom1}>
        <Typography>Đăng ký bán hàng cùng thuocsi.vn.</Typography>
        <a href="https://try.thuocsi.vn/banhangcungthuocsi"> Đăng ký</a>
      </Box>
    </>
  );
};

export default SellerInfoProductDetail;
