import { ACCOUNTING_API, PAYMENT_WALLET_API } from 'constants/APIUriV2';
import { POST } from './Clients';

const getDebt = ({ customerId, ctx }) => POST({ url: ACCOUNTING_API.debt, body: { q: { customerId } }, ctx });
const getDebtCheck = ({ customerId, ctx }) => POST({ url: ACCOUNTING_API.DEBT_CHECK, body: { customerId }, ctx });

const getListOrders = ({ orderId, ctx }) => POST({ url: ACCOUNTING_API.DEBT_ORDER, body: { q: { orderId } }, ctx, debug: false });

// curl --location --request POST 'https://api.v2-stg.thuocsi.vn/payment/wallet/v1/me/transaction/list' \
// --data-raw '{
//     "q": {
//         "status": "SUCCESS",
//         "moneySource": "CREDIT"
//     }
// }'

const getListTransactions = ({ orderId, debug = false, status = null, moneySource = 'CREDIT', ctx, ...restProps }) =>
  POST({ url: PAYMENT_WALLET_API.TRANSACTIONS, body: { q: { refAll: [`ORDER/${orderId}`], moneySource, status, ...restProps }, debug }, ctx });

export default { getDebt, getDebtCheck, getListOrders, getListTransactions };
