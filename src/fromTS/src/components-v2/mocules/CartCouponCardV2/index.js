/* eslint-disable no-unused-vars */
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Button } from 'components/atoms';
// import { palette } from 'constants/Colors';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { CountdownTimer } from 'components/mocules';
import { ENUM_TRACKING_ACTION, PROMO_TYPE } from 'constants/Enums';
import { ICON_VOUCHER_PROMO_TS } from 'constants/Icons';
import { LOGO_NOT_MATCH_CONDITIONS } from 'constants/Images';
import { CART_URL } from 'constants/Paths';
import { useModal, useOverflowTooltip } from 'hooks';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import styled from 'styled-components';
import { gtag, Tracking } from 'utils';
import DateTimeUtils from 'utils/DateTimeUtils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import DialogPromo from './DialogPromo';
import styles from './styles.module.css';

const UseButton = styled(Button)`
  text-transform: none !important;
  color: #fff !important;
  background-color: #08ac60 !important;
  border-radius: 30px;
  padding: 4px 14px !important;
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
  padding: 2px 8px !important;
  transition: 0.5s;
  opacity: 0.65;
  font-family: ggsr;
`;

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 10,
  margin: '0 5px',
  maxWidth: '120px',
  minWidth: '80px',
  backgroundColor: '#e9e9e9',
  '.MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#DC5C00',
  },
}));

