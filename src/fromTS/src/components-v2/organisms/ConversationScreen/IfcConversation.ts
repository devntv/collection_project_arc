import { Dispatch, SetStateAction } from 'react';

export type TMessageType = 'CS_TO_CUSTOMER' | 'CUSTOMER_TO_CS';
export type TFileType = 'FILE' | 'IMAGE' | 'TEXT';
export interface IReactInfo {
  key: string;
  value: number;
}
export interface IChatMessage {
  _id: string;
  content: string;
  conversationID: number;
  conversationType: string;
  createdTime: string;
  isQuickMessage: boolean;
  messageID: number;
  messageOrder: number;
  messageType: TMessageType;
  reactInfo: IReactInfo[];
  senderID: number;
  sessionID: string;
  topicID: number;
  type: TFileType;
}

export interface IStatusLoading {
  isSent: boolean;
  isDisplaySent: boolean;
  isMovingHistory: boolean;
  isGoingUp: boolean;
  isRatingClicked: boolean;
  isRatingSubmitted: boolean;
  isRatingSuccess: boolean;
  isHideRating: boolean;
  isAlreadyMovingHistory: boolean;
  isEndListMessage: boolean;
}
export interface IMessageContent {
  URLMedia: string[];
  conversationID?: number;
  conversationType: string;
  createdTime: string;
  fileName: string[];
  messageID?: number;
  messageType: TMessageType;
  resourceCode: string;
  resourceID?: number;
  senderID?: number;
  topicID?: number;
  type: TFileType;
}
export interface IFiles {
  resourceID?: number;
  resourceCode: string;
  isGuest: boolean;
  guestID: number | null | undefined;
  URLMedia: string;
  fileName: string;
  createdTime: string;
  messageType: TMessageType;
  type: TFileType;
  isWebView: boolean;
  conversationID: number;
  messageID: number;
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
  senderID?: number;
  topicID?: number;
}
