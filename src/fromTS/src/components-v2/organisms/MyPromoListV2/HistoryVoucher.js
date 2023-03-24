import DateFnsUtils from '@date-io/date-fns';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getData, LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import { getMyHistoryVoucher } from 'clients/PromoClient';
import { Button } from 'components/atoms';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { DateTimeUtils, NotifyUtils } from 'utils';
import styles from './styles.module.css';
import TableVoucher from './TableVoucher';

const limit = LIMIT_DEFAULT;

function HistoryVoucher({ isMobile }) {
  const {
    query: { from, to, offset = 0 },
  } = useRouter();

  const [historyVoucher, setHistoryVoucher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState(from ? new Date(from) : null);
  const [dateTo, setDateTo] = useState(to ? new Date(to) : null);

  const dataHistory = getData(historyVoucher);
  const { total } = historyVoucher || 0;
  const pageSize = Math.ceil(total / limit);
  const currentPage = Number((+offset + limit) / limit);
  const [currentSearchClick, setCurrentSearchClick] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const isValidDate = dateFrom?.toString() === 'Invalid Date' || dateTo?.toString() === 'Invalid Date';

  const getDataHistory = useCallback(async ({ offset: os, limit: lm, timeFromHistory, timeToHistory }) => {
    const q = {};
    if (timeFromHistory) q.timeFrom = timeFromHistory;
    if (timeToHistory) q.timeTo = timeToHistory;
    setLoading(true);
    const res = await getMyHistoryVoucher({ offset: os, limit: lm, q: JSON.stringify(q) });
    setHistoryVoucher(res);
    setLoading(false);
  }, []);
  const timeFromHistory = dateFrom?.toString() !== 'Invalid Date' && dateFrom ? DateTimeUtils.convertStartDate(dateFrom) : null;
  const timeToHistory = dateTo?.toString() !== 'Invalid Date' && dateTo ? DateTimeUtils.convertEndDate(dateTo) : null;

  useEffect(() => {
    getDataHistory({ offset, limit, timeFromHistory, timeToHistory });
  }, [offset, limit]);

  const handleSearch = () => {
    if (!dateFrom && !dateTo) {
      NotifyUtils.error('Bạn chưa nhập ngày tìm kiếm đầy đủ');
      return;
    }
    if (isValidDate) {
      setHistoryVoucher([]);
      return;
    }
    setIsSearching(true);
    setCurrentSearchClick(1);
    getDataHistory({ offset: OFFSET_DEFAULT, limit: LIMIT_DEFAULT, timeFromHistory, timeToHistory });
  };

  useEffect(() => {
    if (!timeFromHistory && !timeToHistory) {
      getDataHistory({ offset: OFFSET_DEFAULT, limit: LIMIT_DEFAULT });
    }
  }, [timeFromHistory, timeToHistory, isValidDate]);

  return (
    <Grid container className={styles.historyVoucherCtn}>
      <Grid container xs={12} item className={styles.title}>
        <Typography>Lịch sử dùng mã giảm giá</Typography>
      </Grid>
      <Grid item xs={5} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
        {!isMobile && <span style={{ fontFamily: 'ggsr' }}>Từ</span>}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearLabel="Xóa ngày đã chọn"
            cancelLabel="Hủy"
            className={styles.input}
            disableFuture
            clearable
            placeholder={isMobile ? 'Từ ngày' : 'ngày/tháng/năm'}
            value={dateFrom}
            autoOk
            format="dd/MM/yyyy"
            onChange={(e) => {
              setDateFrom(e);
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={5} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
        {!isMobile && <span style={{ fontFamily: 'ggsr' }}>Đến</span>}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearLabel="Xóa ngày đã chọn"
            className={styles.input}
            disableFuture
            clearable
            placeholder={isMobile ? 'Đến ngày' : 'ngày/tháng/năm'}
            value={dateTo}
            autoOk
            cancelLabel="Hủy"
            format="dd/MM/yyyy"
            onChange={(e) => {
              setDateTo(e);
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={2} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile ? (
          <IconButton aria-label="search" style={{ background: '#08AC60', color: '#fff', padding: '7px' }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        ) : (
          <Button className={styles.search} onClick={handleSearch}>
            Tìm kiếm
          </Button>
        )}
      </Grid>
      <TableVoucher
        limit={limit}
        dataHistory={dataHistory}
        loading={loading}
        pageSize={pageSize}
        currentPage={isSearching ? currentSearchClick : currentPage}
        from={timeFromHistory}
        to={timeToHistory}
        setCurrentSearchClick={setCurrentSearchClick}
        isMobile={isMobile}
      />
    </Grid>
  );
}

export default HistoryVoucher;
