/* eslint-disable react/no-unused-prop-types */
/**
 * @author :  hai.tran@thuocsi.vn
 * @release : 25/12/2022
 */

import { Button, Grid, IconButton, Paper, TextareaAutosize, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { postRating } from 'clients/ChatClient';
import clsx from 'clsx';
import {
  ICON_MOBILE_ICON_RATING_STAR,
  ICON_MOBILE_ICON_RATING_STAR_FILL,
  ICON_MOBILE_ICON_RATING_STAR_NOT_FILL,
  ICON_MOBILE_ICON_RATING_SUCCESS,
} from 'constants/Icons';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { NotifyUtils } from 'utils';
import useChat from 'zustand-lib/useChat';

import CloseIcon from '@material-ui/icons/Close';
import { getFirst, isValid } from 'clients';
import { ENUM_CONVERSATION_STATUS } from 'constants/Chat';
import styles from './styles.module.css';

const title = 'Bạn có hài lòng về nhân viên hỗ trợ?';
const btnName = 'Đánh giá';
const ratingTextPlaceHolder = 'Nhập ý kiến đóng góp';
const ratingSuccessTitle = 'Đánh giá thành công';
const thankyouText = 'thuocsi.vn cảm ơn ý kiến đóng góp của bạn';
const warningMissingStar = 'Vui lòng lựa chọn sao đánh giá!';

type ConversationStatusType = 'WAIT_TO_PROCESS' | 'PROCESSING' | 'WAIT_TO_COMPLETE' | 'COMPLETED';
interface IAction {
  isSent: boolean;
  isDisplaySent: boolean;
  isMovingHistory: boolean;
  isGoingUp: boolean;
  isRatingClicked: boolean;
  isRatingSubmitted: boolean;
  isRatingSuccess: boolean;
  isHideRating: boolean;
}
interface IRating {
  text: string;
  star: number;
}
interface IRatingForm {
  rating: IRating;
  setRating: Dispatch<SetStateAction<IRating>>;
  conversationStatus: ConversationStatusType;
  conversationID: number;
  action: IAction;
  setAction: Dispatch<SetStateAction<IAction>>;
  handleCloseRatingForm: () => void;
  isGuest: boolean;
  guestID: number;
  handleInitRatingValue: () => void;
}

interface IRatingSuccess {
  handleClose: () => void;
}

const RatingSuccess = ({ handleClose }: IRatingSuccess): JSX.Element => (
  <>
    <Grid className={styles.ratingSuccess_title}>
      <ICON_MOBILE_ICON_RATING_SUCCESS />
      <IconButton className={styles.ratingFormSuccess_closeBtn} onClick={() => handleClose()}>
        <CloseIcon />
      </IconButton>
      <Typography variant="body2" component="span" className={styles.ratingSuccess_text}>
        {ratingSuccessTitle}
      </Typography>
    </Grid>
    <Typography variant="body1" component="span" className={styles.ratingSuccess_message}>
      {thankyouText}
    </Typography>
  </>
);

const RatingForm = ({
  rating,
  setRating,
  conversationStatus,
  conversationID,
  action,
  setAction,
  handleCloseRatingForm,
  isGuest,
  guestID,
  handleInitRatingValue,
}: IRatingForm): JSX.Element => {
  const scrollToBottom = () => {
    document.querySelector('#chatMobile_container')?.scrollTo({
      top: -1,
      behavior: 'smooth',
    });
  };

  const handleSetRatingText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valNote = e.target.value;
    setRating((prev) => ({ ...prev, text: valNote }));
  };
  useEffect(() => {
    if (conversationStatus !== ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE) {
      setAction((prev) => ({ ...prev, isRatingClicked: false }));
    }
  }, [conversationStatus]);
  const handleClickRatingStar = () => {
    setAction((prev) => ({ ...prev, isRatingClicked: true }));
    scrollToBottom();
  };
  const handleSubmitRating = async () => {
    try {
      if (rating.star < 1) {
        NotifyUtils.error(warningMissingStar);
      } else {
        const resPostRating = await postRating(conversationID, rating.text, rating.star, guestID, isGuest);
        if (isValid(resPostRating)) {
          setAction((prev) => ({ ...prev, isRatingSuccess: getFirst(resPostRating)?.isRealRating }));
          // clear rating state after submit rating
          handleInitRatingValue();
          scrollToBottom();
        } else {
          NotifyUtils.error(resPostRating.message);
        }
      }
    } catch (err) {
      NotifyUtils.error(err.message);
    }
  };

  return (
    <Grid
      className={clsx(
        styles.ratingForm_container,
        (conversationStatus === ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE || conversationStatus === ENUM_CONVERSATION_STATUS.COMPLETED) &&
          styles.ratingForm_showUpAnimation,
        (conversationStatus === ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE || conversationStatus === ENUM_CONVERSATION_STATUS.COMPLETED) &&
          action.isHideRating &&
          styles.ratingForm_hidden,
      )}
    >
      <Paper className={styles.ratingForm_wrapper}>
        {action.isRatingSuccess ? (
          <RatingSuccess handleClose={handleCloseRatingForm} />
        ) : (
          <>
            <Typography className={styles.ratingForm_title}>{title}</Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmitRating();
              }}
            >
              <Grid onClick={handleClickRatingStar} className={styles.ratingStar_container}>
                <Rating
                  className={styles.ratingStar_controller}
                  name="ratingForm_controller"
                  value={rating.star}
                  onChange={(_: React.ChangeEvent, newValue: number) => {
                    setRating((prev) => ({ ...prev, star: newValue }));
                  }}
                  size="large"
                  emptyIcon={rating.star !== null ? <ICON_MOBILE_ICON_RATING_STAR /> : <ICON_MOBILE_ICON_RATING_STAR_NOT_FILL />}
                  icon={<ICON_MOBILE_ICON_RATING_STAR_FILL />}
                />
              </Grid>
              {action.isRatingClicked && (
                <TextareaAutosize
                  id="ratingText"
                  className={styles.text_area}
                  name="note"
                  value={rating.text}
                  onChange={handleSetRatingText}
                  aria-label="note-cart"
                  placeholder={ratingTextPlaceHolder}
                  minRows={3}
                  maxRows={4}
                />
              )}
              <Button fullWidth disabled={rating.star === null} className={styles.ratingForm_btnSubmit} type="submit">
                {btnName}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default RatingForm;
