import UserContext from "@thuocsi/nextjs-components/my-context/my-context";
import moment from "moment";
import { useContext } from "react";

export function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key];
    }
    return JSON.stringify(data);
}

export function formatTimeInvoice(isoDateString) {
    let date = moment(isoDateString);

    return `${date.date()} tháng ${date.month() + 1}, ${date.year()}`;
}

export function formatCurrencyVN(number) {
    number = roundUpHalf(number);
    return number
        .toString()
        .replace(/\./g, ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function roundUpHalf(num) {
    return Math.round(num * 100) / 100;
}

export function formatUTCTime(time) {
    let result = "";
    let date = new Date(time);
    let year = date.getUTCFullYear();
    let month =
        date.getMonth() + 1 < 10
            ? ("0" + (date.getMonth() + 1)).slice(-2)
            : date.getMonth() + 1;
    let day =
        date.getDate() < 10 ? ("0" + date.getDate()).slice(-2) : date.getDate();
    let hour =
        date.getHours() < 10
            ? ("0" + date.getHours()).slice(-2)
            : date.getHours();
    let minute =
        date.getMinutes() < 10
            ? ("0" + date.getMinutes()).slice(-2)
            : date.getMinutes();
    result = year + "-" + month + "-" + day + "T" + hour + ":" + minute;
    return result;
}

export function formatEditorData(text) {
    let data = text;
    data = data.replace(new RegExp("&nbsp;", "g"), "");
    data = data.replace(new RegExp("\n", "g"), "");
    data = data.replace(/`${"\"}`/g, "");
    data = data.replace(new RegExp('(style=".+?")', "g"), "");
    data = data.replace(new RegExp("<p><br></p>", "g"), "");
    data = data.replace(new RegExp("<p></p>", "g"), "");
    data = data.replace(new RegExp("<p ></p>", "g"), "");
    return data;
}

export function isAuthorizationAPI(apis = []) {
    const { loggedInUserInfo } = useContext(UserContext);

    if (!loggedInUserInfo) {
        return false;
    }

    let flag = false;

    apis.forEach((api) => {
        if (loggedInUserInfo.apis.includes(api)) flag = true;
    });

  if (!loggedInUserInfo.apis.includes("ALL/") && !flag) return false
  return true
}


export function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
      return false;
  }
  for (let key of keys1) {
      if (key === "minQuantity" || key === "minTotalPrice") {
          if (Number(object1[key] ?? 0) !== Number(object2[key] ?? 0)) {
              return false;
          }
      }
      else if (key !== "code") {
          if (object1[key]?.value !== object2[key]?.value) {
              return false;
          }
      }

  }
  return true;
}

export function deepEqual(object1 = {}, object2 = {}) {
  const keys1 = Object?.keys(object1);
  const keys2 = Object?.keys(object2);
  if (keys1.length !== keys2.length) {
      return false;
  }
  for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
          areObjects && !deepEqual(val1, val2) ||
          !areObjects && val1 !== val2
      ) {
          return false;
      }
  }
  return true;
}

export function isObject(object) {
  return object != null && typeof object === 'object';
}

export function arrayEquals(array1 = [], array2 = []) {
  return Array.isArray(array1) &&
      Array.isArray(array2) &&
      array1.length === array2.length &&
      array1.every((val, index) => array2.includes(val));
}

export function stringToSlug(str) {
    // remove accents
    const from =
            "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to =
            "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, "-")
        .replace(/-+/g, "-");

    return str;
}