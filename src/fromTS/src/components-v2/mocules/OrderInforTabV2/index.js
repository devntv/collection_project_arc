/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
import { Box, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles } from '@material-ui/core';
import { Autocomplete, TabContext, TabList, TabPanel } from '@material-ui/lab';
import { getData, getFirst, LIMIT_DEFAULT, OrderClient, SearchClient } from 'clients';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import DateTimePickerV2 from 'components-v2/atoms/DateTimePickerV2';
import InputV2 from 'components-v2/atoms/InputV2';
import { Button } from 'components/atoms';
import { orderTabList } from 'constants/data';
import { BRAND_NAME, ENUM_ORDER_STATUS } from 'constants/Enums';
import { PATH_INFO_BILL, QUICK_ORDER } from 'constants/Paths';
import { useSetting } from 'context';
import { useRouter } from 'next/router';
import loading from 'pages/khuyenmai/loading';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { isAndroid, isTablet } from 'react-device-detect';
import styled from 'styled-components';
import { NotifyUtils } from 'utils';
import { getFirstDayOfMonth } from 'utils/DateTimeUtils';
import { debounceFunc200 } from 'utils/debounce';
import { v4 as uuidV4 } from 'uuid';
import LoadingBM from '../../atoms/LoadingBM';
import PaginationV2 from '../PaginationV2';
import OrderRowV2 from './OrderRowV2';
import styles from './styles.module.css';

const CustomTabV2 = withStyles({
  root: {
    background: '#ffffff',
    border: '1px solid #e9e9e9',
    boxShadow: '0px 0px 6px rgba(0,0,0,0.05)',
    borderRadius: '30px',
    minHeight: '35px',
    marginRight: '5px',
    minWidth: 90,
    padding: '6px 10px !important',
    '& span': {
      color: '#797979',
      textTransform: 'capitalize',
      lineHeight: '20px',
      fontSize: '14px',
      fontWeight: '400',
      fontFamily: 'googlesansregular',
    },
  },
  selected: {
    color: '#09884D !important',
    borderRadius: '30px',
    border: '1px solid #09884D',
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.05)',
    background: '#EDFDF6',
    minHeight: '35px',
    minWidth: 90,
    padding: '6px 10px !important',
    '& span': {
      fontFamily: 'googlesansmedium',
      textTransform: 'capitalize',
      lineHeight: '20px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#09884D !important',
    },
  },
})(Tab);

const ComeHomeButton = styled(Button)`
  color: #fff !important;
  background-color: #00b46e !important;
  border-color: #00b46e !important;
  border: 1px solid transparent !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  border-radius: 50px !important;
  text-transform: none !important;
`;

// TODO: thứ tự default => call api sẽ theo thứ tự này
const tabs = [
  { label: 'Chờ Xác Nhận', value: ENUM_ORDER_STATUS.WAIT_TO_CONFIRM },
  { label: 'Đã Xác Nhận', value: ENUM_ORDER_STATUS.CONFIRMED },
  { label: 'Đang Xử Lý', value: ENUM_ORDER_STATUS.PROCESSING },
  { label: 'Chờ Giao Hàng', value: ENUM_ORDER_STATUS.WAIT_TO_DELIVER },
  { label: 'Đang Giao', value: ENUM_ORDER_STATUS.DELIVERING },
  { label: 'Đã Giao', value: ENUM_ORDER_STATUS.DELIVERED },
  { label: 'Hoàn Tất', value: ENUM_ORDER_STATUS.COMPLETED },
  { label: 'Đã Huỷ', value: ENUM_ORDER_STATUS.CANCEL },
];

const limit = LIMIT_DEFAULT;

