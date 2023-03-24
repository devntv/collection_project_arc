import ValidateUtils from './ValidateUtils';

const covnertNumber = (number, defaultVal = 0) => {
  if (!ValidateUtils.isNumber(number)) {
    return defaultVal;
  }
  return Number(number);
};

export default {
  covnertNumber,
};
