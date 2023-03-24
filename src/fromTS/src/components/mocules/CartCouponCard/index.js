import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { Button } from 'components/atoms';
import { palette } from 'constants/Colors';
import { PROMO_REWARD_TYPE, PROMO_TYPE } from 'constants/Enums';
import { GIFT_ICON, GIFT_IMAGE, LOGO_NOT_MATCH_CONDITIONS } from 'constants/Images';
import { useModal } from 'hooks';
import Image from 'next/image';
import styled from 'styled-components';
import DateTimeUtils from 'utils/DateTimeUtils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { isEmpty } from 'utils/ValidateUtils';
import { v4 as uuidv4 } from 'uuid';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const UseButton = styled(Button)`
  margin-top: 20px !important;
  margin-left: 22px !important;
  text-transform: none !important;
  color: #fff !important;
  background-color: #00b46e !important;
  border: 1px solid #00b46e !important;
  border-radius: 8px;
  padding: 4px 10px !important;
  transition: 0.5s;
  &:hover {
    color: #00b46e !important;
    background-color: #fff !important;
    border-color: #00b46e !important;
  }
`;

const UsedButton = styled(Button)`
  margin-top: 20px !important;
  margin-left: 22px !important;
  text-transform: none !important;
  color: #00b46e !important;
  background-color: #fff !important;
  border: 1px solid #00b46e !important;
  border-radius: 8px;
  padding: 4px 10px !important;
  transition: 0.5s;
  opacity: 0.65;
`;

const CartCouponCard = (props) => {
  const {
    code = '',
    promotion = {},
    promotionType: type = PROMO_TYPE.COMBO,
    endTime: expiredDate,
    startTime,
    rewards = [],
    redeemCode = [],
    handleChangePromo,
    subPrice = 0,
    isDisable,
    message,
    className,
    conditionsVi = [],
    giftList = [],
  } = props;

  const { description = '' } = promotion || {};

  const listCondition = conditionsVi.filter((item) => item && !isEmpty(item.message));

  let maxDiscountValue = 0;
  let discountValue = 0;
  let percent = 0;
  let ruleType = PROMO_REWARD_TYPE.ABSOLUTE;

  const isNotStart = startTime && DateTimeUtils.compareTime(startTime, Date.now()) > 0;

  const [expanded, toggleExpanded] = useModal(false);

  // @TODO: datle rewards is only 1 now
  if (rewards.length !== 0) {
    maxDiscountValue = rewards[0]?.maxDiscount || 0;
    discountValue = rewards[0]?.absoluteDiscount || 0;
    percent = rewards[0]?.percentageDiscount || 0;
    ruleType = rewards[0]?.type || PROMO_REWARD_TYPE.ABSOLUTE;
  }

  const getBenefitAvatar = () => {
    if (type === PROMO_TYPE.GIFT) return <Image width={60} height={60} src={GIFT_ICON} />;
    if (type === PROMO_TYPE.COMBO) return <Image width={60} height={60} src={GIFT_IMAGE} />;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_REWARD_TYPE.ABSOLUTE)
      return <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{formatCurrency(String(discountValue))}</div>;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_REWARD_TYPE.PERCENTAGE)
      return <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{`Giảm ${percent}% Tối đa ${formatCurrency(String(maxDiscountValue))}`}</div>;
    return '';
  };

  const caculatePrice = () => {
    if (ruleType === PROMO_REWARD_TYPE.ABSOLUTE) return Math.max(subPrice - discountValue, 0);
    if (ruleType === PROMO_REWARD_TYPE.PERCENTAGE) return Math.max(subPrice - (subPrice * percent) / 100, subPrice - maxDiscountValue);
    return subPrice;
  };

  const ButtonEle = () =>
    String(code) === redeemCode[0] ? (
      <UsedButton> Đang dùng </UsedButton>
    ) : (
      <UseButton onClick={() => handleChangePromo(String(code), description)}>Dùng ngay</UseButton>
    );

  const getTimeShow = () => {
    if (isNotStart)
      return (
        <div>
          Thời gian bắt đầu : <span>{DateTimeUtils.getFormattedDate(new Date(startTime), 'HH:mm DD/MM/YYYY')}</span>
        </div>
      );

    return expiredDate ? <CountdownTimer prefix="Thời hạn: " dealEndDay={expiredDate} /> : 'Không giới hạn';
  };

  const getButtonShow = () =>
    isDisable || isNotStart ? <ImageFallbackStatic src={LOGO_NOT_MATCH_CONDITIONS} width={72} height={56} /> : <ButtonEle />;

  return (
    <Card className={clsx(styles.coupon_card, type === PROMO_TYPE.COMBO ? styles.coupon_yellow : styles.coupon_green)}>
      <Grid container className={className} direction="row" style={{ width: '100%' }}>
        <Grid className={styles.col_left} item container xs={12} md={9}>
          <Grid className={styles.col_left_inner} container>
            <Grid item xs={12} sm={3}>
              <div className={styles.benefit}>
                {getBenefitAvatar()}
                {type === PROMO_TYPE.COMBO && 'COMBO'}
                {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
                {type === PROMO_TYPE.VOUCHERCODE && 'Giảm giá'}
              </div>
            </Grid>
            <Grid item xs={12} sm={9} container direction="column">
              {type !== PROMO_TYPE.COMBO && (
                <Grid item className={styles.coupon_description}>
                  <Typography style={{ fontWeight: 600 }}>{description}</Typography>
                </Grid>
              )}

              <Grid item>
                <div style={{ display: 'flex' }}>{getTimeShow()}</div>
              </Grid>

              {isDisable && (
                <Grid item style={{ paddingTop: '5px' }}>
                  <strong style={{ color: 'red' }}>Đơn hàng chưa thoả điều kiện.</strong>
                </Grid>
              )}

              {!isDisable && type === PROMO_TYPE.VOUCHERCODE && (
                <Grid item style={{ paddingTop: '5px' }}>
                  Đơn hàng sau khi áp dụng: <strong style={{ color: 'red' }}>{formatCurrency(String(caculatePrice()))}</strong>
                </Grid>
              )}

              {!isDisable && type === PROMO_TYPE.GIFT && giftList && giftList.length > 0 && (
                <Grid item style={{ paddingTop: '5px' }}>
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

              <Grid item>
                <Accordion
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
                    {!isEmpty(listCondition) && (
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
                    )}
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    {!isEmpty(listCondition) &&
                      listCondition.map(({ message: conditionMsg }) =>
                        conditionMsg.map(({ text, isDisable: messageDisable = false }) => (
                          <div key={uuidv4()}>
                            <Typography
                              style={{
                                fontSize: 'small',
                                color: messageDisable ? palette.error.light : palette.info.default,
                                marginBottom: '10px',
                              }}
                            >
                              * {text}
                            </Typography>
                          </div>
                        )),
                      )}
                    {message && (
                      <Typography
                        style={{
                          fontSize: 'small',
                          color: palette.error.main,
                          marginBottom: '10px',
                        }}
                      >
                        {message}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={styles.col_right} item xs={12} md={3} container direction="column" justifyContent="space-between" alignItems="flex-end">
          <Grid item className={styles.code}>
            {code}
          </Grid>

          <Grid item style={{ paddingTop: 10 }}>
            {getButtonShow()}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartCouponCard;
