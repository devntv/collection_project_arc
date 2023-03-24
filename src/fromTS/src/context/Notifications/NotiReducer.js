const NotiReducer = (state, action) => {
  const { notification } = state;
  switch (action.type) {
    case 'INIT_WEB_SOCKET_SUCCESS':
      return {
        ...state,
        initSocket: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        notification: [...action.payload.notification],
        unread: action.payload.unread,
        total: action.payload.total,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        notification: [],
        unread: 0,
        total: 0,
        loading: false,
      };
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notification: [...notification],
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        notification: [],
        unread: 0,
        total: 0,
      };
    default:
      return state;
  }
};

export default NotiReducer;
