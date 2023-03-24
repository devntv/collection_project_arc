import { toast } from 'react-toastify';
import { hashCode } from './StringUtils';

// const MAP_CACHE_NOTIFY = new Map();
// const checkItem = ({ key }) => {
//   const isHas = MAP_CACHE_NOTIFY.has(key);

//   if (!isHas) {
//     MAP_CACHE_NOTIFY.set({ key, value: true });
//     setTimeout(() => {
//       MAP_CACHE_NOTIFY.delete(key);
//     }, 3000);
//   }
//   return isHas;
// };
const show = (text, type, options) => {
  // create toastId
  const toastId = hashCode(text);

  // prevent duplicate message
  if (toast.isActive(toastId)) {
    toast.update(toastId, { autoClose: 1500 });
  } else {
    toast(text, {
      toastId,
      type,
      ...options,
    });
  }
};

const info = (text) => {
  show(text, 'info');
};

const success = (text) => {
  show(text, 'success');
};

const dark = (text) => {
  show(text, 'dark');
};

const error = (text, options) => {
  show(text, 'error', options);
};

const warn = (text) => {
  show(text, 'warn');
};

export default { info, success, dark, error, warn };
