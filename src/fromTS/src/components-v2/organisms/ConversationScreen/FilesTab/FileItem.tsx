/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { Button, Popover, Typography } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { getData } from 'clients';
import { listMessage, postListScrollDown, postOne } from 'clients/ChatClient';
import clsx from 'clsx';
import conversationStyles from 'components-v2/organisms/ConversationScreen/styles.module.css';
import { BRAND_NAME } from 'constants/Enums';
import { DOCS, IMG, MORE, PDF, VIDEO, XSL } from 'constants/Icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { isPrd } from 'sysconfig';
import { DateTimeUtils, NotifyUtils } from 'utils';
import { downloadPDFFile } from 'utils/EventUtils';
import { truncateFileName } from 'utils/StringUtils';
import { groupTypeofFileByExtension } from 'utils/ValidateUtils';
import { TABS } from '../constants';
import { IChatMessage, IFiles, IMessageContent, IStatusLoading, TFileType, TMessageType } from '../IfcConversation';
import { validAction } from './constants';
import styles from './styles.module.css';

interface IExtendBtn {
  URLMedia: string;
  fileName: string;
  isGuest: boolean;
  guestID: number;
  groupType: string;
  isWebView: boolean;
  messageID: number;
  conversationID?: number;
  createdTime: string;
  setTab: Dispatch<
    SetStateAction<{
      param: string;
      name: string;
    }>
  >;
  chatMessages: IChatMessage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setChatMessages: Dispatch<any>;
  action: IStatusLoading;
  setAction: Dispatch<SetStateAction<IStatusLoading>>;
  conversationType: string;
  messageType: TMessageType;
  resourceCode: string;
  resourceID?: number;
  senderID?: number;
  topicID?: number;
  type: TFileType;
}

const FILE_ICON: Record<string, JSX.Element> = {
  PDF: <PDF />,
  IMAGE: <IMG />,
  VIDEO: <VIDEO />,
  XLS: <XSL />,
  DOCS: <DOCS />,
  OTHER: <DescriptionIcon style={{ width: '60px', height: '60px' }} color="primary" />,
};

const InitMessageContent: IMessageContent = {
  URLMedia: [],
  conversationType: '',
  createdTime: '',
  fileName: [],
  messageType: 'CS_TO_CUSTOMER',
  resourceCode: '',
  type: 'TEXT',
};

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

const SEND_TO: Record<string, Record<string, string>> = {
  NORMAL: {
    CS_TO_CUSTOMER: `${BRAND_NAME} - hỗ trợ`,
    CUSTOMER_TO_CS: 'Tôi',
  },
  GUEST: {
    CS_TO_GUEST: `${BRAND_NAME} - hỗ trợ`,
    GUEST_TO_CS: 'Tôi',
  },
};

