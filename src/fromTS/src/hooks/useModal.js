const { useState } = require('react');

const useModal = (data = false, defvalue = null) => {
  const [isShowing, setIsShowing] = useState(data);
  const [value, setValue] = useState(defvalue);
  const toggle = (val, callback) => {
    setValue(val);
    if (callback && typeof callback === 'function') {
      callback();
    }
    setIsShowing(!isShowing);
  };

  const getVal = () => value;

  const toggleCheckShowing = () => {
    // eslint-disable-next-line no-unused-expressions
    isShowing && toggle();
  };
  return [isShowing, toggle, getVal, toggleCheckShowing];
};

export default useModal;