const SearchOrderCode = memo(({ handleChangeSearch, handleSearch, orderId, isMobile = false, handleEnterSearchOrder }) => (
  <Grid container alignItems="center" style={{ marginTop: isMobile && '15px' }}>
    <Grid item lg={10} sm={7} xs={12}>
      <InputV2
        placeholder="Nhập mã đơn"
        defaultValue={orderId}
        className={styles.StyleInputV2}
        onChange={handleChangeSearch}
        onKeyDown={handleEnterSearchOrder}
      />
    </Grid>
    <Grid item lg={1} sm={4} style={{ marginLeft: '24px', marginTop: isMobile && '15px' }} className={styles.wrapBtnSearch}>
      <ButtonV2 onClick={handleSearch} className={styles.BtnSearch} disabled={!loading}>
        Tìm Kiếm
      </ButtonV2>
    </Grid>
  </Grid>
));

const SearchOrderName = memo(({ getCountStatusByOrders, isMobile, loadData, setQueryOrder }) => {
  const router = useRouter();
  const { getNameSeller, sellers } = useSetting();
  const { query = {} } = router;

  const defaultOption = ['Chưa nhập sản phẩm'];
  const [keyword, setKeyword] = useState(query?.keyword || '');
  const [dataSearch, setDataSearch] = useState(defaultOption);
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (e, newValue) => {
    setKeyword(newValue);
    async function fetchDataSearch() {
      const searchData = await SearchClient.searchKeywords(newValue);
      const listTextSearch = searchData.map((item) => {
        const { sellerCode = null } = item?.sku || {};
        const sellerInfo = getNameSeller({ seller: { code: sellerCode } });
        const sellerText = sellerInfo?.sellerName && ` - ${sellerInfo?.sellerName}`;
        return `${item?.product?.name}${sellerText}`;
      });
      setDataSearch(listTextSearch);
      setData(searchData);
      setIsSearch(true);
    }

    if (!newValue) {
      setDataSearch(defaultOption);
    } else {
      debounceFunc200(fetchDataSearch);
    }
  };
  const [isSelect, setIsSelect] = useState(false);

  const handleSearchClick = async (value) => {
    // nếu chưa chọn 1 SP cố định thì không cho search
    let skuCodes = [];
    let dataFilter = [];
    const keywordProduct = (keyword?.split('-')?.[0]?.trim() || keyword || '')?.toLocaleLowerCase();

    if (value && !isSelect) {
      const searchData = await SearchClient.searchKeywords(value);
      skuCodes = searchData?.filter((item) => item?.product?.name?.toLocaleLowerCase()?.includes(keywordProduct))?.map(({ sku }) => sku.code);
      if (skuCodes?.length === 0) {
        NotifyUtils.error(`Không tìm thấy sản phẩm có từ khoá ${value}`);
        return;
      }
      setQueryOrder({ skuCodes, keyword });
      getCountStatusByOrders(null, null, skuCodes);
      loadData({});
    } else if (!keyword) {
      setIsSearch(false);
      setDataSearch(defaultOption);
      router.push({
        pathname: router.pathname,
        query: {
          status: ENUM_ORDER_STATUS.ALL,
          type: query?.type || 'PRODUCT',
        },
      });
      setQueryOrder({ skuCodes: [], keyword: '' });
      loadData({ keyword: '' });
      getCountStatusByOrders(null, null, null);
    } else {
      const keywordSeller = keyword?.split('-')?.pop()?.trim()?.toLocaleLowerCase() || '';
      const sellerCode = sellers?.find((item) => item?.name?.toLocaleLowerCase() === keywordSeller)?.code || '';
      const listEnterpriseSeller = sellers?.filter((item) => item?.sellerType === 'ENTERPRISE')?.map(({ code }) => code);
      listEnterpriseSeller.push('MEDX');
      const dataWithFullname = data?.filter((item) => item?.product?.name?.toLocaleLowerCase()?.indexOf(keywordProduct) >= 0);
      if (sellerCode) {
        dataFilter = dataWithFullname?.filter((item) => item?.sku?.sellerCode === sellerCode);
      } else if (keywordSeller === `đối tác của ${BRAND_NAME}`) {
        dataFilter = dataWithFullname?.filter((item) => listEnterpriseSeller?.indexOf(item?.sku?.sellerCode) < 0);
      } else if (isSelect) {
        dataFilter = dataWithFullname?.filter((item) => item?.sku?.sellerCode === 'MEDX');
      } else {
        dataFilter = data?.filter((item) => item?.product?.name?.toLocaleLowerCase()?.includes(keywordProduct));
      }
      skuCodes = dataFilter?.map(({ sku }) => sku.code);
      // nếu search product mà ko có products
      if (skuCodes?.length === 0) {
        NotifyUtils.error(`Không tìm thấy sản phẩm có từ khoá ${keywordProduct}`);
        return;
      }
      setQueryOrder({ skuCodes, keyword });
      getCountStatusByOrders(null, null, skuCodes);
      loadData({});
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      setKeyword(e.target.value);
      handleSearchClick(e.target.value);
    }
  };

  return (
    <Grid container alignItems="center" style={{ height: !isMobile && '40px' }}>
      <Grid item lg={10} sm={7} xs={12} style={{ position: 'relative', bottom: !isMobile && '16px' }}>
        <Autocomplete
          value={keyword}
          autoComplete
          onKeyDown={handleEnter}
          onChange={(e, newValue) => {
            if (e?.keyCode !== 13) {
              handleSearch(e, newValue);
              setIsSelect(true);
            }
          }}
          onInputChange={(e, newValue) => {
            if (e?.keyCode !== 13) {
              handleSearch(e, newValue);
              setIsSelect(false);
            }
          }}
          id="Search-orders"
          options={dataSearch}
          getOptionDisabled={(option) => !isSearch && option === dataSearch[0]}
          renderInput={(params) => <TextField {...params} placeholder="Sản phẩm" margin="normal" variant="outlined" className={styles.input} />}
        />
      </Grid>
      <Grid item lg={1} sm={4} style={{ marginLeft: '24px', marginBottom: !isMobile && '24px' }} className={styles.wrapBtnSearch}>
        <ButtonV2 className={styles.BtnSearch} onClick={(e) => handleSearchClick(e.target.value)}>
          Tìm Kiếm
        </ButtonV2>
      </Grid>
    </Grid>
  );
});

