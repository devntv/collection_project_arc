import { Card, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Button, LinkComp } from 'components/atoms';
import { PROMO_REWARD_TYPE, PROMO_TYPE } from 'constants/Enums';
import { GIFT_IMAGE } from 'constants/Images';
import { QUICK_ORDER } from 'constants/Paths';
import Image from 'next/image';
import { formatCurrency } from 'utils/FormatNumber';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

// fix right name
const CouponCard = (props) => {
  const { code = '', endTime: expiredDate = new Date(Date.now()), promotion = {}, conditions = [] } = props;
  const { rewards = [], description = '', promotionName } = promotion || '';

  let maxDiscountValue = 0;
  let discountValue = 0;
  let percent = 0;
  let minOrderValue = 0;
  const type = rewards[0]?.type || PROMO_TYPE.COMBO;
  let ruleType = type === PROMO_REWARD_TYPE.ABSOLUTE;
  // @TODO: datle rewards is only 1 now
  if (rewards.length !== 0) {
    maxDiscountValue = rewards[0]?.maxDiscount || 0;
    discountValue = rewards[0]?.absoluteDiscount || 0;
    percent = rewards[0]?.percentageDiscount || 0;
    ruleType = rewards[0]?.type || PROMO_REWARD_TYPE.ABSOLUTE;
  }
  // @TODO: datle conditions is only 1 now
  if (conditions.length !== 0) {
    minOrderValue = conditions[0]?.minOrderValue || 0;
  }

  const getBenefitAvatar = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT) return <Image width={60} height={60} src={GIFT_IMAGE} />;
    if (type === PROMO_TYPE.ABSOLUTE) return <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{formatCurrency(String(discountValue))}</div>;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_REWARD_TYPE.PERCENTAGE)
      return <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{`Giảm ${percent}% Tối đa ${formatCurrency(String(maxDiscountValue))}`}</div>;
    return '';
  };

  const getTitle = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT || type === PROMO_TYPE.ABSOLUTE || type === PROMO_TYPE.POINT)
      return description || promotionName;
    if (type === PROMO_TYPE.ABSOLUTE) return `GIẢM ${formatCurrency(discountValue)}`;
    if (type === PROMO_TYPE.PERCENTAGE) return `GIẢM ${percent}% TỐI ĐA ${formatCurrency(maxDiscountValue)}`;
    return '';
  };

  // TODO: đặt hàng ngay chưa chạy

  const getPromoType = () => {
    if (type === PROMO_TYPE.COMBO) return 'COMBO';
    if (type === PROMO_TYPE.GIFT) return 'Quà Tặng';
    if (type === PROMO_TYPE.VOUCHERCODE) return 'Giảm giá';
    if (type === PROMO_TYPE.FREESHIP) return 'Miễn phí giao hàng';
    if (type === PROMO_TYPE.POINT) return 'Điểm thưởng';
    return 'Khuyến mãi';
  };
  return (
    <Card className={clsx(styles.coupon_card, type === PROMO_TYPE.COMBO ? styles.coupon_yellow : styles.coupon_green)}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={4}>
          <div className={styles.benefit}>
            {getBenefitAvatar()}
            {getPromoType()}
          </div>
          <div className={styles.coundown} style={{ display: 'flex' }}>
            <CountdownTimer prefix="Còn" dealEndDay={expiredDate} />
          </div>
        </Grid>
        <Grid item container xs={8}>
          <Grid item xs={12}>
            <div className={styles.coupon_description}>
              <Typography variant="h6" style={{ fontSize: 'large' }}>
                {getTitle()}
              </Typography>
              <div className={styles.coupon_discount}>
                {type === PROMO_TYPE.VOUCHERCODE && `cho đơn hàng tối thiểu ${formatCurrency(String(minOrderValue))}`}
              </div>
            </div>
          </Grid>
          <Grid item className={styles.code} xs={12}>
            {code}
          </Grid>

          <Grid item xs={12}>
            <LinkComp href={QUICK_ORDER}>
              <Button className="promo__button"> Đặt hàng ngay</Button>
            </LinkComp>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CouponCard;
