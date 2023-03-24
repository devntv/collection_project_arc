import { DateTimeUtils } from 'utils';

export const validAction = (createdTime) => {
  if (createdTime < '0') return false;
  const getCreatedDay = DateTimeUtils.getFormattedDate(new Date(createdTime), 'YYYY-MM-DD');
  const formatUnixCurrentDay = Math.floor(new Date(getCreatedDay).getTime() / 1000);
  const get180dAgo = new Date().setDate(new Date().getDate() - 180);
  const formatUnix180dAgo = Math.floor(new Date(get180dAgo).getTime() / 1000);
  return formatUnixCurrentDay < formatUnix180dAgo;
};

export default {
  validAction,
};
