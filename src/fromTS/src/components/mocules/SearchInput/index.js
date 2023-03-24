import { InputAdornment, TextField } from '@material-ui/core';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { useSearch } from 'context';
import React, { memo, useRef, useState } from 'react';
import { WEB_STYLES } from 'styles';
import SearchDropdown from '../SearchDropdown';
import styles from './styles.module.css';

const SearchInput = memo(({ classCustom, ...restProps }) => {
  const { keyword, hidden, searchProduct, handleBlur, handleSearchbox, handleKeyDown, handleFocus } = useSearch();
  const inputEl = useRef(null);
  const [show, setShow] = useState(false);

  const handleShowFirstClick = () => {
    setShow(true);
  };

  React.useEffect(() => {
    if (document.activeElement === inputEl.current) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [hidden, keyword]);

  function useOutsideSearchCLick(ref) {
    React.useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setShow(false);
        }
      }
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideSearchCLick(inputEl);

  return (
    <div className={clsx(styles.search_wrap, classCustom)} onBlur={handleBlur}>
      <form>
        <TextField
          onClick={handleShowFirstClick}
          inputRef={inputEl}
          // defaultValue={keyword}
          value={keyword}
          {...restProps}
          classes={{
            root: styles.root_input,
          }}
          async
          onChange={handleSearchbox}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: WEB_STYLES.COLORS.GREEN }} />
              </InputAdornment>
            ),
            placeholder: 'Nhập tên thuốc, hoạt chất cần tìm...',
            autoComplete: 'off',
            type: 'search',
            classes: { focused: styles.focus },
          }}
          onFocus={handleFocus}
        />
      </form>
      {show && <SearchDropdown keyword={keyword} data={searchProduct} />}
    </div>
  );
});

export default SearchInput;
