/* eslint-disable no-unused-vars */
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Button } from 'components/atoms';
// import { palette } from 'constants/Colors';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { CountdownTimer } from 'components/mocules';
import { ENUM_TRACKING_ACTION, PROMO_TYPE } from 'constants/Enums';
import { ICON_VOUCHER_PROMO_TS } from 'constants/Icons';
import { LOGO_NOT_MATCH_CONDITIONS } from 'constants/Images';
import { CART_URL } from 'constants/Paths';
import { useModal, useOverflowTooltip } from 'hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { gtag, Tracking } from 'utils';
import DateTimeUtils from 'utils/DateTimeUtils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import DiablogPromoMobile from './DiablogPromoMobile';
import stylesMobile from './stylesMobile.module.css';

const UseButton = styled(Button)`
  text-transform: none !important;
  color: #fff !important;
  background-color: #08ac60 !important;
  border-radius: 30px;
  padding: 4px 14px;
  transition: 0.5s;
  font-family: ggsr;
  &:hover {
    color: #fff !important;
    background-color: #24bb74 !important;
  }
`;

const UsedButton = styled(Button)`
  text-transform: none !important;
  color: #08ac60 !important;
  background-color: #fff !important;
  border: 1px solid #00b46e !important;
  border-radius: 30px;
  padding: 2px 8px;
  transition: 0.5s;
  opacity: 0.65;
  font-family: ggsr;
`;

