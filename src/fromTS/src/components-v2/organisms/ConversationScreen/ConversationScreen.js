/* eslint-disable no-param-reassign */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import DateFnsUtils from '@date-io/date-fns';
import { Chip, CircularProgress, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getFirst, isValid } from 'clients';
import { listMessage, postDate, postListScrollDown, postRatingStatus } from 'clients/ChatClient';
import clsx from 'clsx';
import Message from 'components-v2/mocules/Message';
import { convertToDate, getEndTime, getStartTime } from 'components-v2/mocules/Message/constants';
import { ENUM_CONVERSATION_STATUS } from 'constants/Chat';
import { ICON_MOBILE_ICON_EMPTY_CHAT } from 'constants/Images/mobile/Icons';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DateTimeUtils, NotifyUtils } from 'utils';
import useChat from 'zustand-lib/useChat';
import FormSendMessage from './FormSendMessage';

import { groupChatByDate } from './func';
import RatingForm from './RatingForm';

import styles from './styles.module.css';

let lastScrollTop = 0;
let timer = null;
let pendingUpdate = false;
const minDatePicker = new Date().setDate(new Date().getDate() - 180);

const RenderDialogDatePicker = memo(
  ({
    isShowDatePicker,
    handleCloseDatePicker,
    selectedDate,
    setSelectedDate,
    isGuest,
    handleShowDatePicker,
    setStatusLoading,
    conversationID,
    setChatMessages,
    guestID,
    setCurrentDisplayDay,
  }) => {
    const handleChangeDate = async (date, isGuest = false) => {
      /* TODO: Have 3 API for this function
       - 1. API PostDate => base on start and end date. Return latestMessage Data. Need latestMessageID
       - 2. API listMessage => base on latestMessageID => Return 20 message before latestMessageId then setChatMessages by latestMessage with 20 message return 
       - 3. API postListScrollDown => base on latestMessageID => return all message from current to latestMessage then setChatMessages
      */
      let bodyScrollDown = {};
      let latestMessage = '';
      const startTime = getStartTime(date);
      const endTime = getEndTime(date);
      const body = {
        conversationID,
        endTime,
        startTime,
      };
      try {
        setStatusLoading((prev) => ({ ...prev, isMovingHistory: true, isAlreadyMovingHistory: true }));
        const resSelectDate = await postDate(body, isGuest);
        if (!isValid(resSelectDate)) {
          setStatusLoading((prev) => ({ ...prev, isMovingHistory: false }));
        } else {
          latestMessage = getFirst(resSelectDate);
          setChatMessages(resSelectDate.data);
          bodyScrollDown = {
            conversationID,
            lastMessageID: latestMessage.messageID,
          };
          const getScrollMessageID = `message-${latestMessage.messageID}`;
          const [resListMessage, resListScrollDown] = await Promise.all([
            listMessage({ conversationID, lastMessageID: latestMessage.messageID, isGuest, guestID }),
            postListScrollDown(bodyScrollDown, isGuest, guestID),
          ]);

          if (!isValid(resListMessage)) {
            setStatusLoading((prev) => ({ ...prev, isEndListMessage: true }));
          } else {
            setChatMessages((prev) => prev.concat(resListMessage?.data));
            setStatusLoading((prev) => ({ ...prev, isEndListMessage: false }));
          }
          if (!isValid(resListScrollDown)) {
            const resAllListMessage = await listMessage({ conversationID, isGuest, guestID });
            if (!isValid(resAllListMessage)) {
              NotifyUtils.error(resAllListMessage?.message);
            } else {
              setChatMessages(resAllListMessage?.data);
            }
          } else {
            setChatMessages((prev) => prev.concat(resListScrollDown?.data));
          }
          setTimeout(() => {
            setStatusLoading((prev) => ({ ...prev, isMovingHistory: false }));
            document.getElementById(getScrollMessageID)?.scrollIntoView({ block: 'center', behavior: 'auto' });
            setCurrentDisplayDay(DateTimeUtils.getFormattedDate(new Date(latestMessage?.createdTime)));
          }, 100);
        }
      } catch (err) {
        setStatusLoading((prev) => ({ ...prev, isMovingHistory: false, isEndListMessage: false }));
        NotifyUtils.error(err.message);
      }
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          open={isShowDatePicker}
          onClose={handleCloseDatePicker}
          value={selectedDate}
          onChange={(date) => {
            if (date > new Date()) {
              return false;
            }
            setSelectedDate(date);
            handleChangeDate(date, isGuest);
            return true;
          }}
          onClick={handleShowDatePicker}
          TextFieldComponent={({ ref, disabled, onChange, value }) => (
            <div ref={ref}>
              <input style={{ display: 'none' }} defaultValue={value} onChange={onChange} disabled={disabled} />
            </div>
          )}
          maxDate={new Date()}
          minDate={minDatePicker}
        />
      </MuiPickersUtilsProvider>
    );
  },
);

