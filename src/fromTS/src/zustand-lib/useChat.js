/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

import create from 'zustand';

const INITIAL_STATE = {
  listConversation: [],
  listMessageChat: [],
  currentConversation: null,
  sessionID: '',
  messageTotal: 0,
  messageSeen: 0,
  conversationID: '',
  lastestMessageID: '',
  triggerScrollBottom: 0,
  triggerCurrentDay: 0,
  triggerRating: 0,
  timeAutoTransferStatusToCompleted: 0,
  chatStatus: '',
  triggerFocusInput: false,
  triggerBlurInput: false,
  masterAddressObj: null,
  isWebView: false,
  triggerFetchMoreListTag: 0,
};

const useChat = create((set, get) => ({
  ...INITIAL_STATE,
  setConversation: (payload) => {
    const cur = get()?.listConversation;
    const updateCur = [...cur, payload];
    set({
      ...get(),
      listConversation: updateCur,
    });
    set({
      ...get(),
      listMessageChat: payload,
    });
  },
  setSessionID: (payload) => {
    set({
      ...get(),
      sessionID: payload,
    });
  },
  setRAWListMessageChat: (payload) => {
    set({
      ...get(),
      listMessageChat: payload,
    });
  },
  clearListMessageChat: () => {
    set({
      listMessageChat: '',
    });
  },
  clearState: () => {
    set(INITIAL_STATE);
  },
  setMessageTotal: (payload) => {
    set({
      ...get(),
      messageTotal: payload,
    });
  },
  setMessageSeen: (orderMessage) => {
    set({
      ...get(),
      messageSeen: orderMessage,
    });
  },
  setCurrentConversation: (conversation) => {
    set({
      currentConversation: conversation,
    });
  },
  setConversationID: (conversationID) => {
    set({
      ...get(),
      conversationID,
    });
  },
  setLastestMessageID: (lastestMessageID) => {
    set({
      ...get(),
      lastestMessageID,
    });
  },
  setTriggerScrollBottom: () => {
    set({
      ...get(),
      triggerScrollBottom: get()?.triggerScrollBottom + 1,
    });
  },
  setTriggerCurrentDay: () => {
    set({
      ...get(),
      triggerCurrentDay: get()?.triggerCurrentDay + 1,
    });
  },
  setTriggerRating: () => {
    set({
      ...get(),
      triggerRating: get()?.triggerRating + 1,
    });
  },
  setTimeAutoTransferStatusToCompleted: (time) => {
    set({
      ...get(),
      timeAutoTransferStatusToCompleted: time,
    });
  },
  clearTriggerRating: () => {
    set({
      triggerRating: INITIAL_STATE.triggerRating,
    });
  },
  setChatStatus: (status) => {
    set({
      ...get(),
      chatStatus: status,
    });
  },
  setTriggerFocusInput: () => {
    set({
      ...get(),
      triggerFocusInput: true,
    });
  },
  clearTriggerFocusInput: () => {
    set({
      ...get(),
      triggerFocusInput: INITIAL_STATE.triggerFocusInput,
    });
  },
  setTriggerBlurInput: () => {
    set({
      ...get(),
      triggerBlurInput: true,
    });
  },
  clearTriggerBlurInput: () => {
    set({
      ...get(),
      triggerBlurInput: false,
    });
  },
  setMasterAddressObj: (payload) => {
    set({
      ...get(),
      masterAddressObj: payload,
    });
  },
  setIsWebView: (payload) => {
    set({
      ...get(),
      isWebView: payload,
    });
  },
  setTriggerFetchMoreListTag: () => {
    set({
      ...get(),
      triggerFetchMoreListTag: get()?.triggerFetchMoreListTag + 1,
    });
  },
  setViewPortOffset: (value) => {
    set({
      ...get(),
      viewPortOffset: value,
    });
  },
  clearViewPortOffset: () => {
    set({
      ...get(),
      viewPortOffset: INITIAL_STATE.viewPortOffset,
    });
  },
}));

export default useChat;
