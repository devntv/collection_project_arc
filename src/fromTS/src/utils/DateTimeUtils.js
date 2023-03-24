const getFirstDateOfWeek = () => {
  const firstWeek = new Date();
  firstWeek.setDate(firstWeek.getDate() - firstWeek.getDay());
  firstWeek.setHours(24, 0, 0, 0);
  return firstWeek;
};

const getDateStart = (date = new Date()) => {
  date.setHours(0, 0, 0, 0);
  return date;
};

const getDateEnd = (date = new Date()) => {
  date.setHours(24, 0, 0, 0);
  return date;
};

function getDayOfWeek(n) {
  if (n === 1) return 'Thứ Hai';
  if (n === 2) return 'Thứ Ba';
  if (n === 3) return 'Thứ Tư';
  if (n === 4) return 'Thứ Năm';
  if (n === 5) return 'Thứ Sáu';
  if (n === 6) return 'Thứ bảy';
  return 'Chủ Nhật';
}

function getFormattedDate(date, format = 'DD/MM/YYYY') {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return format
    .replace('DD', String(day).padStart(2, '0'))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('YYYY', year)
    .replace('HH', String(hour).padStart(2, '0'))
    .replace('mm', String(minute).padStart(2, '0'))
    .replace('ss', String(second).padStart(2, '0'));
}

function parseDateTimeToNumber(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return Number(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
}

function diffDate(timeA, timeB) {
  return parseDateTimeToNumber(timeA) - parseDateTimeToNumber(timeB);
}

function getFormattedWithDate(date, format = 'd (DD/MM/YYYY)') {
  const dayOfWeek = date.getDay();

  return getFormattedDate(date, format).replace('d', getDayOfWeek(dayOfWeek));
}

// https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
function compareTime(timeA, timeB) {
  const dA = new Date(timeA);
  const dB = new Date(timeB);
  const tA = dA.getTime();
  const tB = dB.getTime();
  if (tA === tB) return 0;
  if (dA > dB) return 1;
  return -1;
}

function compareDate(dateA, dateB) {
  const dA = new Date(dateA);
  const dB = new Date(dateB);

  const isEqualYear = dA.getFullYear() === dB.getFullYear();
  const isEqualMonth = dA.getMonth() === dB.getMonth();
  const isEqualDate = dA.getDate() === dB.getDate();

  return isEqualYear && isEqualMonth && isEqualDate;
}

function addHours(time, hours = 0) {
  const t = new Date(time);
  if (hours === 0) return t;
  t.setHours(t.getHours() + hours);
  return t;
}

//  Time ago func
const SECOND = 1;
const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const MONTH = 2629746;
const YEAR = 31556952;
const DECADE = 315569520;

const getTimeAgo = (date) => {
  const now = new Date();
  const diff = Math.round((now - +new Date(date)) / 1000);
  let unit = '';
  let num = 0;

  switch (true) {
    case diff <= 0:
      return 'Mới đây';

    case diff < MINUTE:
      num = Math.round(diff / SECOND);
      unit = 'giây';

      break;

    case diff < HOUR:
      num = Math.round(diff / MINUTE);
      unit = 'phút';

      break;

    case diff < DAY:
      num = Math.round(diff / HOUR);
      unit = 'giờ';

      break;

    case diff < MONTH:
      num = Math.round(diff / DAY);
      unit = 'ngày';

      break;

    case diff < YEAR:
      num = Math.round(diff / MONTH);
      unit = 'tháng';

      break;

    case diff < DECADE:
      num = Math.round(diff / YEAR);
      unit = 'năm';

      break;

    default:
      num = Math.round(diff / YEAR);
      unit = 'năm';
  }

  let str = '';
  if (num) {
    str += `${num} `;
  }

  str += `${unit}`;

  str += ' trước';

  return str;
};

export const DAY_SECONDS = 24 * 60 * 60;

export const getFirstDayOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

// hàm trả STATUS của time ACTIVE/DISABLED/NEXT

export function calStatusTimeFunc(startTimeDate, endTimeDate) {
  const curTime = new Date();
  let status = 'ACTIVE';
  if (endTimeDate < curTime) {
    status = 'DISABLED';
  } else if (curTime < startTimeDate) {
    status = 'NEXT';
  }
  return status;
}

// convert gmt7 time
function convertStartDate(time) {
  const start = new Date(time);
  start.setHours(0, 0, 0);
  return start.toISOString();
}
function convertEndDate(time) {
  const end = new Date(time);
  end.setHours(23, 59, 0);
  return end.toISOString();
}

export default {
  calStatusTimeFunc,
  getFormattedDate,
  getDayOfWeek,
  getFormattedWithDate,
  getTimeAgo,
  DAY_SECONDS,
  compareTime,
  addHours,
  getFirstDayOfMonth,
  getFirstDateOfWeek,
  getDateStart,
  getDateEnd,
  parseDateTimeToNumber,
  compareDate,
  diffDate,
  convertStartDate,
  convertEndDate,
};
