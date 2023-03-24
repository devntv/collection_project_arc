import { TICKET_API } from 'constants/APIUriV2';
import { DateTimeUtils } from 'utils';
import { GET, GET_ALL, POST, PUT } from './Clients';

const createFeedback = (body) => {
  const url = TICKET_API.TICKET;
  return POST({ url, body });
};
const createFeedbackDetailProduct = (body) => {
  const url = TICKET_API.TICKET_CREATESUPPORT;
  return POST({ url, body });
};
const createFeedbackWithoutLogin = (body) => {
  const url = TICKET_API.FEEDBACK_WITHOUT_LOGIN;
  return POST({ url, body, isBasic: true, isAuth: false });
};
export const getListReasons = (ctx) => {
  const url = TICKET_API.TICKET_REASONS;
  return GET({ url, ctx, params: { status: 'ACTIVE' } });
};

export const getListReasonsWithoutLogin = (ctx) => {
  const url = TICKET_API.TICKET_REASONS;
  return GET_ALL({ url, ctx, isBasic: true, isAuth: false });
};

const getListReasonsWithoutLoginMock = () => GET({ url: '/web/ticket/reasons', mock: true });

export const getListTicket = ({ ctx, offset, limit, getTotal, createdFrom, createdTo }) => {
  const url = TICKET_API.TICKET_LIST;
  const params = {
    offset,
    limit,
    getTotal,
  };

  const q = {};

  if (createdFrom) {
    q.createdFrom = DateTimeUtils.getDateStart(new Date(createdFrom)).toISOString();
  }
  if (createdTo) {
    q.createdTo = DateTimeUtils.getDateEnd(new Date(createdTo)).toISOString();
  }

  params.q = JSON.stringify(q);

  return GET({ url, ctx, params });
};

const getDetailTicket = ({ ctx, ticketId }) => {
  const url = TICKET_API.TICKET_DETAIL;
  const params = {
    ticketId,
  };
  return GET({ ctx, url, params });
};

const sendFeedback = (body) => POST({ url: TICKET_API.FEEDBACK, body });

const acceptFeedback = (body) => PUT({ url: TICKET_API.ACCEPT, body });

const uploadFile = async ({ ctx, body }) => POST({ url: TICKET_API.UPLOAD_FILE, ctx, body });
const uploadFileWithoutLogin = async ({ ctx, body }) => POST({ url: TICKET_API.UPLOAD_FILE, ctx, body, isBasic: true, isAuth: false });
const getTicketReturn = (orderId) => GET({ url: TICKET_API.RETURN_ORDER, params: { q: JSON.stringify({ orderId }) } });
const getVerifyTickerReturn = (orderId) => GET({ url: TICKET_API.VERIFY_RETURN_ORDER, params: { orderId } });
export default {
  createFeedback,
  sendFeedback,
  createFeedbackWithoutLogin,
  getListReasonsWithoutLoginMock,
  uploadFileWithoutLogin,
  getListReasons,
  getListTicket,
  getListReasonsWithoutLogin,
  uploadFile,
  createFeedbackDetailProduct,
  getDetailTicket,
  acceptFeedback,
  getTicketReturn,
  getVerifyTickerReturn,
};
