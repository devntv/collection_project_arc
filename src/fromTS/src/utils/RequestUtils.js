/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
export const cleanObj = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const convertObjectToParameter = (params) => {
  if (params == null) return '';

  return new URLSearchParams(cleanObj(params)).toString();
};

export default {
  convertObjectToParameter,
  cleanObj,
};
