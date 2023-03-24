export const convertArrayToMap = (arr, key) => new Map(arr.map((obj) => [obj[key], obj]));

export const convertArrayToMapValue = (arr = [], key, value) => new Map(arr.map((obj) => [obj[key], obj[value]]));

export const compare = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const sortComparer = (a, b) => a.localeCompare(b);

export const replacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  }
  return value;
};
export const reviver = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
};

export const unique = ({ data, key }) =>
  data.reduce((accumulator, item = {}) => {
    if (item[key]) return [...accumulator, item[key]];
    return accumulator;
  }, []);

export const fillInRange = (start = 0, end = 0) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

// var unique = a.filter(onlyUnique);
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// shuffle array
export const shuffle = (array) => {
  const result = [...array].sort(() => Math.random() - 0.5);
  return result;
};

export default { convertArrayToMap, compare, sortComparer, reviver, replacer, fillInRange, onlyUnique };