const CartCouponMobile = (props) => {
  const {
    code = '',
    description = '',
    voucher: { promotion = {} } = {},
    errorMessage = '',
    endTime: expiredDate,
    startTime,
    redeemCode = [],
    handleChangePromo,
    subPrice = 0,
    className,
    giftList = [],
    conditionDescription: newCondition = '',
    canUse = false,
    discount = 0,
    accountId,
    customerID,
    currentPage,
    isMobile,
    circleBoxBg = '',
    checkValidate = false,
    isUnlimited = false,
    availableQuantity = 0,
    customerUsageTotal,
    isShowInfo = false,
    createdTime,
  } = props;

  const router = useRouter();

  const { rewards: rewardVoucher = [], rewards = [] } = promotion || {};
  const [isOverflowed, textElementRef] = useOverflowTooltip();
  const [typeVoucher] = [rewardVoucher];
  const type = typeVoucher?.type || PROMO_TYPE.COMBO;

  const isNotStart = startTime && DateTimeUtils.compareTime(startTime, Date.now()) > 0;
  const [open, toggleOpen] = useModal();
  const [isHoverTooltip, setIsHoverTooltip] = useState(false);

  const ButtonEle = () =>
    String(code) === redeemCode[0] ? (
      <UsedButton> Đang dùng </UsedButton>
    ) : (
      <UseButton
        onClick={() => {
          gtag.clickUseDirectlyPromoCode(code);
          handleChangePromo(String(code), description);
        }}
      >
        Dùng ngay
      </UseButton>
    );

  const getTimeShow = () => {
    const oneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
    const endVoucher = new Date(expiredDate).getTime();

    if (isNotStart)
      return (
        <Typography className={stylesMobile.expiredDate}>
          HSD : <span>{DateTimeUtils.getFormattedDate(new Date(expiredDate), 'DD/MM/YYYY')}</span>
        </Typography>
      );

    return expiredDate && oneDay > endVoucher ? (
      <Grid className={stylesMobile.coutdountTime}>
        <CountdownTimer prefix="HSD: " dealEndDay={expiredDate} />
      </Grid>
    ) : (
      <Typography className={stylesMobile.expiredDate}>
        HSD: <span>{DateTimeUtils.getFormattedWithDate(new Date(expiredDate), 'DD/MM/YYYY')}</span>
      </Typography>
    );
  };

  const ButtonApply = () => {
    const applyVoucher = () => router.push(CART_URL);
    return (
      <ButtonV2 className={stylesMobile.btnValidate} onClick={applyVoucher}>
        Dùng ngay
      </ButtonV2>
    );
  };

  const getButtonShow = () => (!canUse ? <ImageFallbackStatic src={LOGO_NOT_MATCH_CONDITIONS} width={70} height={50} /> : <ButtonEle />);
  // new config condition for voucher from internal
  const getButtonWithValidate = () => <ButtonApply />;
  // tracking action mobile
  const handleClickCondition = () => {
    toggleOpen();
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_VIEW_VOUCHER_CONDITION_ON_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage,
      isMobile,
    });
  };

  return (
    <Grid className={stylesMobile.coupon_card} id="coupon_card">
      <Grid className={stylesMobile.coupon_card_wrap}>
        <Grid container className={className} direction="row" style={{ width: '100%' }}>
          <Grid className={stylesMobile.col_left} item container xs={12}>
            <Grid className={stylesMobile.col_left_inner} container>
              <Grid item xs={3}>
                <div className={stylesMobile.logoVoucher}>
                  <ICON_VOUCHER_PROMO_TS />
                </div>
              </Grid>
              <Grid className={stylesMobile.dividerStyle}>
                <Grid className={stylesMobile.circleBoxTop} style={{ backgroundColor: circleBoxBg }} />
                <Divider />
                <Grid className={stylesMobile.circleBoxBottom} style={{ backgroundColor: circleBoxBg }} />
              </Grid>
              <Grid item xs={8} container direction="column" className={stylesMobile.wrapRight}>
                <Grid item className={stylesMobile.coupon_description}>
                  <Tooltip title={description} arrow open={isOverflowed && isHoverTooltip} enterTouchDelay={0} disableHoverListener={!isOverflowed}>
                    <Typography
                      ref={textElementRef}
                      style={{ fontWeight: 600 }}
                      onClick={() => setIsHoverTooltip(true)}
                      onMouseOver={() => setIsHoverTooltip(true)}
                      onMouseLeave={() => setIsHoverTooltip(false)}
                    >
                      {description}
                    </Typography>
                  </Tooltip>
                </Grid>

                {isShowInfo && (
                  <Grid
                    item
                    style={{
                      display: customerUsageTotal === availableQuantity && !isUnlimited ? 'none' : 'flex',
                      maxHeight: '30px',
                      position: 'relative',
                    }}
                    container
                    alignItems="center"
                  >
                    <Typography style={{ fontSize: '13px', color: '#797979', fontWeight: 400 }}>
                      {isUnlimited ? 'Không giới hạn số lần dùng' : `Đã dùng : ${customerUsageTotal}/${availableQuantity}`}
                    </Typography>
                  </Grid>
                )}

                <Grid item>
                  <div style={{ display: 'flex' }}>{getTimeShow()}</div>
                </Grid>

                {isShowInfo && (
                  <Grid item>
                    <div style={{ display: 'flex' }}>
                      <Typography style={{ fontSize: '13px', color: '#797979', fontWeight: 400, fontFamily: 'ggsr' }}>
                        Ngày nhận: {DateTimeUtils.getFormattedWithDate(new Date(createdTime), 'DD/MM/YYYY')}
                      </Typography>
                    </div>
                  </Grid>
                )}

                {!canUse && (
                  <Grid item className={stylesMobile.canUseVoucher}>
                    <Typography>{errorMessage}</Typography>
                  </Grid>
                )}

                <Grid
                  item
                  style={{ display: !canUse ? 'none' : 'flex', fontFamily: 'ggsm', visibility: discount === 0 && 'hidden' }}
                  className={stylesMobile.priceApply}
                >
                  Giá sau áp dụng: <span style={{ color: '#D4323B', marginLeft: '4px' }}>{formatCurrency(Math.max(subPrice - discount, 0))}</span>
                </Grid>

                {canUse && type === PROMO_TYPE.GIFT && giftList && giftList.length > 0 && (
                  <Grid item>
                    <span className="label">Sản phẩm : </span>
                    <ul className={stylesMobile.giftList}>
                      {giftList &&
                        giftList.length > 0 &&
                        giftList.map((item) => (
                          <li key={item?.skuId}>
                            <span>{item?.name}</span>
                          </li>
                        ))}
                    </ul>
                  </Grid>
                )}

                <Grid item className={stylesMobile.wrapCoditionVoucher}>
                  <Grid className={stylesMobile.coditonDesc} xs={7} item onClick={handleClickCondition}>
                    <Typography>Điều kiện sử dụng</Typography>
                    <InfoOutlinedIcon />
                  </Grid>
                  <Grid item xs={5} className={stylesMobile.btnApplyCode}>
                    {checkValidate ? getButtonWithValidate() : getButtonShow()}
                  </Grid>
                </Grid>
                {open && (
                  <DiablogPromoMobile
                    open={open}
                    handleClose={toggleOpen}
                    className={clsx(stylesMobile.diablogContainer, newCondition?.length > 1000 && stylesMobile.diablogContainerUnsize)}
                    iconCoppy={<FileCopyOutlinedIcon />}
                    code={code}
                    newCondition={newCondition}
                    canUse={checkValidate || canUse}
                    handleChangePromo={handleChangePromo}
                    description={description}
                    redeemCode={redeemCode}
                    accountId={accountId}
                    customerID={customerID}
                    currentPage={currentPage}
                    isMobile={isMobile}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartCouponMobile;
