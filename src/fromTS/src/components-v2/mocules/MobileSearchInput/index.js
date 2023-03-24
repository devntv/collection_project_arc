import { Box, CircularProgress, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
// import { withStyles } from '@material-ui/styles';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
import MobileSearchDropdown from 'components-v2/mocules/MobileSearchDropdown';
import { NHA_BAN_HANG } from 'constants/data';
import { ICON_MOBILE_ICON_BACK, SEARCH_ICON } from 'constants/Images/mobile/Icons';
import { SELLERS, SELLERS_LOADING_URL } from 'constants/Paths';
import { useSearch } from 'context';
import Router from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';
import { ImageFallback } from 'utils';
import styles from './styles.module.css';

const MobileSearchInput = memo(() => {
  const { searchProduct, handleBlur, handleSearchbox, handleFocus, searchType, setSearchType, searchSeller, action, handleClearSearchBox } =
    useSearch();
  const inputEl = useRef(null);
  const searchRef = useRef(null);
  const searchResultRef = useRef(null);
  const { keyword: globalKeyword } = useSearch();
  const [keyword, setKeyword] = useState(globalKeyword);
  const {
    query: { searchbar = false },
  } = Router;

  const isSellers = Router.pathname === SELLERS || Router.pathname === SELLERS_LOADING_URL;

  // auto focus first time
  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  useEffect(() => {
    if (isSellers) {
      setSearchType(NHA_BAN_HANG);
    }
  }, [isSellers]);

  const handleOnChange = (e) => {
    setKeyword(e.target.value);
    handleSearchbox(e);
  };

  const handleClear = () => {
    handleClearSearchBox();
    setKeyword('');
  };

  const handlePreventSubmit = (e) => {
    if (e.keyCode === 13) e.preventDefault();
  };
  const renderRightIcon = () => {
    if (!action.isFetching && keyword === '') return <></>;
    if (!action.isFetching && keyword !== '') {
      return (
        <IconButton className={styles.clearIcon} onClick={handleClear}>
          <ClearIcon className={styles.iconClearText} />
        </IconButton>
      );
    }
    return (
      <span className={styles.loadingContainer}>
        <CircularProgress size={15} />
      </span>
    );
  };
  return (
    <>
      <div ref={searchRef} className={clsx(styles.search_wrap)} onBlur={handleBlur}>
        <Grid container className={styles.gridContainer}>
          <Grid item xs={1}>
            <Box textAlign="left">
              <IconButton
                className={styles.btnBack}
                onClick={() => {
                  if (searchbar) {
                    Router.replace({ pathname: '/' });
                  }
                }}
              >
                <ICON_MOBILE_ICON_BACK />
              </IconButton>
            </Box>
          </Grid>
          <Grid className={styles.gridSearch_container} item xs={11}>
            <form>
              <TextField
                inputRef={inputEl}
                value={keyword}
                classes={{
                  root: styles.root_input,
                }}
                variant="outlined"
                size="small"
                async
                onChange={(e) => handleOnChange(e)}
                onKeyDown={handlePreventSubmit}
                InputProps={{
                  placeholder: 'Tìm kiếm...',
                  autoComplete: 'off',
                  type: 'search',
                  classes: { focused: styles.focus },
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageFallback src={SEARCH_ICON} width="16px" height="16px" />
                    </InputAdornment>
                  ),
                  endAdornment: renderRightIcon(),
                }}
                onFocus={handleFocus}
              />
            </form>
          </Grid>
        </Grid>
      </div>
      <div ref={searchResultRef}>
        <MobileSearchDropdown
          keyword={keyword}
          data={searchType === NHA_BAN_HANG ? searchSeller : searchProduct}
          searchType={searchType}
          action={action}
        />
      </div>
    </>
  );
});

export default MobileSearchInput;