function ExtendBtn({
  URLMedia = '',
  fileName = '',
  groupType = '',
  isWebView = false,
  isGuest,
  guestID = 0,
  messageID,
  conversationID,
  createdTime,
  setTab,
  chatMessages,
  setChatMessages,
  action,
  setAction,
  ...props
}: IExtendBtn) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const id = open ? 'simple-popper' : undefined;
  // eslint-disable-next-line no-nested-ternary
  const typeText = groupType === 'IMAGE' ? 'ảnh' : groupType === 'VIDEO' ? 'video' : 'file';
  const handleMoveToMessage = async ({
    setTab,
    messageID,
    conversationID,
  }: {
    setTab: Dispatch<
      SetStateAction<{
        param: string;
        name: string;
      }>
    >;
    messageID: number;
    conversationID?: number;
  }) => {
    const TIME_DELAY = 1200; // time wait for all messages have rendered

    if (!conversationID && !messageID) {
      setAction((prev) => ({ ...prev, isMovingHistory: false }));
      return;
    }

    try {
      // check if file which user want to find in chatMessages
      const hasMessage = chatMessages.some((message) => message.messageID === messageID);
      const tickAndMoveElement = (messageID: number) => {
        const idMessage = `message-${messageID}`;
        const messageElement = document.getElementById(idMessage);
        messageElement?.scrollIntoView({ block: 'center', behavior: 'auto' });
        messageElement?.classList.add(conversationStyles.listMessage_module_message_animation);
      };

      if (hasMessage) {
        setTab(TABS.chat);
        setTimeout(() => {
          tickAndMoveElement(messageID);
        }, TIME_DELAY);
        return;
      }

      const [resSelectedFile, resListMessage, resListScrollDown] = await Promise.all([
        postOne(messageID, true),
        listMessage({ ctx: '', conversationID, lastMessageID: messageID, isGuest, guestID }),
        postListScrollDown(
          {
            conversationID,
            lastMessageID: messageID,
          },
          isGuest,
          guestID,
        ),
      ]);
      setTab(TABS.chat);
      // newMessages contains : 20 messages above messages found + messages found + all messages below is messages found
      const newMessages = [...getData(resSelectedFile), ...getData(resListMessage), ...getData(resListScrollDown)];
      setChatMessages(newMessages);

      setTimeout(() => {
        tickAndMoveElement(messageID);
      }, TIME_DELAY);
    } catch (err) {
      NotifyUtils.error(err.message);
    }
  };

  return (
    <>
      <Button aria-describedby={id} classes={{ root: styles.iconItemMore }} onClick={handleClick}>
        <MORE />
      </Button>
      <Popover
        classes={{ paper: styles.rootPopover }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClick={handleClick}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        style={{ width: '100%' }}
      >
        <Typography
          onClick={() => {
            if (isWebView) {
              const message = `DOWNLOAD~${URLMedia}`;
              // if (window?.ReactNativeWebView) {
              window?.ReactNativeWebView?.postMessage(message);
              // }
              window?.postMessage(message);
              !isPrd && NotifyUtils.success(`send postMessage ${message}`);
            } else {
              downloadPDFFile(URLMedia, fileName);
            }
          }}
          variant="body2"
          style={{ fontFamily: 'ggsm', fontSize: '17px' }}
        >
          Tải {typeText}
        </Typography>
        <Typography
          className={clsx(validAction(createdTime) && styles.disabledAction)}
          onClick={() => {
            handleMoveToMessage({ setTab, messageID, conversationID });
          }}
          variant="body2"
          style={{ fontFamily: 'ggsm', fontSize: '17px' }}
        >
          Xem trong chat
        </Typography>
      </Popover>
    </>
  );
}

function FileItem({
  fileName,
  createdTime,
  messageType,
  URLMedia,
  isGuest,
  guestID = 0,
  isWebView,
  conversationID,
  messageID,
  setTab,
  chatMessages,
  setChatMessages,
  action,
  setAction,
  ...props
}: IFiles) {
  const extension = fileName.split('.').pop();
  const groupType = groupTypeofFileByExtension(extension);
  const mySelf = isGuest ? 'GUEST' : 'NORMAL';

  return (
    <div className={styles.rootItem}>
      <div className={styles.iconItem}>{FILE_ICON[groupType]}</div>
      <div className={styles.contentItem}>
        <Typography className={clsx(styles.fileNameItem, 'lineLimit1')} variant="h6">
          {truncateFileName(fileName, 30)}
        </Typography>
        <Typography className={styles.timeItem} variant="subtitle1">
          {DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm')}
        </Typography>
        <Typography className={styles.infoItem} variant="subtitle1">
          Người Gửi: {SEND_TO[mySelf][messageType]}
        </Typography>
      </div>
      <div style={{ flexShrink: 0 }}>
        <ExtendBtn
          URLMedia={URLMedia}
          fileName={fileName}
          isGuest={isGuest}
          guestID={guestID as number}
          groupType={groupType}
          isWebView={isWebView}
          conversationID={conversationID}
          messageID={messageID}
          createdTime={createdTime}
          messageType={messageType}
          setTab={setTab}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          action={action}
          setAction={setAction}
          {...props}
        />
      </div>
    </div>
  );
}

export default FileItem;
