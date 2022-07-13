import validateUtil from "./validateUtil";

export function formatCurrency(n, separate = ".", currency) {
  const num = validateUtil.isNumber(n) ? n : 0;
  const s = String(num);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)}`;

  const cur = (currency && currency) || "đ";
  return ret + cur;
}
// formatCurrency(numb)

export function formatNumber(n, separate = ".") {
  const num = validateUtil.isNumber(n) ? n : 0;
  const s = String(num);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)} `;
  return ret;
}

// formatNumber(numb)

export function formatFloatNumber(n) {
  const num = validateUtil.isNumber(n) ? n : 0;
  const s = String(num);
  if (n % 1 !== 0) {
    const m = s.substr(0, s.indexOf(".") + 3);
    let numFormat = formatNumber(m);
    const index = numFormat.lastIndexOf(".");
    numFormat = `${numFormat.substring(0, index)},${numFormat.substring(
      index + 1
    )}`;
    if (numFormat.indexOf(",00") >= 0) {
      return numFormat.slice(0, -4);
    }
    if (numFormat[numFormat.length - 2] === "0") {
      return numFormat.slice(0, -2);
    }
    return numFormat;
  }
  return formatNumber(num);
}

// formatFloatNumber(numb) -> xxx.xxx  xxx.xxx,x

export function convertLargeNumb(x) {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split("e-")[1], 10);
    if (e) {
      x *= 10 ** e - 1;
      x = `0.${new Array(e).join("0")}${x.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(x.toString().split("+")[1], 10);
    if (e > 20) {
      e -= 20;
      x /= 10 ** e;
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}

// convertLargeNumb(numb) - 1000000000000000000000 js auto convert with 1e2 -> this func will be handle -> small numb

export default {
  formatCurrency,
  formatNumber,
  formatFloatNumber,
  convertLargeNumb,
};
