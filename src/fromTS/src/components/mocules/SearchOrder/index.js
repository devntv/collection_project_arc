import { Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { memo, useCallback } from 'react';
import { WEB_STYLES } from 'styles';
import styles from './styles.module.css';

const iconStart = (
  <InputAdornment position="start">
    <Search style={{ color: WEB_STYLES.COLORS.GREEN }} />
  </InputAdornment>
);

const SearchOrder = memo(({ onSearch, isMobile, text = '', ...restProps }) => {
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
      value={text}
      placeholder="Nhập tên thuốc, hoạt chất cần tìm..."
      onKeyDown={handleKeyDown}
      startAdornment={!isMobile && iconStart}
      onChange={onSearch}
      type="search"
    />
  );
});

export default SearchOrder;