const SearchOrderDateTime = memo(({ timeFromValue, timeToValue, handleClickSearchDate, isMobile = false, setQueryOrder }) => {
  const [fromValue, setFromValue] = useState(timeFromValue);
  const [toValue, setToValue] = useState(timeToValue);

  return (
    <Grid alignItems="center" container item className={styles.wrapSearchDate} xs={12} md={12}>
      {isMobile ? (
        <>
          <Grid container alignItems="center" item xs={12} xl={4} md={4} className={styles.wrapActionDate}>
            <Grid item xs={2}>
              <Typography>Từ</Typography>
            </Grid>
            <Grid item xs={10}>
              <DateTimePickerV2
                value={fromValue}
                onChange={(date) => {
                  if (date) {
                    const t = date.setHours(0, 0, 0, 0);
                    if (t) {
                      setFromValue(new Date(t)?.toISOString());
                      setQueryOrder({ from: date });
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" item xs={12} xl={4} md={4} className={styles.wrapActionDate} style={{ marginTop: '10px' }}>
            <Grid item xs={2}>
              <Typography>Đến</Typography>
            </Grid>
            <Grid item xs={10}>
              <DateTimePickerV2
                value={toValue}
                onChange={(date) => {
                  if (date) {
                    const t = date.setHours(23, 59, 0, 0);
                    if (t) {
                      setToValue(new Date(t)?.toISOString());
                      setQueryOrder({ to: t });
                    }
                  }
                }}
                minDate={fromValue}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={styles.wrapBtnSearch} style={{ marginTop: '10px' }}>
            <ButtonV2 className={clsx(styles.BtnSearch, styles.btnSearchDate)} onClick={handleClickSearchDate}>
              Tìm Kiếm
            </ButtonV2>
          </Grid>
        </>
      ) : (
        <>
          <Grid alignItems="center" container item sm={5} className={clsx(styles.wrapActionDate, styles.md45)}>
            <Typography>Từ</Typography>
            <DateTimePickerV2
              className={styles.datePicker}
              value={fromValue}
              onChange={(date) => {
                if (date) {
                  const t = date.setHours(0, 0, 0, 0);
                  if (t) {
                    setFromValue(new Date(t)?.toISOString());
                    setQueryOrder({ from: t });
                  }
                }
              }}
            />
          </Grid>
          <Grid alignItems="center" container item className={clsx(styles.wrapActionDate, styles.md42)}>
            <Typography>Đến</Typography>
            <DateTimePickerV2
              className={styles.datePicker}
              value={toValue}
              onChange={(date) => {
                if (date) {
                  const t = date.setHours(23, 59, 0, 0);
                  if (t) {
                    setToValue(new Date(t)?.toISOString());
                    setQueryOrder({ to: t });
                  }
                }
              }}
              minDate={fromValue}
            />
          </Grid>
          <Grid item xs={1} className={styles.wrapBtnSearch}>
            <ButtonV2 className={clsx(styles.BtnSearch, styles.btnSearchDate)} onClick={handleClickSearchDate}>
              Tìm Kiếm
            </ButtonV2>
          </Grid>
        </>
      )}
    </Grid>
  );
});

const SearchBarMyOrder = ({ tabValue, handleChange, dataPanels, handleChangeTab, isMobile = false }) => (
  <Grid container item xs={12} alignItems="center">
    <Typography className={styles.textSearch}>Tìm Kiếm</Typography>
    <TabContext value={tabValue}>
      <TabList
        aria-label="orderList-tabs"
        scrollButtons="on"
        variant="scrollable"
        onChange={handleChange}
        className={styles.tabList}
        classes={{ indicator: styles.indicator, scrollButtons: styles.hideBtn }}
      >
        {orderTabList?.map(
          (tab) =>
            tab && (
              <Tab
                label={tab.label}
                value={tab.value}
                disableRipple
                key={tab.id}
                className={styles.tabOrder}
                classes={{ selected: styles.sellected }}
              />
            ),
        )}
      </TabList>
      {!isMobile && <TabPanel value={dataPanels.value} />}
    </TabContext>
    <Grid container item xs={12}>
      {handleChangeTab(tabValue)}
    </Grid>
  </Grid>
);

export default function OrderInfoTabs({ user, bankInfo, reasonsList, listInvoiceInfo, isMobile }) {
  const ref = React.useRef(null);
  const router = useRouter();
  const { status = ENUM_ORDER_STATUS.ALL, keyword = '', from = '', to = '', page = 1, type = 'ORDER_ID', orderId, skuCodes } = router?.query || {};
  const [stt, setStt] = useState(status || ENUM_ORDER_STATUS.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [orderRes, setOrderRes] = useState({});

  const [countSearch, setCountSearch] = useState(0);
  const [countStatus, setCountStatus] = useState([]);
  const queryOrder = useRef({
    page,
    type,
    keyword,
    orderId,
    skuCodes,
    status,
    from,
    to,
  });

  // Hám set nhanh
  const setQueryOrder = useCallback((p) => {
    queryOrder.current = { ...queryOrder.current, ...p };
  }, []);

  const totalPage = Math.ceil(orderRes?.total / limit);
  const orderList = getData(orderRes);

  const [tabValue, setTabValue] = useState(router.query.type || 'ORDER_ID');

  const getCountStatusByOrders = useCallback(async (timeFromOrder, timeTo, skusProducts, orderIdCode) => {
    const params = { offset: 0, limit: 1, getTotal: true };
    const q = {};
    if (timeFromOrder) q.timeFrom = timeFromOrder;

    if (timeTo) q.timeTo = timeTo;
    if (skusProducts) params.skuCodes = skusProducts;
    if (orderIdCode) q.orderId = Number(orderIdCode);

    const resultCountStatus = await Promise.all(
      tabs.map((tab) => OrderClient.searchOrder({ ...params, q: JSON.stringify({ ...q, status: tab.value }) })),
    );
    const filterRemoveNotFound = resultCountStatus?.map((res) => {
      if (res.status === 'NOT_FOUND') {
        return {
          total: 0,
          data: [],
        };
      }
      return res;
    });
    setCountStatus(filterRemoveNotFound);
    setIsLoading(false);
  }, []);

  const showCountSearch = (count) => {
    const { from, to, keyword, type } = queryOrder.current;
    if ((type === 'PRODUCT' && keyword) || (type === 'TIME' && (from || to))) {
      setCountSearch(count || 0);
    } else {
      setCountSearch(0);
    }
  };

  const loadData = useCallback(async ({ nextPage }) => {
    setIsLoading(true);
    // setOrderRes(null);
    const { type, orderId, skuCodes, keyword, page, limit = 20, status, from, to } = queryOrder.current;
    let q = {};
    if (status && status !== 'ALL') q.status = status;
    let params = {
      offset: (Number(nextPage || page) - 1) * limit,
      limit,
      getTotal: true,
      q: JSON.stringify(q),
    };

    let routerQuery = { page: Number(nextPage || page), type, status };

    if (orderId) {
      const [resSearch, invoiceRes] = await Promise.all([OrderClient.getOrderID(orderId), OrderClient.getInvoicesByOrderId({ orderId })]);
      // set lại invoice cho có thông tin invoice
      setOrderRes({ ...resSearch, data: [{ ...getFirst(resSearch), invoiceInfo: getFirst(invoiceRes) }] });
      params = { ...params, orderId };
      routerQuery = {
        type,
        orderId,
        page: 1,
        status,
      };
    } else {
      switch (type) {
        case 'PRODUCT':
          params.skuCodes = skuCodes;
          routerQuery = {
            ...routerQuery,
            skuCodes,
            keyword,
          };
          break;
        case 'TIME':
          // time
          if (from && to) {
            q = { ...q, timeFrom: new Date(Number(from)).toISOString(), timeTo: new Date(Number(to)).toISOString() };
            // if (orderStatus && orderStatus !== 'ALL') q.status = orderStatus;
            params = { ...params, q: JSON.stringify(q) };
            routerQuery = {
              ...routerQuery,
              from,
              to,
            };
          }
          break;
        case 'ORDER_ID':
        default:
          // get all
          params = { ...params };
      }

      const ordersRes = await OrderClient.searchOrder(params);
      showCountSearch(ordersRes?.total);
      setOrderRes(ordersRes);
    }

    queryOrder.current = { ...params, ...routerQuery };
    // router push
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...routerQuery,
        },
      },
      undefined,
      { shallow: false },
    );

    setIsLoading(false);
  }, []);

  // nhấn vào tab [mã đơn] [ sản phẩm] [thời gian]
  const handleChange = (event, newValue) => {
    if (newValue === tabValue) {
      return;
    }

    setTabValue(newValue);
    const valueDefault = { type: newValue, page: 1, orderId: '', keyword: '', skuCodes: [], from: null, to: null };
    switch (newValue) {
      case 'TIME':
        valueDefault.from = +getFirstDayOfMonth();
        valueDefault.to = +new Date().getTime();
        getCountStatusByOrders(new Date(valueDefault.from).toISOString(), new Date(valueDefault.to).toISOString());
        break;
      default:
        getCountStatusByOrders();
    }
    // router.push({ pathname: router.pathname, query: { type: newValue, page: 1, status: ord erStatus } }, undefined, { scroll: false, shallow: true });
    setQueryOrder(valueDefault);
    loadData({});
  };

  // nhấn vào tab order status , để load trang
  const handleChangeOrderStatus = async (statusR, totalStatus = 0) => {
    showCountSearch(totalStatus);
    setStt(statusR);
    setQueryOrder({ status: statusR, page: 1 });
    loadData({});
  };

  // hàm ra danh sách status
  const handleGetcountStatus = () => {
    const mapCountStatus = [tabs, countStatus].reduce((prevValue, currValue) => prevValue.map((data, i) => ({ ...data, ...currValue[i] })));
    const totalStatusALL = mapCountStatus
      .map(({ total }) => total)
      .filter(Boolean)
      .reduce((prev, curr) => prev + curr, 0);
    const tabAll = [{ label: 'Tất cả', value: ENUM_ORDER_STATUS.ALL, total: totalStatusALL }];
    return [...tabAll, ...mapCountStatus];
  };

  const handleRedirectQuickOrder = () => {
    router.push(QUICK_ORDER);
  };

  // search theo ngày
  const handleClickSearchDate = () => {
    const { from, to } = queryOrder.current || {};
    if (!from && !to) {
      NotifyUtils.error('Bạn chưa nhập ngày tìm kiếm đầy đủ');
      return;
    }

    const midNightDate = new Date(Number(from));
    const timeFromZ = new Date(midNightDate).toISOString();
    const timeToZ = new Date(Number(to)).toISOString();
    setQueryOrder({ page: 1 });
    loadData({});
    getCountStatusByOrders(timeFromZ, timeToZ);
  };

  // search theo mã order -> with component <SearchOrderCode />
  const handleSearch = useCallback(async () => {
    getCountStatusByOrders(null, null, null, queryOrder.current.orderId);
    loadData({});
  }, []);

  // search theo mã đơn = enter
  const handleEnterSearchOrder = (e) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      handleSearch();
    }
  };
  // DONE
  const handleChangeSearch = (e) => {
    setQueryOrder({ orderId: e.target.value });
  };
  // change tab các loại search theo component
  const dataPanels = orderTabList.filter((data) => data.value === type)[0] || {};

  const handleChangeTab = (typeSearch) => {
    switch (typeSearch) {
      case 'PRODUCT':
        return (
          <SearchOrderName
            getCountStatusByOrders={getCountStatusByOrders}
            isSending={isLoading}
            isMobile={isMobile}
            setQueryOrder={setQueryOrder}
            loadData={loadData}
          />
        );
      case 'TIME':
        if (!queryOrder.current.from) {
          setQueryOrder({ from: +getFirstDayOfMonth(), to: +new Date() });
        }
        return (
          <SearchOrderDateTime
            timeFromValue={from ? new Date(Number(from)).toISOString() : getFirstDayOfMonth().toISOString()}
            timeToValue={to ? new Date(Number(to)).toISOString() : new Date().toISOString()}
            handleClickSearchDate={handleClickSearchDate}
            setQueryOrder={setQueryOrder}
            loadData={loadData}
            isMobile={isMobile}
          />
        );
      default:
        return (
          <SearchOrderCode
            isMobile={isMobile}
            handleChangeSearch={handleChangeSearch}
            handleSearch={handleSearch}
            orderId={queryOrder.current.orderId}
            load={isLoading}
            handleEnterSearchOrder={handleEnterSearchOrder}
          />
        );
    }
  };

  const handleChangePage = async (_, nextPage) => {
    window.scrollTo({
      top: ref.current.offsetTop - 500,
      behavior: 'smooth',
    });
    loadData({ nextPage });
  };

  useEffect(() => {
    loadData({});
    if (from && to) {
      getCountStatusByOrders(new Date(Number(from)).toISOString(), new Date(Number(to)).toISOString());
    } else {
      getCountStatusByOrders(from, to, skuCodes, orderId);
    }
  }, []);

  // improve popup giấy tờ - APO-855
  const [selectedInvoices, setSelectedInvoices] = useState({ orderId: '' });

  return (
    <>
      <Grid container item xs={12} key="order-info-1" className={isMobile ? styles.wrapper_search_mobile : styles.wrapTopBox}>
        <Grid item xs={12} sm={6} className={styles.myOrder} style={{ height: '31px' }}>
          <Typography>Đơn Hàng Của Tôi</Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ height: '31px' }}>
          <Box className={styles.infoOrderRed}>
            <Typography> Xem thông tin xuất hoá đơn đỏ &nbsp;</Typography>
            <a href={PATH_INFO_BILL}>tại đây</a>
          </Box>
        </Grid>
        <SearchBarMyOrder
          isMobile={isMobile}
          tabValue={tabValue}
          handleChange={handleChange}
          dataPanels={dataPanels}
          handleChangeTab={handleChangeTab}
        />
      </Grid>
      <Grid container>
        <Grid item xs={12} className={styles.tabs}>
          <Paper elevation={0} style={{ background: 'transparent', marginTop: '15px' }} ref={ref}>
            <Tabs
              value={stt}
              textColor="primary"
              classes={{ indicator: styles.indicator, scrollButtons: styles.scrollBtn, root: styles.scrollBtnDisable }}
              variant="scrollable"
              scrollButtons="desktop"
            >
              {handleGetcountStatus().map(({ label, value: valueBtn, total }) => (
                <CustomTabV2
                  key={uuidV4()}
                  label={`${label} (${total || 0})`}
                  disableFocusRipple
                  disableRipple
                  onClick={() => handleChangeOrderStatus(valueBtn, total)}
                  value={valueBtn}
                  disabled={!!queryOrder.current.orderId}
                />
              ))}
            </Tabs>
          </Paper>
          {countSearch > 0 && (
            <Grid container alignItems="center" justifyContent="center" style={{ marginBottom: '10px' }} className={styles.searchResult}>
              <Typography>
                Có tất cả <span style={{ color: '#000000', fontWeight: 'bold' }}>{countSearch}</span> kết quả tìm kiếm
              </Typography>
            </Grid>
          )}
        </Grid>
        {orderList?.length === 0 ? (
          <Grid container item xs={12} justifyContent="center">
            <div className={styles.not_order_container}>
              <div className={styles.not_order_title}>Không có đơn hàng</div>
              <div>
                <ComeHomeButton onClick={handleRedirectQuickOrder}> Đến trang đặt hàng nhanh </ComeHomeButton>
              </div>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12}>
            {isLoading ? (
              <Grid container item xs={12} alignItems="center" justifyContent="center">
                <LoadingBM />
              </Grid>
            ) : (
              orderList &&
              orderList?.map((order) => (
                <OrderRowV2
                  {...order}
                  key={order.orderId}
                  user={user}
                  bankInfo={bankInfo}
                  reasonsList={reasonsList}
                  listInvoiceInfo={listInvoiceInfo}
                  isMobile={isMobile}
                  isAndroid={isAndroid}
                  isTablet={isTablet}
                  clearSelected={() => setSelectedInvoices({ orderId: '' })}
                  setSelectedInvoices={setSelectedInvoices}
                  isSelectedInvoices={selectedInvoices.orderId === order.orderId}
                  selectedInvoices={selectedInvoices}
                />
              ))
            )}
          </Grid>
        )}
        {orderList?.length > 0 && (
          <Grid item xs={12}>
            <div className={styles.justify_center}>
              <PaginationV2
                isMobile={isMobile}
                defaultPage={Number(queryOrder?.current?.page) || 1}
                count={totalPage || 1}
                variant="outlined"
                onChange={handleChangePage}
                page={Number(queryOrder?.current?.page) || 1}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
}
