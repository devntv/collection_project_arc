import { getData, getFirst } from 'clients';
import { listForCustomer, listForGuest, listMessage, messageForGuest } from 'clients/ChatClient';
import clsx from 'clsx';
import { TABS } from 'components-v2/organisms/ConversationScreen/constants';
import ConversationScreen from 'components-v2/organisms/ConversationScreen/ConversationScreen';
import FilesTab from 'components-v2/organisms/ConversationScreen/FilesTab';
import LinksTab from 'components-v2/organisms/ConversationScreen/LinksTab';
import TabUtils from 'components-v2/organisms/ConversationScreen/TabUtils';
import Template from 'components/layout/Template';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services';
import CookieParser from 'utils/CookieParser';
import { getTitle } from 'utils/SEOUtils';
import useChat from 'zustand-lib/useChat';
import styles from './styles.module.css';

const title = getTitle('Chat với thuocsi');
const pageName = 'conversations';

const Conversation = ({ conversation, messages = [], isMobile, isGuest = false, guestID = 0, date }) => {
  const { conversationID: conversationId = '', conversationName = '', conversationStatus } = conversation || {};
  const { pathname, query, replace } = useRouter();
  const [statusLoading, setStatusLoading] = useState({
    isSent: true,
    isDisplaySent: true,
    isMovingHistory: false,
    isGoingUp: false,
    isRatingClicked: false,
    isRatingSubmitted: true,
    isRatingSuccess: false,
    isHideRating: false,
    isAlreadyMovingHistory: false,
    isEndListMessage: false,
  });
  const [chatMessages, setChatMessages] = useState(messages);
  const [currentDisplayDay, setCurrentDisplayDay] = useState(messages?.[messages.length - 1]?.createdTime ?? ''); // use for set current day onScroll
  const { setIsWebView } = useChat((state) => state);
  const CheckWebView = () => {
    const check = pathname === '/conversations' && query?.source === 'mobile_app';
    return check;
  };

  // const token = Cookies.get(ACCESS_TOKEN);
  // return pathname === '/conversations' && query?.source === 'mobile_app' && query.token === `${token}`;

  const isWebView = CheckWebView();

  // {/* TODO: FbMessenger  FEATURE-CHAT */}
  useEffect(() => {
    if (!isWebView && !conversation) {
      replace('/?form_guest=true');
    }
  }, []);

  // khi APP mới vào -> message =[] , state chatMessages dc tạo ra , use login xong -> router.push => lúc này messages có data nhưng state ChatMessage ko dc tạo lại, nên ko re-render
  useEffect(() => {
    setChatMessages(messages);
  }, [date]);

  const [conversationID, setConversationID] = useState(conversationId);

  useEffect(() => {
    setConversationID(conversationId);
  }, [conversationId]);

  useEffect(() => {
    setIsWebView(isWebView);
  }, []);

  const pageTitle = `${conversationName}`;
  const [tab, setTab] = useState(TABS.chat);

  return (
    <Template title={title} pageTitle={pageTitle} isMobile={isMobile} pageName={pageName} isWebView={isWebView}>
      <TabUtils tab={tab} setTab={setTab} TABS={TABS} isWebView={isWebView} isGuest={isGuest} />
      <div id="chatMobile_wrapper" className={clsx(styles.wrapper, isWebView && styles.top38px)}>
        {tab?.param === TABS.chat.param && (
          <ConversationScreen
            conversationID={conversationID}
            setConversationID={setConversationID}
            isGuest={isGuest}
            guestID={guestID}
            conversation={conversation}
            isWebView={isWebView}
            conversationStatus={conversationStatus}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            currentDisplayDay={currentDisplayDay}
            setCurrentDisplayDay={setCurrentDisplayDay}
            statusLoading={statusLoading}
            setStatusLoading={setStatusLoading}
            tab={tab}
          />
        )}
        {tab?.param === TABS.files.param && (
          <FilesTab
            conversationID={conversationID}
            isWebView={isWebView}
            setTab={setTab}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            action={statusLoading}
            setAction={setStatusLoading}
            setCurrentDisplayDay={setCurrentDisplayDay}
            isGuest={isGuest}
            guestID={guestID}
          />
        )}
        {tab?.param === TABS.links.param && <LinksTab conversationID={conversationID} isWebView={isWebView} />}
      </div>
    </Template>
  );
};

export default withLogin(Conversation, false);

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async (_, user) => {
    // handle guest
    if (!user) {
      const guestID = CookieParser.getCookieFromCtx(ctx, 'guestID');
      // TODO: chat-ts improve sau ( vì token truyền trên parans , chắc phải đè lại ở khâu header mới đúng )
      // if (!guestID) {
      //   return {
      //     redirect: {
      //       destination: '/?form_guest=true',
      //       permanent: false,
      //     },
      //   };
      // }
      const responseData = {};
      responseData.isGuest = true;
      responseData.guestID = guestID;
      const conversation = getFirst(await listForGuest({ guestID }));
      responseData.conversation = conversation;
      const { conversationID } = conversation || {};
      if (conversationID) responseData.messages = getData(await messageForGuest({ conversationID, guestID, getTotal: true }));
      return {
        props: responseData,
      };
    }
    // handle normal user
    const conversationRes = await listForCustomer({ ctx });
    const conversation = getFirst(conversationRes);
    let messRes;
    if (conversation) {
      const { conversationID = '' } = conversation;
      if (conversationID) {
        messRes = await listMessage({ ctx, conversationID });
      }
    }
    const messages = getData(messRes);
    return {
      props: {
        conversation,
        messages,
        isGuest: false,
        date: +new Date(),
      },
    };
  });
}
