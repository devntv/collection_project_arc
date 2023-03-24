const getHtml = (string, key, eof) => {
  const begin = string.indexOf(key) + key.length;
  const end = begin + string.slice(begin).indexOf(eof);
  return begin > -1 && end > -1 ? string.slice(begin, end) : '';
};
export default getHtml;
