const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const debounceFunc = (time) => debounce((cb) => cb(), time);
export const debounce100 = debounceFunc(100);
export const debounce200 = debounceFunc(200);
export const debounce300 = debounceFunc(300);
export const debounce400 = debounceFunc(400);
export const debounce500 = debounceFunc(500);
export const debounce1000 = debounceFunc(1000); //1s
export const debounce1500 = debounceFunc(1500); //1.5s

export default debounce;
