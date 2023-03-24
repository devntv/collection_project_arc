export const hashCode = (text) => {
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < text.length; i += 1) {
    chr = text.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
export const encodeUrl = (url) => encodeURIComponent(url);
export const phoneNumberPattern = /(84|0|\+84)+([0-9]{9})\b/g;

export const changeAlias = (alias) => {
  if (!alias || alias.length === 0) {
    return '';
  }
  let str = alias;
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.trim();
  return str;
};
const searchStringInStrings = (arr, str) => {
  if (!str || str.length === 0) {
    return arr;
  }
  const searchValue = str.toUpperCase();
  const searchValueUnsigned = changeAlias(searchValue);
  const isUnSigned = searchValue === searchValueUnsigned;

  let rsUnSigned = arr.filter((el) => el?.unsignedKey?.toUpperCase().indexOf(searchValueUnsigned, 0) > -1);

  if (isUnSigned) {
    return rsUnSigned;
  }

  const arrSearch = searchValue.split(' ');
  for (let i = 0; i <= arrSearch.length; i += 1) {
    const w = arrSearch[i];

    if (w && w.length > 0 && changeAlias(w) !== w) {
      rsUnSigned = rsUnSigned.filter((el) => el.name.toUpperCase().indexOf(w, 0) > -1);
    }
  }

  return rsUnSigned;
};

export const firstUppercase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export const capitalizeTextFirst = (text) => firstUppercase(text?.toLocaleLowerCase() || '');

export const capitalizeText = (phrase) => {
  if (phrase === undefined) {
    return '';
  }
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const trimText = (text) =>
  text
    .trim()
    .split(' ')
    .filter((character) => character !== '')
    .join(' ');

export const trimNumber = (number) =>
  number
    .trim()
    .split(' ')
    .filter((digit) => digit !== '')
    .join('');

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

export const capitalizeFirstOfEachWords = (text) => {
  const splitStr = text?.trim()?.split(' ');
  if (splitStr?.length > 0) {
    const titleCaseArray = splitStr.map((word) => (word[0]?.toUpperCase() || '') + word.slice(1));
    return titleCaseArray.join(' ') || '';
  }
  return '';
};

export const truncateString = (text, length = 32, suffix = '...') => {
  if (typeof text !== 'string') {
    throw Error('text must be a string');
  }
  return text.length > length ? `${text.substring(0, length)}${suffix}` : text;
};

export const truncateFileName = (path, length = 32, suffix = '...') => {
  if (typeof path !== 'string') {
    throw Error('path must be a string');
  }
  const pathInfo = path.split('.');
  const extension = pathInfo.pop().toLowerCase();
  const fileName = pathInfo.join('');
  return `${truncateString(fileName, length, suffix)}.${extension}`;
};

const toBase64 = (str) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str));

export const getSlugFromUrl = ({ url = '' }) => {
  if (!url) return '';
  const urlSplits = url.split('/');
  return urlSplits.length > 0 ? urlSplits[urlSplits.length - 1] : url;
};

export default {
  hashCode,
  changeAlias,
  encodeUrl,
  searchStringInStrings,
  capitalizeText,
  capitalizeTextFirst,
  firstUppercase,
  trimText,
  trimNumber,
  titleCase,
  capitalizeFirstOfEachWords,
  toBase64,
  getSlugFromUrl,
  truncateString,
  truncateFileName,
  phoneNumberPattern,
};
