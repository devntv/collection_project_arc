/* eslint-disable no-shadow */
export enum conversationStatus {
  WAIT_TO_PROCESS = 'WAIT_TO_PROCESS',
  PROCESSING = 'PROCESSING',
  WAIT_TO_COMPLETE = 'WAIT_TO_COMPLETE',
  COMPLETED = 'COMPLETED'
}

export const ENUM_CONVERSATION_STATUS: Record<conversationStatus, string> = {
  [conversationStatus.WAIT_TO_PROCESS]: 'WAIT_TO_PROCESS',
  [conversationStatus.PROCESSING]: 'PROCESSING',
  [conversationStatus.WAIT_TO_COMPLETE]: 'WAIT_TO_COMPLETE',
  [conversationStatus.COMPLETED]: 'COMPLETED'
}

export default {
    ENUM_CONVERSATION_STATUS
}