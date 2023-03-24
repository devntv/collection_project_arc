import { BankClient, getFirst, isValid } from 'clients';

export const getBanks = async (ctx) => {
  const bankRes = await BankClient.getBanks(ctx);
  if (!isValid(bankRes)) {
    return [];
  }
  const banks = bankRes.data
    .map(({ name: label, bankId, code, value }) => ({ label, bankId, value, code }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return banks;
};

export const getBankById = async ({ ctx, bankId }) => {
  const bankRes = await BankClient.getBankById({ ctx, bankId });
  if (!isValid(bankRes)) {
    return null;
  }
  return getFirst(bankRes);
};
export const getBranchesByBankId = async ({ ctx, bankId }) => {
  const res = await BankClient.getBranches({ ctx, bankId });
  if (!isValid(res)) {
    return [];
  }
  return res.data
    .map(({ name: label, bankBranchId, value, code }) => ({ label, bankBranchId, value, code }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export default {
  getBanks,
  getBranchesByBankId,
  getBankById,
};
