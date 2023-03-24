import { Box, FormControl, InputAdornment, NativeSelect, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { HOAT_CHAT, NHA_BAN_HANG, SEARCH_TYPE_LIST, THUOC, THUOC_VA_HOAT_CHAT } from 'constants/data';
import { SEARCHV2ACTIVE_ICON, SEARCHV2_ICON } from 'constants/Images';
import { useSearch } from 'context';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
import { debounceFunc200 } from 'utils/debounce';
import deviceUtils from 'utils/deviceUtils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import SearchDropdown from '../SearchDropdown';
import styles from './styles.module.css';

// SEARCH PRODUCT
const SearchInput = memo(({ classCustom, scrollSticky = null, ...restProps }) => {
  const wrapperRef = useRef(null);
  const {
    keyword,
    hidden,
    searchProduct,
    setSearchProduct,
    searchIngredient,
    setSearchIngredient,
    searchSeller,
    setSearchSeller,
    handleBlur,
    handleSearchbox,
    handleKeyDown,
    handleFocus,
    searchType,
    isFocus,
    setIsFocus,
    handleChangeTypeSearch,
  } = useSearch();
  const inputEl = useRef(null);
  const [show, setShow] = useState(false);
  const [seacrIcon, setSearchIcon] = useState(false);
  const focusRef = useRef(false);

  useEffect(() => {
    if (document.activeElement === inputEl.current) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [hidden]);

  const containerRef = useRef(null);

  const handleClickSearch = () => {
    focusRef.current = true;
    setIsFocus(true);
  };

  const handleShowFirstClick = () => {
    setShow(true);
    setSearchIcon(true);
    if (keyword.length <= 0) {
      setSearchProduct([]);
      setSearchSeller([]);
      setSearchIngredient([]);
    }
    handleClickSearch();
  };

  const checkStickySelect = () => {
    if (!scrollSticky) {
      if (isFocus) {
        return styles.focusSelect;
      }
      return null;
    }
    if (isFocus && scrollSticky) {
      return styles.stickySelect;
    }
    return styles.hiddenSelect;
  };

  const checkStickyInput = () => {
    if (!scrollSticky || isFocus || deviceUtils.isTablet()) {
      return null;
    }
    return styles.root_input_sticky;
  };

  const getDataSearch = () => {
    switch (searchType) {
      case THUOC_VA_HOAT_CHAT:
      case THUOC:
        return searchProduct;
      case HOAT_CHAT:
        return searchIngredient;
      case NHA_BAN_HANG:
        return searchSeller;
      default:
        return [];
    }
  };

  const handleOnBlur = () => {
    debounceFunc200(() => {
      if (focusRef.current) {
        focusRef.current = false;
      } else {
        handleBlur();
      }
    });
  };

  const [focusSelect, setFocusSelect] = useState(false);

  const handleChangeSelect = (e) => {
    focusRef.current = true;
    handleChangeTypeSearch(e);
  };

  const handleChangeTyping = (e) => {
    focusRef.current = true;
    handleSearchbox(e);
  };

  useEffect(() => {
    if (!focusRef.current) {
      handleBlur();
    }
  }, [focusRef.current]);

  const onClickTypeDropdown = () => {
    focusRef.current = true;
    setFocusSelect(true);
    setShow(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      const classNameStr = containerRef.current.className;
      const isHaveHiddenClass = classNameStr.includes('hiddenWidth');

      if (scrollSticky && isHaveHiddenClass) {
        if (!containerRef.current.contains(e.target)) {
          focusRef.current = false;
          setShow(false);
          setSearchIcon(false);
        }
      }
      if (!scrollSticky && !isHaveHiddenClass) {
        if (!containerRef.current.contains(e.target)) {
          focusRef.current = false;
          setShow(false);
          setSearchIcon(false);
        }
      }
      // const checkInputRef = inputEl.current && !inputEl.current.contains(e.target)
      // const checkWrapperRef = wrapperRef.current && !wrapperRef.current.contains(e.target);
      // const checkContainerRef = containerRef.current && !containerRef.current.contains(e.target);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [scrollSticky, containerRef]);

  if (deviceUtils.isTablet()) {
    return (
      <Box ref={containerRef} className={clsx(styles.search_wrap, classCustom, styles.search_ic_tablet)} onBlur={handleOnBlur}>
        <div className={clsx(styles.searchTabletContainer, isFocus && styles.border_search_tablet)}>
          {!scrollSticky && (
            <>
              {/* Search input */}
              <TextField
                className={styles.text_field_tablet}
                onClick={handleShowFirstClick}
                inputRef={inputEl}
                value={keyword}
                classes={{
                  root: styles.root_input_tablet,
                }}
                ref={wrapperRef}
                async
                onChange={handleChangeTyping}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image src={seacrIcon ? SEARCHV2ACTIVE_ICON : SEARCHV2_ICON} height="20px" width="20px" layout="fixed" />
                    </InputAdornment>
                  ),
                  placeholder: 'Tìm kiếm ...',
                  autoComplete: 'off',
                }}
                onFocus={handleFocus}
              />
              {/* Dropdown menu */}
              <div className={styles.selectSearch}>
                <FormControl className={styles.formControlTablet}>
                  <NativeSelect
                    className={clsx(focusSelect ? styles.selectInputFocus : styles.selectInput, styles.border_none)}
                    inputProps={{
                      name: 'search',
                      id: 'search-type',
                      placeholder: 'Thuốc',
                    }}
                    IconComponent={ExpandMoreIcon}
                    onChange={handleChangeSelect}
                    onClick={onClickTypeDropdown}
                    onBlur={() => setFocusSelect(false)}
                    value={SEARCH_TYPE_LIST.find((item) => item?.value === Number(searchType)).value || SEARCH_TYPE_LIST[0]?.value}
                  >
                    {SEARCH_TYPE_LIST.map((item) => (
                      <option key={uuidv4()} value={item.value} style={{ cursor: 'pointer', color: '#000000' }}>
                        {item.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </div>
            </>
          )}
        </div>
        {show && <SearchDropdown keyword={keyword} data={getDataSearch()} type={Number(searchType)} />}
      </Box>
    );
  }
  return (
    <Box ref={containerRef} className={clsx(styles.search_wrap, classCustom)} onBlur={handleOnBlur}>
      <div
        className={clsx(styles.searchContainer, isFocus && styles.border_search_container, keyword?.length === 250 && styles.err_border)}
        data-test="search-container"
      >
        {/* Search input */}
        <TextField
          className={styles.root_input_scale}
          onClick={handleShowFirstClick}
          inputRef={inputEl}
          value={keyword}
          {...restProps}
          classes={{
            root: clsx(styles.root_input, checkStickyInput()),
          }}
          ref={wrapperRef}
          async
          onChange={handleChangeTyping}
          onKeyDown={handleKeyDown}
          inputProps={{
            maxLength: 250,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ImageFallbackStatic src={seacrIcon ? SEARCHV2ACTIVE_ICON : SEARCHV2_ICON} height="20px" width="20px" />
              </InputAdornment>
            ),
            placeholder: 'Tìm kiếm ...',
            autoComplete: 'off',
            type: 'search',
          }}
          onFocus={handleFocus}
          data-test="search-input"
        />
        {/* Dropdown menu */}
        <div className={clsx(styles.selectSearch, checkStickySelect())}>
          <FormControl className={styles.formControl}>
            <NativeSelect
              className={focusSelect ? styles.selectInputFocus : styles.selectInput}
              inputProps={{
                name: 'search',
                id: 'search-type',
              }}
              IconComponent={ExpandMoreIcon}
              onChange={handleChangeSelect}
              onClick={onClickTypeDropdown}
              onBlur={() => setFocusSelect(false)}
              value={SEARCH_TYPE_LIST.find((item) => item?.value === Number(searchType))?.value || SEARCH_TYPE_LIST[0]?.value}
              data-test="search-select-option"
            >
              {SEARCH_TYPE_LIST.map((item) => (
                <option key={uuidv4()} value={item.value} style={{ cursor: 'pointer', color: '#000000' }}>
                  {item.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      </div>
      {show && <SearchDropdown keyword={keyword} data={getDataSearch()} type={Number(searchType)} />}
    </Box>
  );
});

export default SearchInput;
