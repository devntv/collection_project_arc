import { AuthClient, getFirst, isValid } from 'clients';

const wrapInfo = (info) => ({
  ...info,
  isActive: info.status === 'ACTIVE',
  isQuest: info.level === 'LEVEL_GUEST',
  createdTime: null,
  lastUpdatedTime: null,
});

export const getAccount = async (ctx) => {
  let userRes = null;
  if (ctx) {
    userRes = await AuthClient.getUserWithContext(ctx);
  } else {
    userRes = await AuthClient.getUser();
  }

  if (!isValid(userRes)) {
    return userRes;
  }

  const info = getFirst(userRes);

  const wrapData = wrapInfo(info);
  // change data
  return {
    ...userRes,
    data: [wrapData],
  };
};

// get core account
export const getAccountInfo = async ({ ctx }) => AuthClient.getAccountInfo({ ctx });

export const getAccountSessionToken = async ({ ctx }) => {
  const rest = await getAccountInfo({ ctx });
  if (!isValid(rest)) {
    return null;
  }
  const data = getFirst(rest);
  return data.session?.token || null;
};

export default { getAccount, getAccountSessionToken, getAccountInfo };
