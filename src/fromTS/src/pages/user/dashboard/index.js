/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import { Container, Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import clsx from 'clsx';
import DateTimePickerV2 from 'components-v2/atoms/DateTimePickerV2';
import { ButtonDefault } from 'components/atoms';
import Template from 'components/layout/Template';
import { CustomNoRowsOverlay } from 'components/mocules';
import { InfoContainer } from 'components/organisms';
import ExportDataAnalytics from 'components/organisms/ExportDataAnalytics';
import { useSetting } from 'context';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnalyticsService from 'services/AnalyticsService';
import { doWithServerSide } from 'services/SsrService';
import { DateTimeUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from '../styles.module.css';

const title = getTitle('Thống kê');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (ctxCallback, user) => {
      const { query } = ctx;
      const { from = null, to = null } = query;

      return {
        props: {
          from,
          to,
          user,
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const FORMATED_HOUR = 'YYYY-MM-DD';

const Dashboard = ({ user, isMobile, from, to }) => {
  const [data, setData] = useState({ loading: true });
  const router = useRouter();
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  const fromDate = DateTimeUtils.getFormattedDate(from ? new Date(from) : DateTimeUtils.getFirstDayOfMonth(), FORMATED_HOUR);
  const toDate = DateTimeUtils.getFormattedDate(to ? new Date(to) : new Date(), FORMATED_HOUR);

  const [fromDateState, setFromDateState] = useState(fromDate);
  const [toDateState, setToDateState] = useState(toDate);

  const loadData = useCallback(async ({ fromDateCur, toDateCur }) => {
    setData({ loading: true, fromDate: fromDateCur, toDate: toDateCur });

    const stateDateFrom = fromDateCur ? new Date(fromDateCur) : DateTimeUtils.getFirstDayOfMonth();
    const stateDateTo = toDateCur ? new Date(toDateCur) : new Date();
    const dateFrom = DateTimeUtils.getFormattedDate(stateDateFrom, FORMATED_HOUR);
    const dateTo = DateTimeUtils.getFormattedDate(stateDateTo, FORMATED_HOUR);
    setFromDateState(dateFrom);
    router.replace(
      {
        pathname: '/user/dashboard',
        query: {
          from: dateFrom,
          to: dateTo,
        },
      },
      null,
      { shallow: true },
    );

    const res = await AnalyticsService.getAnalyticsOrderByCustomer({
      from: stateDateFrom.toISOString(),
      to: stateDateTo.toISOString(),
      customerCode: user?.code,
    });
    const { data: topProduct = [], mapProduct = {}, topManufacturer = [], topSeller = [] } = res || {};
    topProduct.sort((a, b) => b.totalValue - a.totalValue);
    setData({
      topProduct,
      mapProduct,
      topManufacturer,
      topSeller,
      isLoading: false,
    });
  }, []);

  useEffect(async () => {
    loadData({ fromDateCur: from, toDateCur: to });
  }, []);

  const { topProduct = [], mapProduct = {}, topManufacturer = [] } = data || {};

  const dateVal = useRef({ from: fromDate, to: toDate });

  const handleChangeFormDate = () => {
    loadData({ fromDateCur: dateVal.current.from, toDateCur: dateVal.current.to });
  };

  const columnsTopProduct = [
    {
      field: 'image',
      headerName: 'Hình ảnh',
      flex: 0.25,
      renderCell: (params) => (
        <ImageFallbackProductImage
          className={styles.img}
          src={params?.row?.image && `${params?.row?.image}?size=200`}
          width="50"
          height="50"
          alt=""
          fallbackSrc={params?.row?.image}
        />
      ),
      cellClassName: styles.image,
    },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      flex: 1,
      cellClassName: styles.name,
      renderCell: (params) => (
        <div>
          <Link href={`/product/${params?.row?.slug || ''}`} prefetch={false}>
            <Typography className={styles.name}>{params?.row?.name || ''}</Typography>
          </Link>
          <div>
            <Typography className={styles.description}>{params?.row?.volume || ''}</Typography>
          </div>
        </div>
      ),
    },
    {
      field: 'totalQuantity',
      headerName: 'Số lượng',
      flex: 0.25,
      renderCell: (params) => <Typography className={styles.quantity}>{params?.row?.totalQuantity || 0}</Typography>,
    },
    {
      field: 'totalPrice',
      headerName: 'Giá trị',
      width: isMobile ? 85 : 200,
      headerAlign: 'right',
      renderCell: (params) => <Typography className={styles.price}>{formatCurrency(params?.row?.totalPrice || 0)}</Typography>,
    },
  ];

  // top manufacturers
  const columnsTopManufacturer = [
    {
      field: 'name',
      headerName: 'Nhà sản xuất',
      flex: 1,
      cellClassName: styles.name,
      renderCell: (params) => (
        <Link href={`/manufacturers/${params?.row?.id || ''}`} prefetch={false}>
          <Typography className={styles.name}>{params?.row?.name || ''}</Typography>
        </Link>
      ),
    },
    {
      field: 'totalQuantity',
      headerName: 'Số lượng',
      flex: 0.3,
      renderCell: (params) => <Typography className={styles.quantity}>{params?.row?.totalQuantity || 0}</Typography>,
    },
    {
      field: 'totalPrice',
      headerName: 'Giá trị',
      width: isMobile ? 85 : 200,
      headerAlign: 'right',
      renderCell: (params) => <Typography className={styles.price}>{formatCurrency(params?.row?.totalPrice || 0)}</Typography>,
    },
  ];

  const { mapManufactuers } = useSetting();
  const rowsTopProduct = topProduct?.map(({ sku = '', orderedQuantity: totalQuantity = 0, totalValue: totalPrice = 0 }) => {
    const { volume = '', imagesProxy = [], name = '', slug = '' } = mapProduct[sku] || {};
    return {
      id: sku,
      slug,
      volume,
      image: (imagesProxy.length > 0 && imagesProxy[0]) || '',
      name,
      totalQuantity,
      totalPrice,
    };
  });

  const rowsTopManufacturer =
    topManufacturer?.map(({ manufacturerCode = '', totalQuantity = 0, totalPrice = 0 }) => {
      const { name = '' } = mapManufactuers?.get(manufacturerCode) || {};
      return {
        id: manufacturerCode,
        name,
        totalQuantity,
        totalPrice,
      };
    }) || [];

  return (
    <Template isMobile={isMobile}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer value={4} title="Thống kê đơn hàng" subTitle="Dashboard" point={user?.point} name={user?.name} isMobile={isMobile}>
            <form className={styles.search} onSubmit={handleChangeFormDate}>
              <Grid container justifyContent="space-between">
                <Grid item xs={12} lg={5} md={5} sm={5}>
                  <Typography style={{ lineHeight: 2.5 }}>Từ ngày</Typography>
                  <DateTimePickerV2
                    name="from"
                    id="from"
                    value={fromDateState}
                    onChange={(date) => {
                      if (date) {
                        const t = date.setHours(0, 0, 0, 1);
                        if (t) {
                          dateVal.current = { ...dateVal.current, from: new Date(t) };
                          setFromDateState(new Date(t)?.toISOString());
                        }
                      }
                    }}
                    maxDate={new Date(toDateState)}
                    readOnly
                    isMobileV2={isMobileV2}
                  />
                </Grid>
                <Grid item xs={12} lg={5} md={5} sm={5}>
                  <Typography style={{ lineHeight: 2.5 }}>Đến ngày</Typography>
                  <DateTimePickerV2
                    value={toDateState}
                    id="to"
                    name="to"
                    title="Đến"
                    onChange={(date) => {
                      if (date) {
                        const t = date.setHours(0, 0, 0, 59);
                        if (t) {
                          dateVal.current = { ...dateVal.current, to: new Date(t) };
                          setToDateState(new Date(t)?.toISOString());
                        }
                      }
                    }}
                    minDate={new Date(fromDateState)}
                    maxDate={new Date()}
                    readOnly
                    isMobileV2={isMobileV2}
                  />
                </Grid>
                {isMobileV2 ? (
                  <Grid item xs={12} container justifyContent="flex-end" lg={2} md={2} alignItems="flex-end" sm={2}>
                    <ButtonDefault className={styles.btn} onSubmit={handleChangeFormDate} onClick={handleChangeFormDate}>
                      Tìm kiếm
                    </ButtonDefault>
                  </Grid>
                ) : (
                  <Grid item xs={12} container justifyContent={isMobile ? 'center' : 'flex-end'} lg={2} md={2} alignItems="flex-end" sm={2}>
                    <ButtonDefault className={styles.btn} onSubmit={handleChangeFormDate} onClick={handleChangeFormDate}>
                      Tìm kiếm
                    </ButtonDefault>
                  </Grid>
                )}
              </Grid>
            </form>
            <Grid style={{ display: 'flex', width: '100%' }}>
              <h2 className={styles.label} style={{ width: '100%', margin: '5px' }}>
                Danh sách sản phẩm đã mua
              </h2>
              {!isMobileV2 && (
                <div style={{ display: 'block', width: '100px' }}>
                  <ExportDataAnalytics
                    data={rowsTopProduct}
                    fromDate={fromDate}
                    toDate={toDate}
                    formatedToDate={toDateState}
                    formatedFromDate={fromDateState}
                  />
                </div>
              )}
            </Grid>

            <div style={{ background: '#fff', width: '100%', margin: '5px 0' }}>
              <DataGrid
                className={clsx(
                  styles.product,
                  styles.datagrid,
                  (!rowsTopProduct || rowsTopProduct.length === 0) && clsx(styles.emptyOrder, styles.empty),
                )}
                autoHeight
                rows={rowsTopProduct}
                columns={columnsTopProduct}
                pageSize={10}
                rowHeight={70}
                sortingOrder={['desc', 'asc']}
                disableColumnMenu
                sortModel={[
                  {
                    field: 'totalPrice',
                    sort: 'desc',
                  },
                ]}
                components={{
                  NoRowsOverlay: () => (
                    <CustomNoRowsOverlay
                      text={data.loading ? 'Dữ liệu đang được xử lý ' : 'Chưa có thông tin đơn hàng trong khoảng thời gian này.'}
                    />
                  ),
                }}
              />
            </div>
            {isMobileV2 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ExportDataAnalytics
                  data={rowsTopProduct}
                  fromDate={fromDate}
                  toDate={toDate}
                  formatedToDate={toDateState}
                  formatedFromDate={fromDateState}
                />
              </div>
            )}
            <h2 className={styles.label}>Danh sách nhà sản xuất bạn đã mua</h2>
            {/* <TypographyNotes variant="subtitle1"> ( Nhấn vào tên cột để có thể sắp xếp theo tăng dần hoặc giảm dần ) </TypographyNotes> */}
            <div style={{ background: '#fff', width: '100%', margin: '5px 0' }}>
              <DataGrid
                className={clsx(
                  styles.manufacturer,
                  styles.datagrid,
                  (!rowsTopProduct || rowsTopProduct.length === 0) && clsx(styles.emptyOrder, styles.empty),
                )}
                autoHeight
                rows={rowsTopManufacturer}
                columns={columnsTopManufacturer}
                pageSize={10}
                rowHeight={70}
                sortingOrder={['desc', 'asc']}
                disableColumnMenu
                sortModel={[
                  {
                    field: 'totalPrice',
                    sort: 'desc',
                  },
                ]}
                components={{
                  NoRowsOverlay: () => (
                    <CustomNoRowsOverlay
                      text={data.loading ? 'Dữ liệu đang được xử lý ' : 'Chưa có thông tin nhà sản xuất trong khoảng thời gian này.'}
                    />
                  ),
                }}
              />
            </div>
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Dashboard);
