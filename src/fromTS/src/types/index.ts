export interface IMessage {
  _id: string;
  content: string;
  conversationID: number;
  createdTime: string;
  isQuickMessage: boolean;
  messageID: number;
  messageOrder: number;
  messageType: string;
  senderID: number;
  sessionID: string;
  topicID: number;
  type: string;
  date: string | number | undefined;
  fileName: string[];
  URLMedia: string;
  groups: string[];
}

export interface IMess {
  date: string;
  mess: IMessage[];
}

export interface IConversation {
  conversationName: string;
  conversationID: string;
}