const CartCouponCardV2 = (props) => {
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
    giftList = [],
    conditionDescription: newCondition = 'Áp dụng cho mọi đơn hàng.',
    canUse = false,
    discount = 0,
    accountId,
    customerID,
    currentPage,
    isMobile,
    redeemApplyResult = [],
    checkValidate = false,
    status,
    promotionName = '',
    isUnlimited = false,
    availableQuantity = 0,
    customerUsageTotal,
    isShowInfo = false,
    createdTime,
  } = props;
  const router = useRouter();
  const currPath = window.location.pathname;
  const [filterByAutoApplyVoucher] = redeemApplyResult?.filter((item) => item.autoApply === true) || [];
  const countAutoApplyVoucher = filterByAutoApplyVoucher?.discountValue || 0;
  // check tooltip with ... css
  const [isOverflowed, textElementRef] = useOverflowTooltip();

  const { rewards: rewardVoucher = [], rewards = [] } = promotion || {};
  // copy code
  const [isCoppied, setIsCoppied] = useState(false);
  const [open, toggleOpen] = useModal();
  const [typeVoucher = {}] = rewardVoucher || [];
  const type = typeVoucher?.type || PROMO_TYPE.COMBO;

  // let maxDiscountValue = 0;
  // let discountValue = 0;
  // let percent = 0;
  // let ruleType = PROMO_REWARD_TYPE.ABSOLUTE;

  const isNotStart = startTime && DateTimeUtils.compareTime(startTime, Date.now()) > 0;

  const [isHoverTooltip, setIsHoverTooltip] = useState(false);

  // @TODO: datle rewards is only 1 now
  // if (!rewards) return null;
  // if (rewards?.length !== 0) {
  //   maxDiscountValue = rewards[0]?.maxDiscount || 0;
  //   discountValue = rewards[0]?.absoluteDiscount || 0;
  //   percent = rewards[0]?.percentageDiscount || 0;
  //   ruleType = rewards[0]?.type || PROMO_REWARD_TYPE.ABSOLUTE;
  // }

  // const getBenefitAvatar = () => {
  //   if (type === PROMO_TYPE.GIFT || ruleType === PROMO_TYPE.GIFT) return <Image width={60} height={60} src={GIFT_ICON} />;
  //   if (type === PROMO_TYPE.COMBO) return <Image width={60} height={60} src={GIFT_IMAGE} />;
  //   if (type === PROMO_TYPE.ABSOLUTE && ruleType === PROMO_REWARD_TYPE.ABSOLUTE)
  //     return <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{formatCurrency(String(discountValue))}</div>;
  //   if (type === PROMO_TYPE.PERCENTAGE && ruleType === PROMO_REWARD_TYPE.PERCENTAGE)
  //     return <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{`Giảm ${percent}% Tối đa ${formatCurrency(String(maxDiscountValue))}`}</div>;
  //   return '';
  // };

  // const caculatePrice = () => {
  //   if (ruleType === PROMO_REWARD_TYPE.ABSOLUTE) return Math.max(subPrice - discountValue, 0);
  //   if (ruleType === PROMO_REWARD_TYPE.PERCENTAGE) return Math.max(subPrice - (subPrice * percent) / 100, subPrice - maxDiscountValue);
  //   return subPrice;
  // };

  // ADD tracking
  const handleApplyVoucher = () => {
    handleChangePromo(String(code), description);
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_APPLY_VOUCHER_ON_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage: window.location.href,
      isMobile,
    });
    gtag.clickUseDirectlyPromoCode(code);
  };

  const ButtonEle = () =>
    String(code) === redeemCode[0] ? (
      <UsedButton>Đang dùng</UsedButton>
    ) : (
      <UseButton onClick={handleApplyVoucher} data-test="btn-use-promo">
        Dùng ngay
      </UseButton>
    );

  const getTimeShow = () => {
    // logic <  1 day === countdont, > 1 day display time with day
    // const today = DateTimeUtils.getFormattedDate(new Date(), ' YYYY/MM/DD');
    // const endTimeExpire = DateTimeUtils.getFormattedDate(new Date(expiredDate), ' YYYY/MM/DD');
    // const remainTime = (new Date(endTimeExpire) - new Date(today)) / 1000 / 60 / 60 / 24;
    const oneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
    const endVoucher = new Date(expiredDate).getTime();

    if (isNotStart)
      return (
        <Typography className={styles.expiredDate}>
          HSD : <span>{DateTimeUtils.getFormattedDate(new Date(expiredDate), 'DD/MM/YYYY')}</span>
        </Typography>
      );
    return expiredDate && oneDay > endVoucher ? (
      <Grid className={styles.coutdountTime}>
        <CountdownTimer prefix="HSD: " dealEndDay={expiredDate} />
      </Grid>
    ) : (
      <Typography className={styles.expiredDate}>
        HSD: <span>{DateTimeUtils.getFormattedWithDate(new Date(expiredDate), 'DD/MM/YYYY')}</span>
      </Typography>
    );
  };

  const ButtonApply = () => {
    const applyVoucher = () => router.push(CART_URL);
    return (
      <ButtonV2 className={styles.btnValidate} onClick={applyVoucher}>
        Dùng ngay
      </ButtonV2>
    );
  };

  const getButtonShow = () => (!canUse ? <ImageFallbackStatic src={LOGO_NOT_MATCH_CONDITIONS} width={70} height={50} /> : <ButtonEle />);

  // const getButtonWithValidate = () => (status !== 'ACTIVE' ? <ButtonV2 disabled>Dùng ngay</ButtonV2> : <ButtonApply />);
  const getButtonWithValidate = () => <ButtonApply />;
  // new config condition for voucher from internal
  const renderConfigConditionVoucher = () => <div dangerouslySetInnerHTML={{ __html: newCondition }} style={{ minWidth: '100%' }} />;

  // ADD TRACKING
  const toggleOpenCondition = () => {
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
    <Grid className={styles.coupon_card} id="coupon_card">
      <Grid className={styles.coupon_card_wrap}>
        <Grid container className={styles.coupon_cardCtn} direction="row" style={{ width: '100%' }}>
          <Grid className={styles.col_left} item container xs={12}>
            <Grid className={styles.col_left_inner} container>
              <Grid item xs={3}>
                {/* <div className={styles.benefit}>
                {getBenefitAvatar()}
                {type === PROMO_TYPE.COMBO && 'COMBO'}
                {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
                {type === PROMO_TYPE.ABSOLUTE && 'Giảm giá'}
              </div> */}
                <div className={styles.logoVoucher}>
                  <ICON_VOUCHER_PROMO_TS />
                </div>
              </Grid>
              <Grid className={styles.dividerStyle}>
                <Grid className={styles.circleBoxTop} />
                <Divider />
                <Grid className={styles.circleBoxBottom} />
              </Grid>
              <Grid item xs={8} container direction="column" className={styles.contentWrap}>
                <Grid item className={styles.coupon_description}>
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
                  <Grid item style={{ paddingTop: '6px' }} className={styles.canUseVoucher}>
                    <Typography>{errorMessage}</Typography>
                  </Grid>
                )}

                <Grid item style={{ paddingTop: '5px', fontFamily: 'ggsm', display: (!canUse || discount === 0) && 'none' }}>
                  Đơn hàng sau khi áp dụng:{' '}
                  <span style={{ color: '#D4323B' }}>{formatCurrency(Math.max(subPrice - discount - countAutoApplyVoucher, 0))}</span>
                </Grid>

                {canUse && type === PROMO_TYPE.GIFT && giftList && giftList.length > 0 && (
                  <Grid item>
                    <span className="label">Sản phẩm : </span>
                    <ul className={styles.giftList}>
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

                <Grid container item className={styles.wrapCoditionVoucher} alignItems="center">
                  {/* <Accordion
                    expanded={expanded}
                    onChange={toggleExpanded}
                    style={{
                      backgroundColor: '#fff',
                      boxShadow: 'none',
                      border: 'none',
                      padding: '0px',
                      margin: '0px',
                      '&$expanded': {
                        margin: '0px',
                        padding: '0px',
                      },
                    }}
                  >
                    <AccordionSummary
                      style={{
                        padding: '0px',
                        textDecoration: 'underline',
                        color: palette.grey[700],
                        fontSize: '10px',
                        minHeight: '25px',
                        margin: '0 0 -10px -5px',
                      }}
                    >
                      <>
                        {!expanded ? (
                          <>
                            <ExpandMoreIcon fontSize="small" />
                            <Typography style={{ fontSize: 'small' }}>Xem thêm điều kiện</Typography>
                          </>
                        ) : (
                          <>
                            <ExpandLessIcon fontSize="small" />
                            <Typography style={{ fontSize: 'small' }}>Thu gọn điều kiện</Typography>
                          </>
                        )}
                      </>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                      {renderConfigConditionVoucher()}
                    </AccordionDetails>
                  </Accordion> */}
                  <Grid className={styles.coditonDesc} xs={6} item onClick={toggleOpenCondition}>
                    <Typography style={{ cursor: 'pointer' }}>Điều kiện sử dụng</Typography>
                    {/* <CustomizeTooltipCodition title={<RenderTooltip />} arrow interactive> */}
                    <InfoOutlinedIcon />
                    {/* </CustomizeTooltipCodition> */}
                  </Grid>

                  <Grid item xs={6} className={styles.btnApplyCode}>
                    {checkValidate ? getButtonWithValidate() : getButtonShow()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {open && (
        <DialogPromo
          open={open}
          handleClose={toggleOpen}
          renderConfigConditionVoucher={renderConfigConditionVoucher}
          code={code}
          accountId={accountId}
          customerID={customerID}
          currentPage={currentPage}
          isMobile={isMobile}
        />
      )}
    </Grid>
  );
};

export default memo(CartCouponCardV2);
