import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {
    '& .Mui-selected': {
      backgroundColor: 'transparent !important',
      color: '#09884D',
    },
    '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
      backgroundColor: 'transparent',
      color: '#0E1983',
      fontWeight: '500',
      fontFamily: 'googlesansmedium',
      fontSize: '16px',
      border: 'none',
    },
    '& .MuiSvgIcon-root': {
      color: '#868585',
      fontSize: '24px',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      border: '1.5px solid #09884D',
      background: 'transparent !important',
      fontWeight: 'bold',
    },
    '& .MuiPaginationItem-ellipsis': {
      fontSize: '12px',
      color: '#0E1983',
      marginBottom: '6px',
    },
    '& .MuiPaginationItem-outlined': {
      border: 'transparent',
      background: 'transparent',
    },
  },
}));

function PaginationV2({ count, defaultPage = 1, page, onChange, isMobile = false, disabled = false, ...restProps }) {
  const classes = useStyles();
  return (
    <Pagination
      size={isMobile ? 'small' : 'medium'}
      onChange={onChange}
      className={classes.root}
      page={page}
      defaultPage={defaultPage}
      count={count}
      disabled={disabled}
      {...restProps}
    />
  );
}

export default PaginationV2;
