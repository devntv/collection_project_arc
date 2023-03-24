/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import { getFirst } from 'clients';
import { listForCustomer, listForGuest, pingToStayInConnect, seenConversation } from 'clients/ChatClient';
import { WEB_SOCKET_CHAT } from 'constants/APIintegration';
import { ENUM_CONVERSATION_STATUS } from 'constants/Chat';
import { UserType } from 'constants/Enums';
import { CHAT } from 'constants/Icons';
import { useAuth } from 'context';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useChat from 'zustand-lib/useChat';
import useChatGuest from 'zustand-lib/useChatGuest';
import BottomDrawerMV2 from '../Mobile/BottomDrawer';
import FormWalkInGuest from './FormWalkInGuest';
import styles from './styles.module.css';

const IconChat = ({ onClick, isAuthenticated }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { account, session = {} } = user || {};
  const { token, type: Type } = session || {};
  const closeSockerRef = useRef(false);
  const sessionRef = useRef(null);
  const guestState = useChatGuest((state) => state.getInfoGuest());
  const setGuestState = useChatGuest((state) => state.setInfoGuest);
  const [showGuestForm, setShowGuestForm] = useState(router.query?.form_guest && !isAuthenticated);

  const {
    setConversation,
    setSessionID,
    setMessageTotal,
    setCurrentConversation,
    setMessageSeen,
    setConversationID,
    setLastestMessageID,
    messageTotal,
    messageSeen,
    setTriggerScrollBottom,
    sessionID,
    conversationID,
    lastestMessageID,
    setTriggerRating,
    chatStatus,
    setChatStatus,
  } = useChat((state) => state);

  const getConversationByUser = async () => {
    let conversation = {};
    if (guestState && guestState.guestID) {
      const { guestID } = guestState;
      conversation = getFirst(await listForGuest({ guestID }));
    } else {
      conversation = getFirst(await listForCustomer({}));
    }
    return conversation;
  };

  const onCloseConnectionFromSocket = async () => {
    closeSockerRef.current = true;
  };
  const onOpenConnectionFromSocket = async () => {
    const conversation = await getConversationByUser();
    if (conversation && Object.keys(conversation).length !== 0) {
      const { conversationID, lastMessage, totalMessage, seenMessageOrder, conversationStatus } = conversation;
      if (guestState && Object.keys(guestState).length === 0) {
        setMessageTotal(totalMessage);
        setMessageSeen(seenMessageOrder);
        setCurrentConversation(conversation);
        setConversationID(conversationID);
        setLastestMessageID(lastMessage?.messageID);
      }
      setChatStatus(conversationStatus);
      if (conversationStatus !== ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE || conversationStatus !== ENUM_CONVERSATION_STATUS.COMPLETED) {
        setTriggerRating();
      }
    }
    closeSockerRef.current = false;
  };

  const messageToCurrentConversation = async (messageData) => {
    setConversation(messageData);
    setMessageTotal(messageData?.messageOrder);
    setTriggerScrollBottom();
    if (chatStatus === ENUM_CONVERSATION_STATUS.WAIT_TO_COMPLETE || chatStatus === ENUM_CONVERSATION_STATUS.COMPLETED) {
      const { conversationStatus } = (await getConversationByUser()) || {};
      setChatStatus(conversationStatus);
      setTriggerRating();
    }
  };

  const postSeenConversation = async () => {
    if (!conversationID) return;
    const body = {
      conversationID,
      lastMessageSeen: lastestMessageID,
      sessionID,
    };
    await seenConversation(body);
  };

  const updateSessionUser = useCallback((sessionID, conversationID, latestMessId) => {
    sessionRef.current = sessionID;
    setSessionID(sessionID);
    setConversationID(conversationID);
    setLastestMessageID(latestMessId);
    if (router.pathname === '/conversations') {
      postSeenConversation();
    }
  }, []);

  const pingRatingStatus = async () => {
    const conversation = await getConversationByUser();
    if (conversation && Object.keys(conversation).length !== 0) {
      const { conversationStatus } = conversation;
      setChatStatus(conversationStatus);
      setTriggerRating();
    }
  };
  const onMessageFromSocket = async (payload) => {
    const data = JSON.parse(payload.data);
    // some case handle for logged user, some case for guest and sone case for both
    switch (data.topic) {
      // logged user
      case 'AUTHORIZATION': {
        updateSessionUser(data.content.sessionID, conversationID, lastestMessageID);
        break;
      }

      // guest
      case 'GUEST_CONNECTION': {
        const {
          content: { sessionID = '', userID = null },
        } = data;
        sessionRef.current = sessionID;
        setGuestState({
          sessionID,
          userID,
        });
        break;
      }
      // both
      case 'MESSAGE': {
        const realData = data.content.data;
        messageToCurrentConversation(realData);
        break;
      }
      case 'SEEN': {
        break;
      }
      case 'STATUS': {
        pingRatingStatus();
        break;
      }
      default: {
        break;
      }
    }

    if (!token && !guestState?.sessionID) {
      updateSessionUser(data.content.sessionID, conversationID, lastestMessageID);
    }
  };

  const { sendMessage, readyState } = useWebSocket(WEB_SOCKET_CHAT, {
    onClose: onCloseConnectionFromSocket,
    onMessage: (payload) => {
      onMessageFromSocket(payload);
    },
    onOpen: onOpenConnectionFromSocket,
    shouldReconnect: () => true,
    reconnectInterval: 1000,
  });
  const isCustomer = useMemo(() => Type === UserType.CUSTOMER, [user]);

  const handleClickChat = () => {
    const handle = user ? onClick : () => setShowGuestForm(true);
    handle();
  };

  // send authentication request to socket (logged user)
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      let data = {};
      if (isCustomer) {
        data = {
          topic: 'AUTHORIZATION',
          content: {
            username: account?.username,
            type: Type,
            sessionToken: token,
          },
        };
        sendMessage(JSON.stringify(data));
      }
      if (guestState.guestID) {
        const data = {
          topic: 'GUEST_CONNECTION',
          content: {
            phoneNumber: guestState?.phoneNumber,
          },
        };
        sendMessage(JSON.stringify(data));
      }
    }
  }, [readyState, sendMessage, token]);

  // send authentication request to socket (walk-in guest)

  const ping30 = async () => {
    pingToStayInConnect({
      sessionID: sessionRef.current,
      isGuest: !isAuthenticated,
    });
  };

  // gửi request PING cập nhật trạng thái user
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (sessionRef.current) {
      const interval = setInterval(() => {
        ping30();
      }, 30000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [sessionRef.current]);
  useEffect(() => {
    if (router.pathname === '/conversations') {
      if (sessionID && conversationID && lastestMessageID) {
        postSeenConversation();
      }
    }
  }, [router, sessionID, conversationID, lastestMessageID]);

  const RenderUnSeenMesss = () => {
    const quantity = messageTotal - messageSeen;

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(quantity) || quantity === 0) return <></>;

    return (
      <Typography className={styles.mobileChat_badge} component="span">
        {quantity > 99 ? '99+' : quantity}
      </Typography>
    );
  };

  return (
    <>
      {router.pathname !== '/conversations' && (
        <div className={styles.containerIcon} onClick={handleClickChat}>
          <RenderUnSeenMesss />
          <Slide direction="up" in unmountOnExit>
            <Fab disableRipple classes={{ root: styles.rootFab }}>
              <CHAT />
            </Fab>
          </Slide>
        </div>
      )}
      <BottomDrawerMV2
        isShow={showGuestForm}
        classContainer={styles.drawerContainer}
        classContent={styles.drawerContent}
        offHeader
        handleClose={() => setShowGuestForm(false)}
      >
        <FormWalkInGuest sendMessage={sendMessage} />
      </BottomDrawerMV2>
    </>
  );
};

export default memo(IconChat);
