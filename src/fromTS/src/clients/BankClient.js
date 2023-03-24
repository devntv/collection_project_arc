import { CORE_API } from 'constants/APIUri';
import { GET, GET_ALL } from './Clients';

export const getBanks = async (ctx) => GET_ALL({ url: CORE_API.BANK_LIST, ctx });

export const getBankById = async ({ ctx, bankId }) => GET({ ctx, url: CORE_API.BANK_BY_ID, params: { bankId } });

export const getBranches = async ({ ctx, bankId }) =>
  GET_ALL({
    ctx,
    url: CORE_API.BANK_BRANCH_LIST,
    params: {
      bankId,
    },
  });

export const getBranchById = async ({ ctx, branchId }) =>
  GET({
    ctx,
    url: CORE_API.BANK_BRANCH_BY_ID,
    params: {
      branchId,
    },
  });

export default {
  getBanks,
  getBranches,
  getBankById,
  getBranchById,
};
