/* eslint-disable import/no-named-as-default-member */
import { isValid } from 'clients';
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import NotifyService from 'services/NofifyService';
import { NotifyUtils } from 'utils';
import NotiReducer from './NotiReducer';

export const NOTIFY_TYPES = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  INIT_WEB_SOCKET_SUCCESS: 'INIT_WEB_SOCKET_SUCCESS',
  INIT_WEB_SOCKET_FAIL: 'INIT_WEB_SOCKET_FAIL',
};

export const NotiContext = createContext();

export const NotiContextProvider = ({ children, initUser: user }) => {
  const initialState = { loading: true, notification: [], totalNotification: 0, initSocket: false };
  const [state, dispatch] = useReducer(NotiReducer, initialState);

  const fetchData = async () => {
    try {
      const totalNotification = await NotifyService.getTotalNotification({});
      if (!totalNotification) {
        return;
      }
      const { unread, total, read } = totalNotification;
      const notificationRes = await NotifyService.getNotifications({});
      if (isValid(notificationRes)) {
        dispatch({
          type: NOTIFY_TYPES.FETCH_SUCCESS,
          payload: { notification: notificationRes.data, unread, total, read },
        });
      } else {
        dispatch({ type: NOTIFY_TYPES.FETCH_ERROR });
      }
    } catch (error) {
      dispatch({ type: NOTIFY_TYPES.FETCH_ERROR });
    }
  };

  const initSocketFunc = useCallback(async ({ user: userInfo }) => {
    try {
      const url = `wss://${window.location.hostname}/integration/notification/v1/web-socket`;
      const ws = new WebSocket(url);
      // TODO
      const authSocket = async () => {
        // const accRes = await UserService.getAccountInfo({ ctx });
        // if (!isValid(accRes)) {
        //   return;
        // }
        // const accData = getFirst(accRes);
        const { account, session = {} } = userInfo || {};
        const { token, type } = session || {};
        const authMessage = {
          topic: 'AUTHORIZATION',
          content: {
            username: account?.username,
            sessionToken: token,
            type,
          },
        };
        // NotifyUtils.success(`SOCKET: send auth message ${JSON.stringify(authMessage)}`);
        ws.send(JSON.stringify(authMessage));
        dispatch({ type: NOTIFY_TYPES.INIT_WEB_SOCKET_SUCCESS });
      };

      ws.onopen = () => {
        // NotifyUtils.success('SOCKET: is open ');
      };
      ws.onclose = () => {
        // NotifyUtils.error('SOCKET: is closed ');
        authSocket({});
      };

      ws.onmessage = (e) => {
        try {
          // NotifyUtils.success('SOCKET: is on message ');
          const data = JSON.parse(e.data);
          if (data) {
            const { topic } = data;
            switch (topic) {
              case 'CONNECTED':
                authSocket({});
                break;
              case 'AUTHORIZATION':
                break;
              case 'CONNECTION':
                break;
              case 'PROMOTION':
                break;
              case 'EVENT':
                break;
              case 'ANNOUNCEMENT':
                NotifyUtils.info('Bạn có thông báo mới.');
                fetchData();
                break;
              case 'CART_UPDATE':
                NotifyUtils.info('Giỏ hàng vừa có sự thay đổi.');
                break;
              default:
                break;
            }
          }
        } catch (ex) {
          console.error(ex);
        }
      };
      //
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (!state.initSocket) {
        fetchData();
        initSocketFunc({ user });
      }
    } else {
      // clear all if don't have notification
      dispatch({ type: 'CLEAR_ALL' });
    }
  }, [initSocketFunc, user]);

  const markAll = async () => {
    const rest = await NotifyService.markReadAll({});
    fetchData();
    return rest;
  };

  const markReadByCode = async (code) => {
    const res = await NotifyService.markReadByCode({ code });
    fetchData();
    return res;
  };

  const contextValues = {
    ...state,
    markAll,
    markReadByCode,
  };

  return <NotiContext.Provider value={contextValues}>{children}</NotiContext.Provider>;
};

export const useNotify = () => useContext(NotiContext);
