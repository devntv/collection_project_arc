import { format } from 'date-fns';

export function formatDate(val = '') {
  if (!val) {
    return '';
  }
  const date = new Date(val);
  const dateStr = `${`00${date.getDate()}`.slice(-2)}/${`00${date.getMonth() + 1}`.slice(-2)}/${date.getFullYear()} ${`00${date.getHours()}`.slice(
    -2,
  )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(-2)}`;
  return dateStr || '';
}

export function formatDate2(val = '') {
  if (!val) {
    return '';
  }
  const date = new Date(val);
  const dateStr = `${`00${date.getHours()}`.slice(-2)}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(
    -2,
  )} Ngày ${`00${date.getDate()}`.slice(-2)}/${`00${date.getMonth() + 1}`.slice(-2)}/${date.getFullYear()} `;
  return dateStr || '';
}

export function formatDate3(val = '', isDay = false) {
  if (!val) {
    return '';
  }
  const date = format(new Date(val), isDay ? 'dd/MM/yyyy' : 'dd/MM/yyyy (HH:mm:ss)');

  return date || '';
}

export default { formatDate, formatDate2 };
