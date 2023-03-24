import { API_GEN_TOKEN, API_UPLOAD, API_UPLOAD_DOCUMENT, API_UPLOAD_FILE, API_UPLOAD_IMAGE, CUSTOMER_API } from 'constants/APIUriV2';
import { LOYALTY_STATUS } from 'constants/Enums';
import { DELETE, GET, getData, GET_ALL, isValid, POST, PUT } from './Clients';

const retrySendSms = ({ code }) => {
  const url = CUSTOMER_API.RETRY_SEND_SMS;
  return POST({ url, params: { code } });
};

const sendSms = ({ phoneNumber }) => {
  const url = CUSTOMER_API.SEND_SMS;
  return POST({ url, body: { phone: phoneNumber } });
};

async function getOrder({ status }) {
  const url = CUSTOMER_API.ORDER + (status && status.length > 0 ? `?status=${status}` : '');
  return GET({ url, mock: true });
}

async function getReferral({ params }) {
  return GET({ url: CUSTOMER_API.REFERRAL, params });
}

export async function getWallet() {
  const result = await GET({ url: CUSTOMER_API.WALLET, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result;
}

export async function getPromo() {
  const result = await GET({ url: CUSTOMER_API.PROMO, mock: true });
  return getData(result);
}

export async function updateProfile(data) {
  const url = CUSTOMER_API.INFO;
  return PUT({ url, body: data });
}

export async function updateProfileEnterprise(data) {
  const url = CUSTOMER_API.UPDATE_INFO_ENTERPRISE;
  return PUT({ url, body: data });
}

export async function getBankAccount(ctx) {
  const url = CUSTOMER_API.BANK_ACCOUNT;
  const result = await GET({ url, ctx });
  return getData(result);
}

const getListAddress = async ({ ctx }) => GET({ url: CUSTOMER_API.ADDRESS_ACCOUNT, ctx });

const createAddress = async ({ ctx, body }) => POST({ url: CUSTOMER_API.ADDRESS_ACCOUNT, body, ctx });

const deleteAddress = async ({ ctx, code, customerID }) => DELETE({ url: CUSTOMER_API.ADDRESS_ACCOUNT, ctx, params: { code, customerID } });

const updateAddress = async ({ ctx, body }) => PUT({ url: CUSTOMER_API.ADDRESS_ACCOUNT, ctx, body });

const updateAddressDefault = async ({ ctx, code, customerID }) =>
  PUT({ url: CUSTOMER_API.ADDRESS_ACCOUNT, ctx, body: { code, isDefault: true, customerID } });

const getListLoyalty = async (ctx) => GET({ url: CUSTOMER_API.LOYALTY_LIST, ctx, params: { status: LOYALTY_STATUS.ACTIVE } });

const getListHistoryLoyalty = async ({ ctx, offset, limit, q, type = null }) =>
  GET({ url: CUSTOMER_API.HISTORY_LOYALTY_LIST, ctx, params: { offset, limit, getTotal: true, q, type } });
const getAllListHistoryLoyalty = async ({ ctx, q, type = null }) => GET_ALL({ url: CUSTOMER_API.HISTORY_LOYALTY_LIST, ctx, params: { q, type } });

const exchangeLoyalty = async ({ ctx, body }) => POST({ url: CUSTOMER_API.LOYALTY, ctx, body });

const uploadFile = async ({ ctx, body }) => POST({ url: CUSTOMER_API.UPLOAD_DOCUMENT, ctx, body });

const uploadDocument = async ({ ctx, body }) => POST({ url: API_UPLOAD_DOCUMENT, ctx, body, isBasic: true });

const uploadFileImage = async ({ ctx, body }) => POST({ url: API_UPLOAD_IMAGE, ctx, body, isBasic: true });

const genToken = async ({ ctx }) => GET({ url: API_GEN_TOKEN, ctx });

const upload = async ({ ctx, body }) => POST({ url: API_UPLOAD, ctx, mock: true, body });

const uploadFileGpp = async ({ ctx, body }) => POST({ url: API_UPLOAD_FILE, ctx, body });

const getListInvoiceInfo = async ({ ctx }) => GET({ url: CUSTOMER_API.INVOICE_LIST, ctx });

const createInvoiceInfo = async ({ ctx, body }) => POST({ url: CUSTOMER_API.INVOICE_INFO, body, ctx });

const deleteInvoiceInfo = async ({ ctx, code, customerID }) => DELETE({ url: CUSTOMER_API.INVOICE_INFO, ctx, params: { code, customerID } });

const updateInvoiceInfo = async (body) => {
  const url = CUSTOMER_API.INVOICE_INFO;
  return PUT({ url, body });
};

const updateInvoiceInfoOrder = async (body) => {
  const url = '/marketplace/order/v2/order/invoice';
  return PUT({ url, body });
};

const getBankAccountInfo = async ({ ctx }) => GET({ url: CUSTOMER_API.BANK_ACCOUNT_LIST, ctx });

const createBankAccountInfo = async ({ ctx, body }) => POST({ url: CUSTOMER_API.BANK_ACCOUNT_INFO, body, ctx });

const updateBankAccountInfo = async ({ body }) => PUT({ url: CUSTOMER_API.BANK_ACCOUNT_INFO, body });

const getLevelList = async ({ ctx }) => GET({ url: CUSTOMER_API.LEVEL_LIST, ctx });

// update api updateAccountInfo apm - 173 - https://buymed.atlassian.net/browse/APM-173

const updateCustomerInfo = async (dataAccount) => PUT({ url: CUSTOMER_API.UPDATE_INFO_ACCOUNT, body: dataAccount });

// const updateInfoEnterprise = async (dataEnterprise) => PUT({ url: CUSTOMER_API.UPDATE_INFO_ENTERPRISE, body: dataEnterprise });

const updateCaculatePoints = async ({ signal }) => GET({ url: CUSTOMER_API.CACULATE_POINTS_CUSTOMER, signal });

export default {
  getOrder,
  getReferral,
  getWallet,
  getPromo,
  updateProfile,
  sendSms,
  retrySendSms,
  getBankAccount,
  getListAddress,
  createAddress,
  deleteAddress,
  updateAddressDefault,
  updateAddress,
  getListLoyalty,
  getListHistoryLoyalty,
  getAllListHistoryLoyalty,
  exchangeLoyalty,
  uploadFile,
  getListInvoiceInfo,
  getBankAccountInfo,
  createInvoiceInfo,
  deleteInvoiceInfo,
  updateInvoiceInfo,
  updateInvoiceInfoOrder,
  getLevelList,
  createBankAccountInfo,
  updateBankAccountInfo,
  uploadDocument,
  upload,
  uploadFileGpp,
  uploadFileImage,
  genToken,
  updateCustomerInfo,
  // updateInfoEnterprise,
  updateProfileEnterprise,
  updateCaculatePoints,
};
