import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Head from 'next/head';
import AppCS from 'pages/_layout';
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { Button, Grid, Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, Chip, Typography } from "@material-ui/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "containers/marketing/sale-campaign/detail/Filter.js"
import DialogAddProduct from "containers/marketing/sale-campaign/detail/New.js"
import { getSaleCampaignClient } from "client/saleCampaign";
import styles from './sale-campaign.module.css';
import { formatShortDateTime, formatShortTime, formatNumber, formatDateTime, isValid } from "components/global";
import { SaleCampaignButton } from "containers/sale-campaign/SaleCampaignStatus";
import DeleteIcon from '@material-ui/icons/Delete';
import { getSellerClient } from "client/seller";
import { getProductClient } from "client/product";
import { getAccountClient } from "client/account";
import { getSellerTicketClient } from "client/sellerTicket";
import { useRouter } from "next/router";
import { listTimeSlot } from "components/component/constant"

export async function loadData(ctx) {
    const props = {
        data: {},
        err: {},
        productErr: {},
        listCampaignProduct: [],
        accountMap: {},
        productMap: {},
        sellerMap: {},
        sellerOpts: [],
        productOpts: [],
        total: 0
    };

    let accountIds = [];
    let sellerCodes = [];
    let skus = [];
    let productIdMap = {};

    let campaignCode = ctx.query.code;

    const page = parseInt(ctx.query.page) || 0;
    const limit = parseInt(ctx.query.limit) || 20;
    const offset = page * limit;
    const q = JSON.parse(ctx.query.q ?? "{}");
    const filterData = q;
    props.filterData = filterData;

    const saleCampaignClient = getSaleCampaignClient(ctx, {})
    const campaignProductResp = await saleCampaignClient.getSaleCampaignProduct({ ...filterData, campaignCode: campaignCode }, offset, limit);
    if (campaignProductResp.status === "OK") {
        props.listCampaignProduct = campaignProductResp.data
        // map list id
        campaignProductResp.data?.map(item => {
            if (item.productID) productIdMap[item.productID] = item
            if (item.updateBy) accountIds.push(item.updateBy)
            if (item.sellerCode) sellerCodes.push(item.sellerCode)
            if (item.sku) skus.push(item.sku)
        });
        props.total = campaignProductResp.total
    } else {
        props.productErr = campaignProductResp
    }
    props.productIdMap = productIdMap
    const resp = await saleCampaignClient.getSaleCampaign({ campaignCode: campaignCode });
    if (resp.status === "OK") {
        // resp.data[0].flashSaleTimes = resp.data[0]?.flashSaleTimes?.map(item => {
        //     item?.detail?.map(el => {
        //         if(el.productIDs.length) {
        //             el.productIDs = el.productIDs?.map(element => {
        //                 return productIdMap[element] || ""
        //             })
        //         }
        //         return el
        //     })
        //     return item
        // }) || []
        props.data = resp.data[0];
    } else {
        props.err = resp
    }

    const sellerClient = getSellerClient(ctx, {});
    const productClient = getProductClient(ctx, {});
    const sellerTicketClient = getSellerTicketClient(ctx, {})

    const [accountResp, sellerResp, skuResp, sellerSearchResp] = await Promise.all([
        getAccountClient(ctx, {}).getAccountByIds(accountIds),
        sellerClient.getSellerBySellerCodes(sellerCodes),
        productClient.getProductListBySKUs([... new Set(skus)]),
        sellerClient.getSellerByName(''),
    ])

    if (accountResp.status === "OK") {
        accountResp.data.forEach(acc => {
            props.accountMap[acc.accountId] = acc;
        })
    }

    if (sellerResp.status === "OK") {
        sellerResp.data?.forEach(item => {
            props.sellerMap[item.code] = {
                label: item.name ?? "",
                id: item.sellerID ?? 0,
                value: item.code ?? ""
            }
        }) ?? []
    }

    if (skuResp.status === "OK") {
        skuResp.data?.forEach(item => {
            if (item.sku.code) props.productMap[item.sku.code] = item.product ?? {}
        })
    }

    return { props }
}

function InfoLine({ label, val, type }) {
    if (type === "status") {
        return (
            <Box className={styles.infoLine}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>
                    <SaleCampaignButton status={val} />
                </span>
            </Box>
        )
    }

    if (type === "flashsale") {
        return (
            <Box className={styles.infoLine}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>
                    {val?.map(item =>
                        <Chip style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item || "Không xác định"} />
                    )}
                </span>
            </Box>
        )
    }

    return (
        <Box className={styles.infoLine}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{val}</span>
        </Box>
    )
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

