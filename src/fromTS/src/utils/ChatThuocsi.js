/*
Internal chat with buyer
link doc : https://buymed.atlassian.net/wiki/spaces/TI/pages/569114992/H+ng+d+n+t+ch+h+p+component+buyer+chat
*/

import TicketFormModalV2 from 'components-v2/mocules/TicketFormModalV2';
import { ENUMS_CHAT_SETTING_VALUE } from 'constants/Enums';
import { useModal } from 'hooks';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { API_CHAT_DOMAIN } from 'sysconfig';
import { useStore } from 'zustand-lib/storeGlobal';
import { BuyerChat } from '../third-party/ChatTSBundle';
import { getSessionTokenClient } from './SessionUtils';

const Facebook = dynamic(() => import('utils/Facebook'), { ssr: false });

const ChatTS = () => {
  const [isShowPopupTicket, togglePoupTicket, getVal] = useModal();
  const [ticketDataCreated, setTicketData] = useState(null);
  const accessToken = getSessionTokenClient();
  const { origin } = window.location;
  const protocolWS = 'wss';

  const handlerSupportTicket = (type, data) => {
    switch (type) {
      case 'PRODUCT':
        togglePoupTicket({ productId: data.productID, ticketType: 'PRODUCT', productName: data.name, sku: data.sku });
        break;
      case 'ORDER':
        togglePoupTicket({ orderId: data.orderID || data.orderId, ticketType: 'ORDER', orderCode: data.orderCode });
        break;
      case 'ANY':
      default:
        togglePoupTicket({});
    }
  };

  const onSuccessCreateTicket = (data) => {
    setTicketData(data);
  };
  const TicketComponent = (
    <TicketFormModalV2 visible={isShowPopupTicket} onClose={togglePoupTicket} {...getVal()} onSuccess={onSuccessCreateTicket} />
  );

  return (
    <>
      <BuyerChat
        apiChatUrl="/backend"
        websocketChatUrl={`${protocolWS}://${API_CHAT_DOMAIN}/integration/chat/v1/web-socket`}
        clientWebUrl={origin}
        accessToken={accessToken}
        openSupportTicketCallbackFunc={handlerSupportTicket}
        onCreateTicketSuccess={onSuccessCreateTicket}
        ticketData={ticketDataCreated}
      />
      {isShowPopupTicket && TicketComponent}
    </>
  );
};

const MapChatComponent = {
  [ENUMS_CHAT_SETTING_VALUE.OFF]: <></>,
  [ENUMS_CHAT_SETTING_VALUE.MESSENGER]: <Facebook />,
  [ENUMS_CHAT_SETTING_VALUE.THUOCSI]: <ChatTS />,
};

const ChatThuocSi = () => {
  const chatSetting = useStore((state) => state.chatSetting);

  return <>{MapChatComponent[chatSetting]}</>;
};

export default ChatThuocSi;
