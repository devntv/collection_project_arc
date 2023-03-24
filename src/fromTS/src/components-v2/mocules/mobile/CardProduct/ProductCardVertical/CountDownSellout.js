import LinearProgress from 'components-v2/atoms/Mobile/LinearProgress';
import { CountdownTimer } from 'components/mocules';
import { calculateTimeLeft } from 'utils';

import { formatDate } from 'utils/FormatDate';

/**
 * RULES
 *  1. !(isHappeningCampaign && dealReady && percentDealSold === 100)
 *     + LinearProgress
 *     + !isHappeningCampaign && dealReady && percentDealSold === 100 => hết hàng
 *     + dealReady && percentDealSold < 75 => đã bán    + totalSold
 *     + !dealReady => sắp mở bán
 *     + dealReady && percentDealSold >=75 => Sắp bán hết
 *  2.!isHappeningCampaign
 *     + isHappeningCampaign => <>
 *     + dealReady => CountdownTimer
 *     + !dealReady => startDate
 */

const CountDownSellout = ({ propsProduct }) => {
  const { deal, isHappeningCampaign, campaign, isDeal, isSellerList = false, availableProducts, percentDealSold } = propsProduct;

  const timeLeft = calculateTimeLeft(deal?.startTime) || calculateTimeLeft(campaign?.campaign?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;
  // const percentDealSolds = ((deal?.quantity || 0) / deal?.maxQuantity || 0) * 100;

  const isCompleteCampaign = isHappeningCampaign && dealReady && percentDealSold === 100;
  const isSoldOut = !isHappeningCampaign && dealReady && percentDealSold === 100;
  const isFlashSale = !isSellerList && ((isHappeningCampaign && percentDealSold < 100) || (isHappeningCampaign && isDeal && availableProducts > 0));
  const totalSold = deal?.quantity;

  let message = '';
  const { soldQuantity = 0 } = campaign || {};

  if (isSoldOut) {
    message = 'Hết hàng';
  } else if (dealReady && percentDealSold < 75) {
    message = `Đã bán ${isFlashSale ? soldQuantity : totalSold || 0}`;
  } else if (dealReady && percentDealSold >= 75) {
    message = 'Sắp bán hết';
  } else {
    message = 'Sắp mở bán';
  }
  const Wrapper = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '13px', marginTop: '4px' }}>{children}</div>
  );

  // if (errorMessageProduct) {
  //   return <Wrapper />;
  // }
  // // ẩn khi đang ở trang chủ
  // if (asPath === '/') {
  //   return <></>;
  // }

  return (
    <Wrapper>
      {isCompleteCampaign && (
        <>
          {!isCompleteCampaign && <LinearProgress text={message} total={deal?.maxQuantity || 0} value={deal?.quantity || 0} />}
          {!isHappeningCampaign && dealReady && (
            <CountdownTimer style={{ display: 'inline-block', fontSize: '9px', color: '#d4323b' }} dealEndDay={deal?.endTime} />
          )}
          {!isHappeningCampaign && !dealReady && <div>{formatDate(deal?.startTime)}</div>}
        </>
      )}
      {isDeal && deal && (
        <>
          {!isCompleteCampaign && <LinearProgress text={message} total={deal?.maxQuantity} value={deal?.quantity} />}
          {!isHappeningCampaign && dealReady && (
            <CountdownTimer style={{ display: 'inline-block', fontSize: '9px', color: '#d4323b' }} dealEndDay={deal?.endTime} />
          )}
          {!isHappeningCampaign && !dealReady && <div>{formatDate(deal?.startTime)}</div>}
        </>
      )}
      {!isSellerList && ((isHappeningCampaign && percentDealSold < 100) || (isHappeningCampaign && isDeal && availableProducts > 0)) && (
        <LinearProgress text={message} total={campaign?.quantity || 1} value={soldQuantity || 0} />
      )}
    </Wrapper>
  );
};

export default CountDownSellout;
