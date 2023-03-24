import { IconButton, Tooltip, Typography } from '@material-ui/core';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import clsx from 'clsx';
import FeedbackPriceFormModal from 'components/mocules/FeedbackPriceFormModal';
import { BRAND_NAME } from 'constants/Enums';
import { useTicket } from 'context';
import useModal from 'hooks/useModal';
import { DISLIKE_FEEDBACK_CODE, LIKE_FEEDBACK_CODE } from 'sysconfig';

import styles from './styles.module.css';

const FeedbackPrice = ({ sku, productId, isDetailMV2 = false }) => {
  const { sendLikeFeedback, isSkuFeedbackedPrice } = useTicket();
  const feedbacked = isSkuFeedbackedPrice({ sku });
  const { type = '', disabledFeedbackPrice = false } = feedbacked || {};
  const [isShowModalHighPrice, toggleModalHighPrice] = useModal();

  return (
    <>
      <div className={styles.warpperFeedback}>
        <div>
          <Typography className={clsx(styles.nameFeedback, isDetailMV2 && styles.nameFeedback_mv2)}>Bạn thấy giá này?</Typography>
        </div>
        <div className={clsx(styles.warpperIcon, isDetailMV2 && styles.warpperIcon_mv2)}>
          <Tooltip title={disabledFeedbackPrice ? `Bạn đã phản hồi cho ${BRAND_NAME} trong tuần này` : 'Giá hợp lý'}>
            <span>
              <IconButton
                aria-label="like"
                disabled={disabledFeedbackPrice}
                onClick={() => sendLikeFeedback({ sku, productId })}
                className={clsx(
                  (disabledFeedbackPrice && type === LIKE_FEEDBACK_CODE && styles.feedbackPriceBtnChosen) ||
                    (disabledFeedbackPrice && type === DISLIKE_FEEDBACK_CODE && styles.feedbackPriceBtnDisable) ||
                    styles.feedbackPriceBtn,
                  isDetailMV2 && styles.feedback_style_mv2,
                )}
              >
                <ThumbUpAltOutlinedIcon
                  fontSize="small"
                  className={clsx(
                    (disabledFeedbackPrice && type === LIKE_FEEDBACK_CODE && styles.feedbackPriceIconChosen) ||
                      (disabledFeedbackPrice && type === DISLIKE_FEEDBACK_CODE && styles.feedbackPriceIconDisable) ||
                      styles.feedbackPriceIcon,
                    isDetailMV2 && styles.feedback_style_mv2,
                  )}
                />
              </IconButton>
            </span>
          </Tooltip>
          <span className={styles.text_rate}>Hợp lý</span>
        </div>
        <div
          className={clsx(styles.warpperIcon, {
            [styles.warpperIcon_mv2]: isDetailMV2,
          })}
        >
          <Tooltip title={disabledFeedbackPrice ? `Bạn đã phản hồi cho ${BRAND_NAME} trong tuần này` : 'Giá cao'}>
            <span>
              <IconButton
                disabled={disabledFeedbackPrice}
                onClick={toggleModalHighPrice}
                className={clsx(
                  (disabledFeedbackPrice && type === DISLIKE_FEEDBACK_CODE && styles.feedbackPriceBtnChosen) ||
                    (disabledFeedbackPrice && type === LIKE_FEEDBACK_CODE && styles.feedbackPriceBtnDisable) ||
                    styles.feedbackPriceBtn,
                  isDetailMV2 && styles.feedback_style_mv2,
                )}
              >
                <ThumbDownAltOutlinedIcon
                  fontSize="small"
                  className={clsx(
                    (disabledFeedbackPrice && type === DISLIKE_FEEDBACK_CODE && styles.feedbackPriceIconChosen) ||
                      (disabledFeedbackPrice && type === LIKE_FEEDBACK_CODE && styles.feedbackPriceIconDisable) ||
                      styles.feedbackPriceIcon,
                    isDetailMV2 && styles.feedback_style_mv2,
                  )}
                />
              </IconButton>
            </span>
          </Tooltip>
          <span className={styles.text_rate}>Cao</span>
        </div>
      </div>
      {isShowModalHighPrice && (
        <FeedbackPriceFormModal productId={productId} sku={sku} visible={isShowModalHighPrice} onClose={toggleModalHighPrice} />
      )}
    </>
  );
};

export default FeedbackPrice;
