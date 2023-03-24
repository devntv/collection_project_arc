import { Box, IconButton, Input, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './styles.module.css';

type NewPaginationV2Props = {
  totalPage: number;
  curPage: number;
  handleChange: (eventHanler: object, page: number) => void;
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

const MV2PaginationV2: React.FC<NewPaginationV2Props> = ({ totalPage = 1, curPage = 1, handleChange }: NewPaginationV2Props) => {
  const [current, setCurrent] = useState<number>(curPage || 1);

  const isShowLeft = curPage > 1;
  const isShowRight = curPage < totalPage;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (event: any) => {
    const page = Number(event.target.value);
    if (page > 0 && page < totalPage + 1) {
      handleChange(event, page);
    } else {
      setCurrent(curPage);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event?.currentTarget?.value.replace(/[^\d]/g, '');
    const page = Number(val);
    setCurrent(page < 0 || page > totalPage ? current : page);
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
    </Box>
  );
};

export default MV2PaginationV2;
