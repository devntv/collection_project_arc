const isEmpty = (item) => Object.keys(item) === 0;

export const groupArrayOfObjects = (list, key) =>
  list.reduce((rv, x) => {
    // eslint-disable-next-line no-param-reassign
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

export default {
  isEmpty,
  groupArrayOfObjects,
};
