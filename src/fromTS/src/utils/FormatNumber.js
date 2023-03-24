/* eslint-disable no-restricted-properties */
import ValidateUtils from './ValidateUtils';

export function formatCurrency(n, separate = '.', currency = 'đ') {
  const num = ValidateUtils.isNumber(n) ? n : 0;
  const s = String(num);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)}`;
  // currency = 0 for empty currency
  const cur = currency || '';
  return ret + cur;
}
export function formatNumber(n, separate = '.') {
  const num = ValidateUtils.isNumber(n) ? n : 0;
  const s = String(num);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)}`;
  return ret;
}
export function formatFloatNumber(n) {
  const num = ValidateUtils.isNumber(n) ? n : 0;
  const s = String(num);
  if (n % 1 !== 0) {
    const m = s.substr(0, s.indexOf('.') + 3);
    let numFormat = formatNumber(m);
    const index = numFormat.lastIndexOf('.');
    numFormat = `${numFormat.substring(0, index)},${numFormat.substring(index + 1)}`;
    if (numFormat.indexOf(',00') >= 0) {
      return numFormat.slice(0, -4);
    }
    // bỏ check số dạng 15,04 -> 15
    // if (numFormat[numFormat.length - 2] === '0') {
    //   return numFormat.slice(0, -3);
    // }
    return numFormat;
  }
  return formatNumber(num);
}
export function convertLargeNumb(x) {
  /* eslint-disable no-param-reassign */
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split('e-')[1], 10);
    if (e) {
      x *= 10 ** e - 1;
      x = `0.${new Array(e).join('0')}${x.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(x.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      x /= 10 ** e;
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}

export function formatRoundOf(n, p) {
  const n1 = n * Math.pow(10, p + 1);
  const n2 = Math.floor(n1 / 10);
  if (n1 >= n2 * 10 + 5) {
    return (n2 + 1) / Math.pow(10, p);
  }
  return n2 / Math.pow(10, p);
}

export default { formatNumber, formatCurrency, formatFloatNumber, formatRoundOf };
