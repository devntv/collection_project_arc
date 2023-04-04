import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import AppCMS from "pages/_layout";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAccountClient } from "client/account";
import { TableContainer, TableBody, Table, TableHead, TableCell, TableRow, Tooltip, Tabs, Tab, Grid, Typography, Chip, Button, FormHelperText } from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { ImportStatusButton } from "containers/sale-campaign/import-result/ImportStatusButton";
import { getSaleCampaignClient } from "client/saleCampaign";
import Link from "next/link";
import { formatNumber, formatShortDateTime, isValid } from "components/global";
import { getProductClient } from "client/product";
import { formatTime } from "components/component/util";
import { listTimeSlot } from "components/component/constant"
import { ExportCSV } from "components/export-cvs";
import ModalImport from "containers/sale-campaign/import-result/ImportModal";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

// load history of
async function loadData(ctx) {

    let props = {
        data: [],
        total: 0,
        filterData: {},
        account: {},
        info: {},
        campaignData: {},
        productMap: {},
    }
    let data = { props };
    let query = ctx.query;
    let code = query.code
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query.q ?? "{}");

    const importResultResp = await getSaleCampaignClient(ctx, data).getListImportResult(0, 20, {
        code
    })
    if (importResultResp.status === "OK") {
        props.info = importResultResp.data[0] ?? {}
        const saleCampaignResp = await getSaleCampaignClient(ctx, data).getSaleCampaign({ campaignCode: props.info?.campaignCode || "" })
        if (saleCampaignResp.status === "OK" && saleCampaignResp.data) {
            props.campaignData = saleCampaignResp.data?.[0] || {}
        }
    }

    const resp = await getSaleCampaignClient(ctx, data).getDetailImportResult(code, offset, limit, q)
    if (resp.status === "OK") {
        props.data = resp.data?.map(item => {
            const request = item.request?.replace("/", "") ?? "{}"
            item.request = JSON.parse(request)

            const response = item.response?.replace("/", "") ?? "{}"
            item.response = JSON.parse(response)
            return item
        }) ?? []
        props.total = resp.total ?? 0
    }

    if (props.data.length > 0) {
        const skus = props.data.map(item => {
            return item.request.sku ?? null
        })
        const productResp = await getProductClient(ctx, data).getProductListBySKUs(skus)
        if (productResp.status === "OK") {
            productResp.data?.map(product => {
                props.productMap[product.sku?.code] = product.product ?? null
            })
        }
    }

    if (props.info?.code && props.info?.createdBy) {
        const accountResp = await getAccountClient(ctx, data).getAccountByIds([props.info.createdBy])
        if (accountResp.status === "OK" && accountResp.data) {
            props.account = accountResp.data[0]
        }
    }

    return data
}

let breadcrumb = [
    {
        name: "Trang chủ",
        link: "/marketing",
    },
    {
        name: "Lịch sử import sản phẩm hàng loạt",
        link: "/marketing/import-result-sale-campaign"
    },
    {
        name: "Thông tin chi tiết import",
        link: "/marketing/detail-import-result-sale-campaign"
    }
]

const errorMessage = {
    "GET_SKU_FAIL": "Không tìm thấy sản phẩm",
    "SKU_EXISTED": "Sản phẩm này đã tồn tại trong CTKM",
    "FLASH_SALE_TIME_NOT_MATCH": "Khung giờ KM không hợp lệ",
    "PRODUCT_NOT_MATCH": "SKU không thỏa mãn điều kiện tham gia CTKM ",
    "PRODUCT_CATEGORY_NOT_MATCH": "Danh mục của sản phẩm không thỏa mãn điều kiện tham gia CTKM"

}

const messageMap = {
    "SaleType must be one of [ABSOLUTE PERCENTAGE]": "Hình thức khuyến mãi phải là ABSOLUTE hoặc PERCENTAGE",
    "Vui lòng nhập saleType": "Vui lòng nhập hình thức khuyến mãi",
    "Vui lòng nhập giá trị quantity lớn hơn 1 kí tự": "Số lượng bán ra lớn hơn 0",
    "Vui lòng nhập quantity": 'Số lượng bán ra phải lớn hơn 0'
}

