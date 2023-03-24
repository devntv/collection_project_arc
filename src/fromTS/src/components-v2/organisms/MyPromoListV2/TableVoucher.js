/* eslint-disable react/jsx-indent */
import { Grid, TableCell, TableRow, Typography } from '@material-ui/core';
import clsx from 'clsx';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import TableData from 'components-v2/atoms/TableData';
import { ALIGN } from 'constants/Enums';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import NewPaginationV2 from '../NewPaginationV2';
import styles from './styles.module.css';

const heads = [
  { text: 'Ngày sử dụng', align: ALIGN.LEFT },
  { text: 'Mã code giảm giá ', align: ALIGN.LEFT },
  { text: 'Nội dung', align: ALIGN.LEFT },
  { text: 'Đơn hàng liên quan', align: ALIGN.RIGHT },
  // { text: 'Giá trị đơn hàng', align: ALIGN.RIGHT },
];

const headsMobile = [
  { text: 'Ngày sử dụng', align: ALIGN.LEFT },
  { text: 'Mã giảm giá ', align: ALIGN.LEFT },

  { text: 'Đơn hàng liên quan', align: ALIGN.RIGHT },
];

function TableVoucher({
  limit = 20,
  dataHistory = [],
  loading = false,
  pageSize = 0,
  currentPage = 0,
  from = '',
  to = '',
  setCurrentSearchClick,
  isMobile,
}) {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // const renderContent = (desc) => {
  //   if (!desc) return 'Áp dụng mọi đơn hàng';
  //   return <div dangerouslySetInnerHTML={{ __html: desc }} />;
  // };
  const mainRef = useRef(null);
  const q = {};

  const handleChangePage = (_, page) => {
    if (from) q.timeFrom = from;
    if (to) q.timeTo = to;
    setCurrentSearchClick(page);
    const offsetByPage = (page - 1) * limit;
    window.scrollTo({
      top: mainRef.current.offsetTop - 300,
      behavior: 'smooth',
    });
    router.push(
      {
        pathname: router.pathname,
        query: {
          offset: offsetByPage,
          limit,
          // q: JSON.stringify(q),
        },
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <>
      <Grid container className={styles.wrapTable} ref={mainRef}>
        <TableData
          heads={isMobile ? headsMobile : heads}
          stickyHeader
          className={!isMobile ? styles.headTable : styles.headTableMobile}
          unSetMinWidth
        >
          {loading && (
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <LoadingBM />
              </TableCell>
            </TableRow>
          )}
          {dataHistory?.length > 0 ? (
            dataHistory.map(({ voucher = {}, orderID = '', createdTime }) => (
              <TableRow key={uuidv4()} className={clsx(styles.tableData, loading && styles.loadHidden)}>
                <TableCell align={heads.align} className={styles.codeData}>
                  {DateTimeUtils.getFormattedDate(new Date(createdTime))}
                </TableCell>
                <TableCell align={heads.align} className={styles.codeData} style={{ minWidth: '155px' }}>
                  {voucher?.code || ''}
                </TableCell>
                <TableCell align={heads.align} className={styles.codeData} style={{ display: isMobile && 'none' }}>
                  {/* {renderContent(voucher?.conditionDescription || '')} */}
                  {voucher?.description}
                </TableCell>
                {/* <TableCell align="right" className={styles.codeData} /> */}
                <TableCell align="right" className={styles.codeData}>
                  <Link className={styles.idVoucher} href={`/my-order/${orderID}`} passHref>
                    <a target="_blank" rel="noopener noreferrer" href="!#">{`#${orderID}`}</a>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow hover key={uuidv4()}>
              <TableCell component="th" scope="row" colSpan={5} align="center" style={{ display: loading ? 'none' : 'table-cell' }}>
                <Typography style={{ fontFamily: 'ggsm' }}>Bạn chưa dùng mã nào</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableData>
      </Grid>
      <Grid container className={styles.wrapViewMore} alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
        {dataHistory?.length > 0 && (
          <Grid container xs={12} item justifyContent="center">
            {/* <Typography className={styles.viewMore}>{seeMore ? 'Ẩn' : 'Xem thêm'}</Typography>
         <LOYALTY_BTN_VIEW_MORE /> */}
            <NewPaginationV2 key={uuidv4()} totalPage={pageSize} curPage={currentPage} handleChange={handleChangePage} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default TableVoucher;
