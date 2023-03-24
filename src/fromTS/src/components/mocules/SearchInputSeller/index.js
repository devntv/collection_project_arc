import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';
import { WEB_STYLES } from 'styles';
import styles from './styles.module.css';

const SearchInputSeller = memo(({ classCustom, slug, isFlagship, ...restProps }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleSearchbox = (e) => {
    const val = e.target.value;
    setKeyword(val);
  };
  const { asPath } = router;
  const isFlagShipStorePage = asPath.includes('flagship-store');

  let linkListProduct = '/list-product';
  if (isFlagShipStorePage) {
    linkListProduct = `/flagship-store/${slug}/list-product`;
  }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (isFlagship) {
        router.push(`${linkListProduct}?search=${keyword}`);
      } else {
        router.push(`/seller/${slug}/list-product?search=${keyword}`);
      }
      event.preventDefault();
    }
  };

  const handleFocus = (e) => {
    const val = e?.target?.value;
    if (val && val.length > 0) {
      setKeyword(e.target.value);
    }
  };

  return (
    <div className={clsx(styles.search_wrap, classCustom)}>
      <form>
        <TextField
          {...restProps}
          classes={{
            root: isFlagship ? styles.root_input : styles.root_input_seller,
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
            placeholder: 'Tìm kiếm trong cửa hàng',
            autoComplete: 'off',
            classes: { focused: isFlagship ? styles.focus : styles.focusSeller },
          }}
          onFocus={handleFocus}
        />
      </form>
    </div>
  );
});

export default SearchInputSeller;