function render(props) {
    // console.log(props)
    const router = useRouter()
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const { total, account, info, productMap, campaignData, data } = props
    const [openModalImport, setOpenModalImport] = useState(false);

    const mapListTime = {}
    const allFlashSaleTime = []

    campaignData?.flashSaleTimes?.forEach(item => {
        item?.detail?.forEach(el => {
            const saleTime = {
                value: el.ref,
                label: (mapListTime[el.code] || el.code) + " (" + formatShortDateTime(item.startTime) + " - " + formatShortDateTime(item.endTime) + ")",
            }
            allFlashSaleTime.push(saleTime)
        })
    })


    listTimeSlot?.forEach(item => mapListTime[item.value] = item.label)

    const getTimeFlashsale = (flashSaleTime) => {
        let arr = []
        const objFlashSale = {}
        campaignData?.flashSaleTimes?.forEach(item => {
            item?.detail?.forEach(el => {
                objFlashSale[el.ref] = {
                    time: mapListTime[el.code] || el.code,
                    dateTime: `${formatShortDateTime(item.startTime)} - ${formatShortDateTime(item.endTime)}`,
                    productIds: el.productIDs
                }
            })
        })

        flashSaleTime?.forEach(item => {
            if (item?.trim() !== "") {
                arr = arr.concat({
                    time: objFlashSale[item]?.time,
                    dateTime: objFlashSale[item]?.dateTime,
                    code: item
                })
            }
        })
        return arr
    }

    const getData = (resp) => {
        return isValid(resp)
            ? resp.data?.map((item) => {

                const request = item.request?.replace("/", "") ?? "{}"
                item.request = JSON.parse(request)

                const response = item.response?.replace("/", "") ?? "{}"
                item.response = JSON.parse(response)

                const dataExport = {
                    'SKU': item.request.sku,
                    'Hình thức khuyến mãi': item.request.saleType ?? "",
                    '% giảm/số tiền giảm': item.request.saleType === "ABSOLUTE" ? (item.request.absoluteDiscount ?? "") : (item.request.percentageDiscount ?? ""),
                    'Số lượng bán ra': formatNumber(item.request.quantity),
                    'Giới hạn mua': formatNumber(item.request.maxQuantityPerOrder) || "0",
                    'Khung giờ': item.request.flashSaleTimeRefs?.map(time => time)?.join(", ") ?? "",
                    'Kết quả': item.status === "OK" ? "Thành công" : "Thất bại",
                    'Lý do thất bại': item.status !== "OK" ? (!item.request?.sku || item.request?.sku === "") ? "SKU không hợp lệ" : (errorMessage[item.response?.errorCode] ?? (messageMap[item.response?.message] ?? item.response?.message)) : ""
                }
                return dataExport;
            })
            : [];
    };

    const csvData = async () => {

        const limit = 100;
        let dataExport = [];
        const totalResult = await getSaleCampaignClient().getDetailImportResult(router.query?.code || "", 0, 1, {});

        const totalPageSize = Math.ceil(totalResult?.total / limit);
        const requestGetAllData = [];
        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(
                getSaleCampaignClient().getDetailImportResult(router.query?.code || "", page * limit, limit, {})
            );
        }

        const arrayResult = await Promise.all(requestGetAllData);

        arrayResult.forEach(res => {
            dataExport = dataExport.concat(getData(res))
        })

        return dataExport;
    };

    const displayPrice = (row) => {
        switch (row.request?.saleType) {
            case "PERCENTAGE":
                return <>
                    {(row.request?.percentageDiscount || "") + "% "}
                    <br />
                    {row.request?.maxDiscount && `Tối đa: ${formatNumber(row.maxDiscount)}`}

                </>
            case "ABSOLUTE":
                return `${formatNumber(row.request?.absoluteDiscount || 0)}`
            default:
                return "-";
        }
    }

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/detail-import-result-sale-campaign",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };


    return (<AppCMS breadcrumb={breadcrumb}>
        <Head>
            <title>Thông tin chi tiết import</title>
        </Head>
        <MyCard>
            <MyCardHeader title={`Thông tin chi tiết import #${router.query?.code || ""}`}>
                <Grid container justifyContent="flex-end">

                    <Authorization requiredAPI="POST/marketplace/promotion/v1/campaign-product/import">
                        <Button variant="contained" color="primary" style={{ marginRight: 15 }} onClick={() => setOpenModalImport(true)}>
                            Thêm SP hàng loạt
                        </Button>
                    </Authorization>

                    <Authorization requiredScreen="/marketing/export-excel">
                        <ExportCSV csvData={csvData} fileName={`Chi_tiet_import#${router.query?.code || ""}`} />
                    </Authorization>
                </Grid>

            </MyCardHeader>
            {info?.code && (
                <MyCardContent>
                    <Grid container spacing={2} >
                        <Grid item md={3}>
                            {campaignData?.banner && (
                                <img src={campaignData.banner} alt={campaignData.campaignName} width={300} height={150} style={{ objectFit: "contain" }} />
                            )}
                        </Grid>

                        <Grid item container md={9} spacing={2}>
                            <Grid item xs={12} md={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Mã - Tên chương trình:
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={10}>
                                <Link
                                    href={`/marketing/detail-sale-campaign?code=${campaignData?.campaignCode || ""}`}
                                    prefetch={false}>
                                    <Tooltip
                                        title={`Nhấn để xem chi tiết CTKM: ${campaignData?.campaignName || ""}`}>
                                        <a color="primary" style={{
                                            textDecoration: "none !important",
                                            cursor: "pointer",
                                            color: "green",
                                            fontSize: "16px"
                                        }}>
                                            {campaignData?.campaignCode} - {campaignData?.campaignName || " - "}
                                        </a>
                                    </Tooltip>
                                </Link>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Người thực hiện:
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={10}>
                                <Typography>
                                    {account?.username || " - "}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Thời gian thực hiện:
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={10}>
                                <Typography>
                                    {formatTime(info?.createdTime || null)}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Số sản phẩm thành công:
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={10}>
                                <Typography>
                                    {info.status === "IN_PROGRESS" ? (<>Đang cập nhật</>) : (
                                        <>
                                            {info.success ?? 0}/{info.total ?? 0}
                                        </>
                                    )}

                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <Typography style={{ fontWeight: "bold" }}>
                                    Trạng thái:
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={10}>
                                <ImportStatusButton status={info.status} />
                            </Grid>
                        </Grid>

                    </Grid>
                </MyCardContent>
            )}

        </MyCard>

        <MyCard>
            <TableContainer>
                <Table>
                    <colgroup>
                        <col width="5%" />
                        <col />
                        <col />
                        <col />
                        <col width="10%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">STT</TableCell>
                            <TableCell align="left">SKU</TableCell>
                            <TableCell align="left">Hình ảnh</TableCell>
                            <TableCell align="left">Sản phẩm</TableCell>
                            {campaignData?.campaignType === "FLASH_SALE" && <TableCell align="left">Khung giờ KM</TableCell>}
                            <TableCell align="left">Hình thức
                                <br />
                                khuyến mãi</TableCell>
                            <TableCell align="left">Giá sau KM</TableCell>
                            <TableCell align="left">Giảm giá
                                <br />
                                (%/VNĐ)</TableCell>
                            <TableCell align="left">Số lượng
                                <br />
                                bán ra</TableCell>
                            <TableCell align="left">

                                Giới hạn
                                <br />
                                mua
                                <Tooltip title={"Số lượng sản phẩm tối đa trên một đơn hàng. Nếu nhập 0 thì tương ứng với 100,000"}>
                                    <HelpOutlineIcon style={{ marginLeft: 8, transform: "translateY(5px)" }} />
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left">Kết quả</TableCell>
                            <TableCell align="left">Lý do thất bại</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data?.length > 0 && data?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{page * limit + index + 1}</TableCell>
                                <TableCell align="left">
                                    <strong>{row.request.sku ?? " - "}</strong> <br />
                                    {/* Bên chịu phí: {row.request.chargeFee ?? "MEDX"} */}
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        productMap[row.request.sku]?.imageUrls && productMap[row.request.sku]?.imageUrls?.length > 0 ? (
                                            <img src={productMap[row.request.sku]?.imageUrls[0]} width={70} height={70} style={{ objectFit: "contain" }} />
                                        ) : "-"
                                    }
                                </TableCell>
                                <TableCell align="left" style={{ maxWidth: "250px" }}>
                                    {productMap[row.request?.sku] ? (
                                        <Link
                                            href={`/cms/product/edit?productCode=${productMap[row.request?.sku]?.code}`}
                                            prefetch={false}>
                                            <Tooltip
                                                title={`Nhấn để xem chi tiết sản phẩm: ${productMap[row.request?.sku]?.name}`}>
                                                <a color="primary" style={{
                                                    textDecoration: "none !important",
                                                    cursor: "pointer",
                                                    color: "green"
                                                }}>
                                                    {productMap[row.request?.sku]?.name || "-"}
                                                </a>
                                            </Tooltip>
                                        </Link>
                                    ) : "-"}
                                </TableCell>
                                {campaignData?.campaignType === "FLASH_SALE" && <TableCell align="left">
                                    {getTimeFlashsale(row.request?.flashSaleTimeRefs)?.map((item, idx) =>
                                        <Tooltip title={item?.dateTime || "Không xác định"} key={idx}>
                                            <Chip style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item?.time || (item?.code || "Không xác định")} />
                                        </Tooltip>
                                    )}
                                </TableCell>}
                                <TableCell align="left">{row.request?.saleType ?? " - "}</TableCell>
                                <TableCell align="left">
                                    {row.request?.campaignPrice ? formatNumber(row.request.campaignPrice) : "-"}
                                </TableCell>
                                <TableCell align="left">
                                    {displayPrice(row)}
                                </TableCell>
                                <TableCell align="left">{row.request?.quantity || "0"}</TableCell>
                                <TableCell align="left">{formatNumber(row.request?.maxQuantityPerOrder) ?? "100,000"}
                                </TableCell>
                                <TableCell align="left">
                                    {row.status === "OK" && <span style={{ color: "green", fontWeight: "bold" }}>
                                        Thành công
                                    </span>}

                                    {row.status !== "OK" && <span style={{ color: "red", fontWeight: "bold" }}>
                                        Thất bại
                                    </span>}
                                </TableCell>
                                <TableCell align="left" width="15%">
                                    {row.response?.status !== "OK" ? (
                                        <>{(!row.request?.sku || row.request?.sku === "") ? "SKU không hợp lệ" : (errorMessage[row.response?.errorCode] ?? (messageMap[row.response?.message] ?? row.response?.message))}</>
                                    ) : " - "}
                                </TableCell>
                            </TableRow>
                        ))}

                        {data?.length === 0 && (
                            <TableRow >
                                <TableCell colSpan={3} align="left">{info.status === "IN_PROGRESS" ? "Import đang được xử lý. Vui lòng đợi trong giây lát." : "Không tìm thấy thông tin import"}</TableCell>
                            </TableRow>
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

            <ModalImport
                open={openModalImport} onClose={() => {
                    setOpenModalImport(false);
                }}
                onCancel={() => {
                    setOpenModalImport(false);
                }}
                data={campaignData}
                listFlashsale={allFlashSaleTime}
            />

        </MyCard>

    </AppCMS >)
}