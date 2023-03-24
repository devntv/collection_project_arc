import { Box, IconButton, Input, MenuItem, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { fillInRange } from 'utils/ArrUtils';
import styles from './styles.module.css';

type NewPaginationV2Props = {
  totalPage: number;
  curPage: number;
  handleChange: (eventHanler: object, page: number) => void;
  isMobile: boolean;
};

const NumPageTextTypography = withStyles({
  root: {
    fontFamily: 'googlesansmedium',
    color: '#0E1983',
    fontWeight: 400,
    cursor: 'pointer',
    margin: '0px 12px',
  },
})(Typography);

const PageInput = withStyles({
  root: {
    fontFamily: 'googlesansmedium',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#0CBA69',
    border: '1px solid #E9E9E9',
    borderRadius: '32px',
    padding: '2px 14px',
    backgroundColor: '#ffffff',
    height: '24px',
    width: '100%',
    '&:hover': {
      border: '1px solid #0cba69',
    },
    '& > input': {
      textAlign: 'center',
    },
  },
})(Input);

const MobilePageInput = withStyles({
  root: {
    fontFamily: 'googlesansmedium',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#0CBA69',
    border: '1px solid #E9E9E9',
    borderRadius: '30px',
    backgroundColor: '#ffffff',
    width: '100%',
    '&:hover': {
      border: '1px solid #0cba69',
    },
    '& > input': {
      textAlign: 'center',
      height: '30px',
      padding: '5px 2px',
    },
  },
})(Input);

const NewPaginationV2: React.FC<NewPaginationV2Props> = ({ totalPage = 1, curPage = 1, handleChange, isMobile = false }: NewPaginationV2Props) => {
  const [current, setCurrent] = useState<number>(curPage || 1);

  useEffect(() => {
    setCurrent(curPage || 1);
  }, [curPage]);

  const isShowLeft = curPage > 1;
  const isShowRight = curPage < totalPage;

  const pagesLeft = () => {
    if (curPage > 2) {
      return fillInRange(2, curPage - 1);
    }
    return [];
  };

  const pagesRight = () => {
    if (curPage < totalPage - 1) {
      return fillInRange(curPage + 2, totalPage);
    }
    return [];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (event: any) => {
    const page = Number(event.target.value);
    if (page > 0 && page < totalPage + 1) {
      handleChange(event, page);
    } else {
      setCurrent(curPage);
    }
  };

  const handleClosePageLeft = (numPage: number) => (e: object) => {
    if (numPage > 0 && numPage < totalPage + 1) {
      handleChange(e, numPage);
    } else {
      setCurrent(curPage);
    }
  };

  const handleClosePageRight = (numPage: number) => (e: object) => {
    if (numPage > 0 && numPage < totalPage + 1) {
      handleChange(e, numPage);
    } else {
      setCurrent(curPage);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event?.currentTarget?.value.replace(/[^\d]/g, '');
    const page = Number(val);
    setCurrent(page > totalPage ? totalPage : page);
  };

  const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handlePageChange(event);
    }
  };

  const handlePrevPage = (event: object) => {
    handleChange(event, current - 1);
  };

  const handleNextPage = (event: object) => {
    handleChange(event, current + 1);
  };

  const handleFirstPage = (event: object) => {
    handleChange(event, 1);
  };

  const handleLastPage = (event: object) => {
    handleChange(event, totalPage);
  };

  return (
    <Box className={styles.pagiContainer}>
      {isMobile ? (
        <>
          {/* Left components */}
          <IconButton disabled={!isShowLeft} className={styles.btnIc} onClick={handlePrevPage}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          {isShowLeft && (
            <>
              <IconButton className={styles.btnIc} onClick={handleFirstPage}>
                <NumPageTextTypography>1</NumPageTextTypography>
              </IconButton>
              {curPage > 3 && <MoreHorizIcon className={styles.btnIc} />}
              {curPage > 2 && <NumPageTextTypography onClick={handlePrevPage}>{curPage - 1}</NumPageTextTypography>}
            </>
          )}
          {/* Page input */}
          <div style={{ width: '57px' }}>
            <MobilePageInput
              type="text"
              disableUnderline
              placeholder="1"
              onChange={onChange}
              onBlur={handlePageChange}
              onKeyPress={onEnter}
              value={current}
            />
          </div>
          {/* Right components */}
          {isShowRight && (
            <>
              {curPage + 1 < totalPage && <NumPageTextTypography onClick={handleNextPage}>{curPage + 1}</NumPageTextTypography>}
              {curPage + 2 < totalPage && <MoreHorizIcon className={styles.btnIc} />}
              <IconButton onClick={handleLastPage} className={styles.btnIc}>
                <NumPageTextTypography>{totalPage}</NumPageTextTypography>
              </IconButton>
            </>
          )}
          <IconButton disabled={!isShowRight} className={styles.btnIc} onClick={handleNextPage}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </>
      ) : (
        <>
          {/* Left components */}
          <IconButton disabled={!isShowLeft} onClick={handlePrevPage} className={styles.btnIc}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          {isShowLeft && (
            <>
              <IconButton className={styles.btnIc} onClick={handleFirstPage}>
                <NumPageTextTypography>1</NumPageTextTypography>
              </IconButton>
              {curPage > 3 && (
                <div className={styles.dropdownLeftContainer}>
                  <IconButton aria-controls="long-page-prev" classes={{ root: clsx(styles.btnMoreLeft) }}>
                    <MoreHorizIcon />
                  </IconButton>
                  <div className={styles.dropdownLeftContent}>
                    <Paper className={styles.paper}>
                      {pagesLeft().map((item) => (
                        <MenuItem key={item} onClick={handleClosePageLeft(item)}>
                          {item}
                        </MenuItem>
                      ))}
                    </Paper>
                  </div>
                </div>
              )}
              {curPage > 2 && (
                <IconButton className={styles.btnIc} onClick={handlePrevPage}>
                  <NumPageTextTypography>{curPage - 1}</NumPageTextTypography>
                </IconButton>
              )}
            </>
          )}
          {/* Page input */}
          <div style={{ width: '65px' }}>
            <PageInput
              type="text"
              disableUnderline
              placeholder="1"
              onChange={onChange}
              onBlur={handlePageChange}
              onKeyPress={onEnter}
              value={current}
              className={styles.inputTablet}
            />
          </div>
          {/* Right components */}
          {isShowRight && (
            <>
              {curPage < totalPage - 1 && (
                <IconButton onClick={handleNextPage} className={styles.btnIc}>
                  <NumPageTextTypography>{curPage + 1}</NumPageTextTypography>
                </IconButton>
              )}
              {curPage < totalPage - 2 && (
                <div className={styles.dropdownRightContainer}>
                  <IconButton aria-controls="long-page-next" classes={{ root: clsx(styles.btnMoreRight) }}>
                    <MoreHorizIcon />
                  </IconButton>
                  <div className={styles.dropdownRightContent}>
                    <Paper className={styles.paper}>
                      {pagesRight().map((item) => (
                        <MenuItem key={item} onClick={handleClosePageRight(item)}>
                          {item}
                        </MenuItem>
                      ))}
                    </Paper>
                  </div>
                </div>
              )}
              <IconButton onClick={handleLastPage} className={styles.btnIc}>
                <NumPageTextTypography>{totalPage}</NumPageTextTypography>
              </IconButton>
            </>
          )}
          <IconButton disabled={!isShowRight} onClick={handleNextPage} className={styles.btnIc}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default NewPaginationV2;
