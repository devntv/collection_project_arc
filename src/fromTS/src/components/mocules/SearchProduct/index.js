import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { SearchClient } from 'clients';
import clsx from 'clsx';
import React, { memo, useState } from 'react';
import { WEB_STYLES } from 'styles';
import { debounceFunc200 } from 'utils/debounce';
import SearchDropdownFeedback from '../SearchDropdownFeedback';
import styles from './styles.module.css';

const SearchProduct = memo(({ classCustom, text, handleKeyDown, onClickItem, ...restProps }) => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [keyword, setKeyword] = useState(text || '');
  const [hidden, setHidden] = useState(false);

  const handleSearchbox = (e) => {
    const val = e.target.value;
    setKeyword(val);
    setHidden(true);
    const fetchData = async () => {
      const res = await SearchClient.searchKeywords(val);
      setSearchProduct(res);
    };
    debounceFunc200(fetchData);
  };

  const clickProduct = (product) => {
    onClickItem(product);
    setKeyword(product.product.name || text);
  };

  const handleKeyDownDefault = (event) => {
    if (event.keyCode === 13) {
      handleKeyDown({
        keyword,
      });
      // router.push(`/products?text=${keyword}`);
      event.preventDefault();
      event.target.blur();
    }
  };

  const handleFocus = (e) => {
    const val = e?.target?.value;
    if (val && val.length > 0) {
      setHidden(true);
      setKeyword(e.target.value);
    }
  };

  const handleBlur = () => {
    debounceFunc200(() => setHidden(false));
  };
  return (
    <div className={clsx(styles.search_wrap, classCustom)} onBlur={handleBlur}>
      <form>
        <TextField
          value={keyword}
          {...restProps}
          classes={{
            root: styles.root_input,
          }}
          style={{ width: '100%' }}
          async
          onChange={handleSearchbox}
          onKeyDown={handleKeyDownDefault}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: WEB_STYLES.COLORS.GREEN }} />
              </InputAdornment>
            ),
            placeholder: 'Nhập tên thuốc cần tìm...',
            autoComplete: 'off',
            type: 'search',
            classes: { focused: styles.focus },
          }}
          onFocus={handleFocus}
        />
      </form>
      {hidden && <SearchDropdownFeedback keyword={keyword} data={searchProduct} onClickItem={clickProduct} />}
    </div>
  );
});

export default SearchProduct;
