const convert = (event) => {
  const data = new FormData(event.target);
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of data.entries()) {
    result[key] = value;
  }
  return result;
};

export default { convert };
