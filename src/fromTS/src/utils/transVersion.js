import { ACCOUNTS_TRIAL } from 'constants/data/mobile';
import { compareDesc } from 'date-fns';

export const checkTrialSelected = (user) => {
  const userSelected = ACCOUNTS_TRIAL[process.env.NEXT_PUBLIC_ENV === 'uat' ? 'prd' : process.env.NEXT_PUBLIC_ENV] || [];
  return userSelected?.some((element) => element === user?.customerID);
};

export const checkNewUser = (createdDate) => {
  const TIME_OPEN_TRIAL = 'November 24, 2022 00:00:00';
  return compareDesc(new Date(TIME_OPEN_TRIAL), new Date(createdDate)) >= 0;
};

export default {};
