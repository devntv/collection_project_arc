import { Input, InputAdornment } from '@material-ui/core';
import { ICON_MOBILE_ICON_SEARCH } from 'constants/Images/mobile/Icons';
import { memo, useCallback } from 'react';
import styles from './styles.module.css';

const iconStart = (
  <InputAdornment className={styles.mobile_inputAdorment} position="start">
    <ICON_MOBILE_ICON_SEARCH />
  </InputAdornment>
);

const MobileSearchOrder = memo(({ onSearch, isMobile, text = '', ...restProps }) => {
  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      onSearch(event);
      event.preventDefault();
      event.target.blur();
    }
  }, []);

  return (
    <Input
      {...restProps}
      classes={{
        root: styles.root_input,
        input: styles.input,
        focused: styles.focus,
      }}
      disableUnderline
      defaultValue={text}
      placeholder="Tìm Kiếm..."
      onKeyDown={handleKeyDown}
      startAdornment={iconStart}
      onChange={onSearch}
      type="search"
    />
  );
});

export default MobileSearchOrder;
