const clearStorage = () => {
  if (window && window.localStorage) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in localStorage) {
      if (!key?.startsWith('ins') && !key?.startsWith('sp')) {
        localStorage.removeItem(key);
      }
    }
    localStorage.setItem('logout', new Date());
  }
};

export default {
  clearStorage,
};