const SaleCampaignDetailPage = (props) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const data = props.data || {};
    console.log("props=", props)
    const router = useRouter()

    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const total = props.total || 0;
    const mapListTime = {}

    listTimeSlot?.forEach(item => mapListTime[item.value] = item.label)

    const convertDataFlashsale = () => {
        let arr = []
        data?.flashSaleTimes?.forEach(item => {
            arr = arr.concat(item?.detail?.map(el => {
                return mapListTime[el.code] || el.code
            }))
        })
        arr = [...new Set(arr)]
        return arr
    }

    const getTimeFlashsale = (flashSaleTime) => {
        let arr = []
        const objFlashSale = {}
        data?.flashSaleTimes?.forEach(item => {
            item?.detail?.forEach(el => {
                objFlashSale[el.ref] = mapListTime[el.code] || el.code
            })
        })

        flashSaleTime?.forEach(item => {
            arr = arr.concat({
                time: objFlashSale[item.code],
                dateTime: `${formatDateTime(item.startTime)}-${formatDateTime(item.endTime)}`
            })
        })
        return arr
    }

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/detail-sale-campaign",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };

    return (
        <AppCS select="/marketing/sale-campaign">
            <Head>
                <title>{'Thông tin chương trình'}</title>
            </Head>
            <MyCard>
                <MyCardHeader title={`Chương trình KM #${data.campaignName}`}></MyCardHeader>
                <MyCardContent>
                    <Grid container>
                        <Grid item xl={3} md={4} xs={6}>
                            {data?.banner && (
                                <img src={data.banner} alt={data.campaignName} width={300} height={150} />
                            )}
                        </Grid>
                        <Grid item xl={3} md={4} xs={6}>
                            <InfoLine label="Tên chương trình" val={data.campaignName} />
                            <InfoLine label="Thời gian đăng ký" val={`${formatShortDateTime(data.registrationStartTime)} - ${formatShortDateTime(data.registrationEndTime)}`} />
                            <InfoLine label="Thời gian áp dụng" val={`${formatShortDateTime(data.startTime)} - ${formatShortDateTime(data.endTime)}`} />
                            {data?.campaignType === "FLASH_SALE" && <InfoLine label="Khung giờ flashsale" type="flashsale" val={convertDataFlashsale()} />}
                        </Grid>
                        <Grid item xl={3} md={4} xs={6}>
                            <InfoLine label="Trạng thái" val={data.status} type="status" />
                            <InfoLine label="Số lượng nhà bán hàng" val={formatNumber(data.totalSeller)} />
                            <InfoLine label="Số lượng sản phẩm" val={formatNumber(data.totalProduct)} />
                        </Grid>
                    </Grid>
                </MyCardContent>
            </MyCard>
            <MyCard>
                <MyCardHeader title={'Danh sách sản phẩm'}>
                </MyCardHeader>
            </MyCard>
            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="20%" />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left">Hình ảnh</TableCell>
                                <TableCell align="left">Sản phẩm</TableCell>
                                <TableCell align="left">Nhà bán hàng</TableCell>
                                <TableCell align="left">Giá trước KM</TableCell>
                                <TableCell align="left">Giá trị giảm</TableCell>
                                <TableCell align="left">Giảm %</TableCell>
                                <TableCell align="left">Đã bán / Số lượng</TableCell>
                                <TableCell align="left">Giới hạn mua</TableCell>
                                {data?.campaignType === "FLASH_SALE" && <TableCell align="left">Khung giờ KM</TableCell>}
                                <TableCell align="left">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.flashSaleTimes?.map((item, index) =>
                                item.detail?.map((el, idx) =>
                                    <React.Fragment key={idx}>
                                        <TableCell align="left">{el.name} [{formatShortDateTime(item.startTime)} - {formatShortDateTime(item.endTime)}]</TableCell>
                                        {el.productIDs && el.productIDs.length > 0 ? (
                                            el.productIDs.map((row = props.productIdMap(row), index) => (
                                                <TableRow key={row.campaignProductID}>
                                                    <TableCell align="left"></TableCell>
                                                    <TableCell align="left">
                                                        {props.productMap[row.sku]?.imageUrls && (
                                                            <img src={props.productMap[row.sku]?.imageUrls} width={70}
                                                                height={70} />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="left">{props.productMap[row.sku]?.name}</TableCell>
                                                    <TableCell align="left">{props.sellerMap[row.sellerCode]?.label || ""}</TableCell>
                                                    <TableCell align="left">{formatNumber(row.price)}</TableCell>
                                                    <TableCell align="left">{row.saleType === "ABSOLUTE" ? formatNumber(row.absoluteDiscount) : "-"}</TableCell>
                                                    <TableCell align="left">{row.saleType === "PERCENTAGE" ? formatNumber(row.percentageDiscount) : "-"}</TableCell>
                                                    <TableCell align="left">{formatNumber(row.soldQuantity)} / {formatNumber(row.quantity)}</TableCell>
                                                    <TableCell align="left">{formatNumber(row.maxQuantityPerOrder)}</TableCell>
                                                    {data?.campaignType === "FLASH_SALE" &&
                                                        <TableCell align="left">
                                                            {getTimeFlashsale(row.flashSaleTime)?.map(item =>
                                                                <Tooltip title={item.dateTime}>
                                                                    <Chip style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item.time || "Không xác định"} />
                                                                </Tooltip>
                                                            )}
                                                        </TableCell>
                                                    }
                                                    <TableCell align="left">
                                                        <Link
                                                            href={`/marketing/detail-sale-campaign?code=${row.campaignProductCode}`}
                                                        >
                                                            <Tooltip title="Xoá">
                                                                <IconButton>
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} align="left">
                                                    Không có sản phẩm
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                )
                            )}
                        </TableBody>
                        <MyTablePagination
                            labelUnit="sản phẩm"
                            count={total}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />
                    </Table>
                </TableContainer>
            </MyCard>
            <DialogAddProduct isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} data={data} mapListTime={mapListTime} />
        </AppCS>
    )
};

export default function SaleCampaignDetail(props) {
    return renderWithLoggedInUser(props, SaleCampaignDetailPage);
}
