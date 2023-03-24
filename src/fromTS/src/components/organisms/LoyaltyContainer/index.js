import { Grid, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { CustomerClient, getData, isValid, LIMIT_DEFAULT, OrderClient } from 'clients';
import { Button, LinkComp } from 'components/atoms';
import { DEFAULT_PAGINATION } from 'constants/Enums';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DateFnsUtils from '@date-io/date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import LoyaltyTable from './LoyaltyTable';
import styles from './styles.module.css';

const LoyaltyContainer = ({ point = 0, isMobile }) => {
  const [historyLoyalties, setHistoryLoyalties] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const router = useRouter();

  const { query } = router;
  const limit = LIMIT_DEFAULT;
  const { offset = 0, from, to, type } = query;
  const [levelPointList, setLevelPointList] = useState([]);
  const [dateFrom, setDateFrom] = useState(from ? new Date(from) : null);
  const [dateTo, setDateTo] = useState(to ? new Date(to) : null);

  const loadData = async () => {
    const q = JSON.stringify({
      timeFrom: from || null,
      timeTo: to || null,
    });
    const result = await CustomerClient.getListHistoryLoyalty({ offset, limit, q });
    if (isValid(result)) {
      setHistoryLoyalties(getData(result));
      setPagination({
        offset,
        limit,
        total: result.total,
        pageSize: Math.ceil(result.total / limit),
      });
    } else {
      setHistoryLoyalties([]);
      setPagination(DEFAULT_PAGINATION);
    }
  };
  const loadLevelPointList = async () => {
    const q = JSON.stringify({
      timeFrom: from || null,
      timeTo: to || null,
    });
    const result = await CustomerClient.getListHistoryLoyalty({ offset, limit, q, type: 'INCREMENT' });
    if (isValid(result)) {
      const data = getData(result);
      const listOrderId = [];
      data.forEach((ele) => {
        listOrderId.push(ele?.orderId);
      });
      const orderRes = await OrderClient.getOrders({
        ids: listOrderId.join(),
      });
      if (isValid(orderRes)) {
        const orders = getData(orderRes);
        const levelPointListMapPrice = data.map((item) => {
          const order = orders.find(({ orderId }) => item?.orderId === orderId);
          return { ...item, totalPrice: order?.totalPrice };
        });
        setLevelPointList(levelPointListMapPrice);
        setPagination({
          offset,
          limit,
          total: result.total,
          pageSize: Math.ceil(result.total / limit),
        });
      }
    } else {
      setLevelPointList([]);
      setPagination(DEFAULT_PAGINATION);
    }
  };
  useEffect(() => {
    if (type === '2') {
      loadLevelPointList();
    } else {
      loadData();
    }
  }, [query]);
  const handleChangePage = (_, page) => {
    query.offset = (page - 1) * limit;
    router.push({ ...router, query: { ...router.query } });
  };
  const handleSearch = () => {
    query.from = dateFrom?.toString() !== 'Invalid Date' && dateFrom !== null ? new Date(dateFrom.setHours(0, 0, 0)).toISOString() : null;
    query.to = dateTo?.toString() !== 'Invalid Date' && dateTo !== null ? new Date(dateTo.setHours(23, 59, 0)).toISOString() : null;
    query.offset = 0;
    if (dateFrom?.toString() !== 'Invalid Date' && dateTo?.toString() !== 'Invalid Date') router.push({ ...router, query: { ...router.query } });
    else {
      setLevelPointList([]);
      setHistoryLoyalties([]);
      setPagination(DEFAULT_PAGINATION);
    }
  };
  return (
    <div className={styles.wrap}>
      <div style={{ marginTop: '10px' }}>
        {point !== 0 && (
          <div>
            <Paper className={styles.wrap_point_table}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft: '10px' }}>
                <LinkComp
                  name="Điểm tích luỹ"
                  href="/users/loyalty_points"
                  className={type === '1' || !type ? clsx(styles.link_point, styles.link_point_active) : styles.link_point}
                  onClick={() => {
                    setDateFrom(null);
                    setDateTo(null);
                    query.type = '1';
                    query.offset = 0;
                    query.from = null;
                    query.to = null;
                    setPagination(DEFAULT_PAGINATION);
                  }}
                />
                <LinkComp
                  name="Điểm xếp hạng"
                  href="/users/loyalty_points?type=2"
                  className={type === '2' ? clsx(styles.link_point, styles.link_point_active) : styles.link_point}
                  onClick={() => {
                    setDateFrom(null);
                    setDateTo(null);
                    query.type = '2';
                    query.offset = 0;
                    query.from = null;
                    query.to = null;
                    setPagination(DEFAULT_PAGINATION);
                  }}
                />
              </div>
              <Grid item container spacing={1} style={{ paddingLeft: '10px' }}>
                <Grid item xs={5} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                  {!isMobile && <span>Từ</span>}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
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
                  {!isMobile && <span>Đến</span>}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={styles.input}
                      disableFuture
                      clearable
                      placeholder={isMobile ? 'Đến ngày' : 'ngày/tháng/năm'}
                      value={dateTo}
                      autoOk
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
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <LoyaltyTable
                    data={type === '2' ? levelPointList : historyLoyalties}
                    type={type === '2' ? 'level' : 'loyalty'}
                    isMobile={isMobile}
                  />
                  {pagination.pageSize > 0 && (
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                      <Pagination page={Math.floor(offset / limit) + 1} count={pagination.pageSize} onChange={handleChangePage} />
                    </div>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyContainer;