const ConversationScreen = ({
  chatMessages,
  setChatMessages,
  conversationID,
  setConversationID,
  conversationStatus = '',
  isGuest,
  guestID,
  scrollMessageID,
  currentDisplayDay,
  setCurrentDisplayDay,
  statusLoading,
  setStatusLoading,
  isWebView = false,
}) => {
  const [conStatus, setConStatus] = useState(conversationStatus ?? '');
  const [isShowDatePicker, setShowDatePicker] = useState(false);
  const [rating, setRating] = useState({
    text: '',
    star: null,
  });
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const groupArrays = groupChatByDate(chatMessages, isGuest);
  const scrollAutoBottom = useRef(null);
  const {
    listMessageChat,
    sessionID,
    triggerRating,
    clearListMessageChat,
    chatStatus,
    triggerFocusInput,
    triggerBlurInput,
    clearTriggerFocusInput,
    clearTriggerBlurInput,
    triggerFetchMoreListTag,
  } = useChat((state) => state);
  const scrollBottomRef = useRef(null);
  const headDatePicker = useRef(null);
  const DatePickerMovingRef = useRef(null);

  useEffect(() => {
    if (listMessageChat) {
      setChatMessages((e) => e.concat(listMessageChat));
    }
    return () => {
      // cancel the subscription
      clearListMessageChat();
    };
  }, [listMessageChat]);

  const fetchMoreMessage = async () => {
    const lastIndex = chatMessages?.length - 1 || 0;
    const lastMessageID = chatMessages ? chatMessages[lastIndex]?.messageID : null;
    const newMessLoadMore = await listMessage({ conversationID, lastMessageID, isGuest, guestID });
    if (newMessLoadMore.status === 'OK') {
      setChatMessages((e) => e.concat(newMessLoadMore.data));
      const getData = newMessLoadMore.data;
      const getLatestDate = DateTimeUtils.getFormattedDate(new Date(getData?.[getData.length - 1]?.createdTime));
      setCurrentDisplayDay(getLatestDate);
    } else {
      return false;
    }
    return true;
  };

  const { isFetching } = useInfiniteScroll(
    fetchMoreMessage,
    'top',
    scrollAutoBottom.current,
    statusLoading.isMovingHistory,
    statusLoading.isEndListMessage,
    true,
  );

  const showMessages = () => (
    <>
      {groupArrays.map((message) => (
        <Message
          key={message.date}
          message={message}
          isGuest={isGuest}
          statusLoading={statusLoading}
          setStatusLoading={setStatusLoading}
          setChatMessages={setChatMessages}
          conversationID={conversationID}
          scrollMessageID={scrollMessageID}
          isShowDatePicker={isShowDatePicker}
          setShowDatePicker={setShowDatePicker}
          headDatePicker={headDatePicker}
          isWebView={isWebView}
          chatMessages={chatMessages}
        />
      ))}
    </>
  );
  const handleInitRatingValue = () => {
    setRating({ text: '', star: null });
  };
  const handleCloseRatingForm = () => {
    setStatusLoading((prev) => ({ ...prev, isHideRating: true, isRatingSuccess: false }));
  };

  const handleCloseDatePicker = useCallback(() => {
    setShowDatePicker(false);
  }, []);

  const handleShowDatePicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const viewportOffset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
      document.getElementById('scrollDown_container')?.classList.add('hideElement');
      const fixedPosition = DatePickerMovingRef?.current?.getBoundingClientRect()?.top;
      const fixedHeight = DatePickerMovingRef?.current?.getBoundingClientRect()?.height;
      if (timer !== null) {
        clearTimeout(timer);
      }
      const currentScroll = scrollAutoBottom.current?.scrollTop; // Get Current Scroll Value
      if (currentScroll > lastScrollTop) {
        setStatusLoading((prev) => ({ ...prev, isGoingUp: false }));
        document.getElementById('movingDatePicker')?.classList?.remove('hiddenStopMoving');
      } else {
        setStatusLoading((prev) => ({ ...prev, isGoingUp: true }));
        document.getElementById('movingDatePicker')?.classList?.remove('hiddenStopMoving');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
      timer = setTimeout(() => {
        document.getElementById('movingDatePicker')?.classList?.add('hiddenStopMoving');
        document.getElementById('scrollDown_container')?.classList.remove('hideElement');
      }, 1000);
      document.querySelectorAll('.message_content')?.forEach((e) => {
        const curDate = e.attributes['data-curr']?.value;
        const toCrossPosition = e.getBoundingClientRect()?.top;
        const toCrossHeight = e.getBoundingClientRect()?.height;
        if (fixedPosition + fixedHeight < toCrossPosition) {
          // abort
        } else if (fixedPosition > toCrossPosition + toCrossHeight) {
          // abort
        } else if (!isFetching) {
          setCurrentDisplayDay(curDate);
        }
      });
      if (router.pathname === '/conversations') {
        if (isWebView) {
          document
            .querySelector('#scrollDown_container')
            ?.style?.setProperty('transform', `translateY(-${viewportOffset === 0 ? 50 : viewportOffset / 2.5}px)`);
          document
            .querySelector('#movingDatePicker')
            ?.style?.setProperty('transform', `translateY(${viewportOffset === 0 ? 75 : viewportOffset / 2.5}px)`);
        }
      }
    };

    if (scrollAutoBottom && scrollAutoBottom.current) {
      scrollAutoBottom?.current?.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      scrollAutoBottom?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [statusLoading.isGoingUp]);
  useEffect(() => {
    // Trigger event STATUS from Socket.
    (async () => {
      try {
        if (triggerRating && triggerRating > 0) {
          if (chatStatus !== ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE && chatStatus !== ENUM_CONVERSATION_STATUS.COMPLETED) {
            setConStatus(chatStatus);
            setStatusLoading((prev) => ({ ...prev, isRatingClicked: false, isHideRating: true }));
          } else {
            const resPostRatingStatus = await postRatingStatus(conversationID, isGuest);
            if (!isValid(resPostRatingStatus)) {
              setStatusLoading((prev) => ({ ...prev, isRatingSubmitted: false, isHideRating: true }));
            } else {
              const resData = getFirst(resPostRatingStatus);
              const { conversationStatus } = resData || {};
              setStatusLoading((prev) => ({
                ...prev,
                isRatingSubmitted: isGuest ? resData?.isRealRating : resData?.isCustomerRating,
                isRatingSuccess: false,
                isHideRating: false,
              }));
              setConStatus(conversationStatus);
              // ScrollToBottom when rating form appear
              setTimeout(() => {
                document.querySelector('#chatMobile_container')?.scrollTo({
                  top: -1,
                  behavior: 'smooth',
                });
              }, 500);
            }
          }
        }
      } catch (err) {
        NotifyUtils.error(err.message);
      }
    })();
  }, [triggerRating]);

  useEffect(() => {
    const viewportHandler = () => {
      if (pendingUpdate) return;
      pendingUpdate = true;

      requestAnimationFrame(() => {
        pendingUpdate = false;
        // get height of soft keyboard
        const viewportOffset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;

        // Stick to top
        if (!isWebView) {
          document.querySelector('#main div:first-child').style.transform = `translateY(${Math.max(0, window.visualViewport.offsetTop)}px)`;
        }
        document.querySelector('#idTabUtils').style.transform = `translateY(${Math.max(0, window.visualViewport.offsetTop)}px)`;
        // Stick to bottom for inputForm, chatContainer and ScrollDownAction
        if (window.visualViewport.offsetTop >= 0) {
          if (isWebView) {
            document.querySelector('#chatMobile_formChat').style.transform = `translateY(-${Math.max(
              0,
              window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop,
            )}px)`;
            document.querySelector('#chatMobile_container').style.transform = `translateY(-${Math.max(
              0,
              window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop,
            )}px)`;
          } else {
            document.querySelector('#chatMobile_wrapper').style.transform = `translateY(-${Math.max(0, viewportOffset)}px)`;
          }
        }
        if (isWebView) {
          window.scrollTo(`${Math.max(0, window.visualViewport.offsetTop)}`, 0);
        }
      });
    };

    window.visualViewport?.addEventListener('scroll', viewportHandler);
    window.visualViewport?.addEventListener('resize', viewportHandler);

    // prevent scroll enable when soft keyboard appear
    document.querySelector('#chatMobile_container')?.addEventListener('touchmove', (e) => e.stopPropagation());
    document.querySelector('#idTabUtils')?.addEventListener('touchmove', (e) => e.stopPropagation());
    document.querySelector('#mobileHeader_wrapper')?.addEventListener('touchmove', (e) => e.preventDefault());
    document.querySelector('#inputForm')?.addEventListener('touchmove', (e) => e.preventDefault());

    return () => {
      window.visualViewport?.removeEventListener('scroll', viewportHandler);
      window.visualViewport?.removeEventListener('resize', viewportHandler);

      document.querySelector('#main div:first-child')?.style.removeProperty('transform');
      document.querySelector('#idTabUtils')?.style?.removeProperty('transform');
      if (!isWebView) {
        document.querySelector('#chatMobile_wrapper')?.style.removeProperty('transform');
      } else {
        document.querySelector('#chatMobile_formChat')?.style.removeProperty('transform');
        document.querySelector('#chatMobile_container')?.style.removeProperty('transform');
      }
      clearTriggerFocusInput();
    };
  }, [triggerFocusInput]);

  useEffect(() => {
    if (triggerBlurInput) {
      const viewportOffset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
      document
        .querySelector('#movingDatePicker')
        ?.style?.setProperty('transform', `translateY(-${viewportOffset === 0 ? 100 : viewportOffset / 1.5})px`);
      document
        .querySelector('#chatMobile_formChat')
        ?.style?.setProperty('transform', `translateY(${viewportOffset === 0 ? 0 : `(-${Math.max(0, viewportOffset)}px)`})`);
    }
    return () => {
      if (!isWebView) {
        clearTriggerBlurInput();
      }
      document.querySelector('#idTabUtils')?.style?.setProperty('transform', `translateY(0px)`);
    };
  }, [triggerBlurInput]);

  useEffect(() => {
    function touchMove(e) {
      e.preventDefault();
    }
    const listTagEle = document.querySelector('#chatMobile_listTag');
    const hasVerticalScrollbar = listTagEle?.scrollHeight > listTagEle?.clientHeight;
    if (!hasVerticalScrollbar) {
      listTagEle?.addEventListener('touchmove', touchMove);
    } else {
      listTagEle?.addEventListener('touchmove', (e) => e.stopPropagation());
      // re-style CSS for device have large keyboard
      if (isWebView) {
        listTagEle?.classList?.add('chatMobile_smallListTag');
      }
    }
    document.querySelector('#chatMobile_childContainer')?.addEventListener('touchmove', touchMove);
    document.querySelector('#chatMobile_childContainer li')?.addEventListener('touchmove', touchMove);
    return () => {
      listTagEle?.removeEventListener('touchmove', (e) => e.stopPropagation());
      listTagEle?.removeEventListener('touchmove', touchMove);
      if (isWebView) {
        listTagEle?.classList?.remove('chatMobile_smallListTag');
      }
    };
  }, [triggerFetchMoreListTag]);

  useEffect(() => {
    // TODO: catch is multi line input message, will push up scrollDownBtn
    let calcBottom = `12%`; // default value
    const eleFormChat = document.querySelector('#chatMobile_formChat');
    if (!eleFormChat) return;
    const resizeObserver = new ResizeObserver(() => {
      const ilh = parseInt(window.getComputedStyle(document.querySelector('#chatMobile_textInput'), null).getPropertyValue('line-height'), 10); // input line height
      const getLines = Math.floor(document.querySelector('#chatMobile_textInput').scrollHeight / ilh); // get number line of input
      if (getLines > 5) {
        document.querySelector('#chatMobile_textInput')?.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
        document.querySelector('.root_input div:before')?.addEventListener('touchmove', (e) => e.preventDefault());
      }
      if (getLines > 1) {
        if (isWebView) {
          calcBottom = `calc(70px + ${getLines * 6}%)`;
        } else {
          calcBottom = `calc(12% + ${getLines * 2.5}%)`;
        }
      } else {
        if (isWebView) calcBottom = '70px';
        calcBottom = '12%';
      }
      document.querySelector('#scrollDown_container')?.style?.setProperty('bottom', calcBottom);
    });
    resizeObserver.observe(eleFormChat);
    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <>
      <div id="chatMobile_container" className={clsx(styles.container, isFetching && styles.block_container)} ref={scrollAutoBottom}>
        {statusLoading.isMovingHistory ? (
          <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '50px' }}>
            <CircularProgress size="32px" color="primary" />
          </div>
        ) : (
          <>
            {!isFetching && (
              <>
                <Chip
                  variant="default"
                  className={clsx(styles.shadowDatePicker_container, !statusLoading.isGoingUp && !isShowDatePicker && styles.hiddenShadowDatePicker)}
                  onClick={handleShowDatePicker}
                  label={DateTimeUtils.getFormattedDate(new Date(convertToDate(currentDisplayDay))) ?? ''}
                  id="movingDatePicker"
                  ref={DatePickerMovingRef}
                  classes={{
                    label: !currentDisplayDay && styles.hidden,
                  }}
                />
              </>
            )}
            {groupArrays.length > 0 ? (
              <>
                {!statusLoading.isRatingSubmitted && (
                  <RatingForm
                    rating={rating}
                    setRating={setRating}
                    conversationStatus={conStatus}
                    conversationID={conversationID}
                    action={statusLoading}
                    setAction={setStatusLoading}
                    handleCloseRatingForm={handleCloseRatingForm}
                    isGuest={isGuest}
                    guestID={guestID}
                    handleInitRatingValue={handleInitRatingValue}
                  />
                )}
                <>{showMessages()}</>
              </>
            ) : (
              <div className={styles.container_empty_chat}>
                <ICON_MOBILE_ICON_EMPTY_CHAT />
                <Typography variant="span" component="body2" className={styles.title_empty_chat}>
                  Xin chào <br /> Bạn cần hỗ trợ gì?
                </Typography>
              </div>
            )}
            {isFetching && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0px' }}>
                  <CircularProgress size="25px" />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <FormSendMessage
        conversationID={conversationID}
        setConversationID={setConversationID}
        isGuest={isGuest}
        sessionID={sessionID}
        element={scrollAutoBottom?.current}
        setStatusLoading={setStatusLoading}
        scrollBottomRef={scrollBottomRef}
        scrollAutoBottom={scrollAutoBottom}
        conversationStatus={conStatus}
        handleInitRatingValue={handleInitRatingValue}
        isAlreadyMovingHistory={statusLoading.isAlreadyMovingHistory}
        setChatMessages={setChatMessages}
        setSelectedDate={setSelectedDate}
      />
      <RenderDialogDatePicker
        isShowDatePicker={isShowDatePicker}
        handleCloseDatePicker={handleCloseDatePicker}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isGuest={isGuest}
        handleShowDatePicker={handleShowDatePicker}
        setStatusLoading={setStatusLoading}
        conversationID={conversationID}
        setChatMessages={setChatMessages}
        guestID={guestID}
        setCurrentDisplayDay={setCurrentDisplayDay}
      />
    </>
  );
};

export default ConversationScreen;
