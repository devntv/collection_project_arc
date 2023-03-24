// TODO: refactor API
import { ACCOUNT_API } from 'constants/APIUri';
import { GET, PUT } from './Clients';

export const getAccountInfo = async ({ ctx }) => GET({ url: ACCOUNT_API.GET_ACCOUNT_INFO, ctx });
const updateAccountInfo = async ({ ctx, dataUpdate }) => PUT({ ctx, url: ACCOUNT_API.GET_ACCOUNT_INFO, body: dataUpdate });

export default { getAccountInfo, updateAccountInfo };
