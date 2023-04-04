import React, { useState, useEffect } from "react";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import AppMarketing from "pages/_layout";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import { useRouter } from "next/router";
import { TableContainer, TableBody, Table, TableHead, TableCell, TableRow, Grid, Typography, Tooltip, Button } from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { ImportStatusButton } from "containers/import-history-deal/ImportStatusButton";
import { isValid } from "components/global";
import { ExportCSV } from "components/export-cvs";
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { useForm } from "react-hook-form";
import { getDealClient } from "client/deal";
import Link from 'next/link'
import { formatDateTime, formatNumber } from 'components/global'
import { PricingType } from "view-model/deal";
import AuthorizationScreen from "components/authorization-screen"
import AuthorizationButton from "components/authorization-button"
import { getAreaClient } from "client/area";
import { getMasterDataClient } from "client/master-data";
import { getCustomerClient } from "client/customer";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

async function loadData(ctx) {

    let props = {
        data: [],
        total: 0,
        info: {},
        areaMap: {},
        levelMap: {},
    }

    let data = { props };
    let query = ctx.query;
    let code = query.code
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    const client = getDealClient(ctx, data)

    const importResultResp = await client.getImportDeal({ code })
    if (importResultResp.status === "OK") {
        props.info = importResultResp.data[0] ?? {}
        const ids = []
        const productResp = await client.getListImportDetail({ offset, limit, q: { importResultCode: props.info?.code || "" } })
        if (productResp.status === "OK" && productResp.data) {
            props.total = productResp.total || 0
            props.data = productResp.data?.map(item => {
                item.response = JSON.parse(item?.response ?? "{}")
                item.request = JSON.parse(item?.request ?? "{}")
                if (item.request?.areaCodes?.find(item => item === "00")) item.request.areaCodes = ['ALL']
                ids.push(item.request.productID)
                return item
            }) || []
        }
    }

    props.areaMap["ALL"] = "Tất cả"
    const resArea = await getAreaClient(ctx, {}).getListArea();
    if (resArea.status == "OK") {
        resArea.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
        });
    }
    const resProvince = await getMasterDataClient(ctx, {}).getProvince(0, 100, '', [], true);
    if (resProvince.status == "OK") {
        resProvince.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
        });
    }

    props.levelMap["ALL"] = "Tất cả"
    const resLevel = await getCustomerClient(ctx, {}).getListLevel({ status: "ON" });
    if (resLevel?.status == 'OK') {
        resLevel.data?.forEach(element => {
            props.levelMap[element.code] = element.name ?? ""
        });
    }


    return data
}

function render(props) {
    const router = useRouter()
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const { total, info, data, areaMap, levelMap } = props

    const filterOpt = [
        {
            value: 1,
            label: "Cài đặt thời gian"
        },
        {
            value: 2,
            label: "Cài đặt giá"
        },
        {
            value: 3,
            label: "Cài đặt sản phẩm"
        },
        {
            value: 4,
            label: "Cài đặt sản phẩm"
        },
    ]

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách deal",
            link: "/marketing/deal"
        },
        {
            name: 'Danh sách lịch sử import deal hàng loạt',
            link: "/marketing/import-history-deal"
        },
        {
            name: 'Thông tin chi tiết import',
        }
    ]

    const [columnFilter, setColumnFilter] = useState(filterOpt)
    const [isLoading, setIsLoading] = useState(false)
    const { errors, setValue, control } = useForm({
        defaultValues: { column: [] },
        mode: "onChange",
    });

    useEffect(() => {
        if (!router.query.filter) return
        const filterData = JSON.parse(router.query.filter)
        if (filterData.length === 0) {
            setColumnFilter(filterOpt)
            return
        }
        const defaultValue = filterData.map(val => filterOpt.find(item => item.value === val) || { value: 0, label: "Không xác định" })
        setValue("column", defaultValue)
        setColumnFilter(defaultValue)
    }, [router.query.filter])

    const messageData = {
        "DEAL_TYPE_REQUIRED": "Thiếu mã loại deal",
        "DEAL_TYPE_INVALID": "Mã loại deal không hợp lệ",
        "NAME_MISSING": "Thiếu tên deal",
        "START_TIME_INVALID": "Thời gian bắt đầu phải lớn hơn thời gian hiển thị",
        "END_TIME_INVALID": "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        "SKU_MISSING": "Thiếu sku",
        "SKU_NOT_FOUND": "Danh sách sku không tìm thấy",
        "DISCOUNT_PERCENT_REQUIRED": "Thiếu phần trăm giảm giá",
        "DISCOUNT_PERCENT_INVALID": "Phần trăm giảm giá phải lớn hơn 0",
        "MAX_QUANTITY_REQUIRED": "Số lượng bán ra phải lớn hơn 0",
        "MAX_DISCOUNT_PERCENT_INVALID": "Giảm giá tối đa không được vượt quá giá gốc",
        "EXCEED_MAX_QUANTITY": "Số lượng bán ra không được lớn hơn 100,000",
        "EXCEED_DISCOUNT_PERCENT": "Phần trăm giảm giá không được lớn hơn 100%",
        "PRICE_INVALID": "Giá không được nhỏ hơn 1",
        "CHARGE_DEAL_FEE_REQUIRED": "Thiếu mã bên chịu giá chênh lệch",
        "CHARGE_DEAL_FEE_INVALID": "Mã bên chịu giá chênh lệch không hợp lệ",
        "PRICING_TYPE_REQUIRED": "Thiếu mã loại giảm giá",
        "PRICING_TYPE_INVALID": "Mã loại giảm giá không hợp lệ",
        "PRICE_REQUIRED": "Thiếu giá",
        "START_TIME_REQUIRED": "Thiếu thời gian bắt đầu",
        "END_TIME_REQUIRED": "Thiếu thời gian kết thúc",
        "READY_TIME_REQUIRED": "Thiếu thời gian cho phép hiển thị",
        "MAX_DISCOUNT_PERCENT_REQUIRED": "Thiếu giảm giá tối đa",
    }

    const formatDateTimeWithDefault = (time) => {
        const defaultTime = "0001-01-01T00:00:00Z"
        if (!time || time === defaultTime) {
            return null
        }

        return formatDateTime(time)
    }

    const getData = (resp) => {
        return isValid(resp) ?
            resp.data?.map((item) => {
                item.request = JSON.parse(item.request)
                item.response = JSON.parse(item.response)

                if (item.request?.areaCodes?.find(item => item === "00")) item.request.areaCodes = ['ALL']

                const dataExport = {
                    [`Tên deal*`]: item.request.name ?? "",
                    [`Mã loại deal*`]: item.request.dealType ?? "",
                    [`Thời gian bắt đầu*`]: formatDateTimeWithDefault(item.request.startTime) ?? "",
                    [`Thời gian kết thú*`]: formatDateTimeWithDefault(item.request.endTime) ?? "",
                    [`Thời gian cho phép hiển thị*`]: formatDateTimeWithDefault(item.request.readyTime) ?? "",
                    [`Số lượng bán ra`]: item.request.maxQuantity ?? "",
                    [`Mã loại giảm giá*`]: item.request.pricingType ?? "",
                    [`Giá*`]: item.request.price ?? "",
                    [`Phần trăm giảm giá*`]: item.request.discountPercent ?? "",
                    [`Giảm giá tối đa`]: item.request.maxDiscountValue ?? "",
                    [`Đối tượng khách hàng áp dụng*`]: item.request.areaCodes?.length ? item.request.areaCodes?.map(area => area)?.join(", ") : "ALL",
                    [`Khu vực áp dụng*`]: item.request.customerLevelCodes?.length ? item.request.customerLevelCodes?.map(level => level)?.join(", ") : "",
                    [`Mã sku*`]: item.request.skus?.length ? item.request.skus[0].sku : "",
                    [`Mã bên chịu giá chênh lệch*`]: item.request.chargeDealFee ?? "",
                    [`Kết quả`]: "Thất bại",
                    [`Lý do thất bại`]: messageData[item.response?.errorCode] || item.response?.message,
                }
                return dataExport;
            })
            : [];
    };

    const csvData = async () => {
        setIsLoading(true)
        const limit = 100;
        let dataExport = [];

        const totalResult = await getDealClient().getListImportDetail({ offset: 0, limit: 1, q: { importResultCode: router.query?.code || "" }, isFailedOnly: true })

        const totalPageSize = Math.ceil(totalResult?.total / limit);
        const arrayResult = [];
        for (let page = 0; page < totalPageSize; ++page) {
            const res = await getDealClient().getListImportDetail({ offset: page * limit, limit, q: { importResultCode: router.query?.code || "" }, isFailedOnly: true })
            arrayResult.push(res);
        }

        arrayResult.forEach(res => {
            dataExport = dataExport.concat(getData(res))
        })

        setIsLoading(false)
        return dataExport;
    };

    const handlePageChange = (event, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/import-history-deal/detail",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };

    const handleChange = (data) => {
        let values = []
        if (data.length !== 0) {
            values = data.map(item => item.value)
        }
        router.push({
            pathname: "/marketing/import-history-deal/detail",
            query: {
                ...router.query,
                filter: JSON.stringify(values)
            }
        });
    }

    return (
        <AuthorizationScreen linkAddress="/marketing">
            <AppMarketing breadcrumb={breadcrumb}>
                <Head>
                    <title>Thông tin chi tiết import</title>
                </Head>
                <MyCard>
                <MyCardHeader title={`Thông tin chi tiết import #${router.query?.code || ""}`}>
                        <Grid container justifyContent="flex-end">
                            {info.status === "IN_PROGRESS" &&
                                <Tooltip title="Làm mới trang">
                                    <Button style={{ marginRight: 10 }} variant="contained" color="primary" onClick={() => router.reload()}>
                                        Làm mới
                                    </Button>
                                </Tooltip>
                            }
                            <AuthorizationButton requiredAPI="POST/marketplace/product/v2/deal/import" style={{ display: "contents" }}>
                                <Link href="/marketing/deal/import">
                                    <Button style={{ marginRight: 8 }} variant="contained" color="primary">
                                        Import deal
                                    </Button>
                                </Link>
                            </AuthorizationButton>
                            <Tooltip title={info.status === "IN_PROGRESS" ? "Chỉ xuất file khi import hoàn thành" : "Xuất file excel lỗi"}>
                                <div>
                                    <ExportCSV loading={isLoading} disabled={info.status === "IN_PROGRESS"} text="Xuất file excel lỗi" csvData={csvData} fileName="KetQuaImportDealHangLoat" />
                                </div>
                            </Tooltip>
                        </Grid>
                    </MyCardHeader>
                    {info?.code &&
                        <MyCardContent>
                            <Grid item container md={9} spacing={2}>
                                <Grid item xs={12} md={2}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        Người tạo:
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={10}>
                                    <Typography>
                                        {info.username || info.accountID}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={2} container alignItems="center">
                                    <Typography style={{ fontWeight: "bold" }}>
                                        Trạng thái:
                                    </Typography>
                                </Grid>

                                <Grid container alignItems="center" item xs={12} md={10}>
                                    <ImportStatusButton status={info.status} />
                                    {info.status === "DONE" &&
                                        <Typography style={{ color: "green", marginLeft: 10 }}>
                                            Thành công: {info.succeed || 0} / {info.total || 0} deal
                                        </Typography>
                                    }
                                </Grid>

                                <Grid item xs={12} md={2}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                    Trường thông tin hiển thị:
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <MuiMultipleAuto
                                        options={filterOpt}
                                        name="column"
                                        placeholder="Chọn trường thông tin để hiển thị"
                                        control={control}
                                        errors={errors}
                                        onValueChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </MyCardContent>
                    }
                </MyCard>

                <MyCard>
                    <TableContainer>
                        <Table>
                            <colgroup>
                                <col width="5%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="15%" />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">STT</TableCell>
                                    <TableCell align="left">Tên<span style={{ color: "red" }}>*</span></TableCell>
                                    {columnFilter?.map(item =>
                                        <TableCell key={item.value} align="left">
                                            {item.label}
                                        </TableCell>
                                    )}
                                    <TableCell align="left">Kết quả</TableCell>
                                    <TableCell align="left">Lý do thất bại</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data?.length > 0 && data?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{page * limit + index + 1}</TableCell>
                                        <TableCell align="left">
                                            {row.response.data ?
                                                <React.Fragment>
                                                    <Link href={`/marketing/deal/edit?dealCode=${row.response.data[0]?.code || ""}`}>
                                                        <a target="_blank" style={{ color: "green", textDecoration: "none" }}>
                                                            {row.response.data[0]?.code || " - "}
                                                        </a>
                                                    </Link>
                                                    {row.response.data[0]?.code && row.request.name ? " - " : ""}
                                                </React.Fragment>
                                                : ""
                                            } {row.request.name ?? ""}
                                        </TableCell>
                                        {columnFilter?.map(item => {
                                            if (item.value === 1) {
                                                return <TableCell key={item.value} align="left" style={{ maxWidth: "250px" }}>
                                                    Thời gian bắt đầu: {formatDateTimeWithDefault(row.request.startTime) ?? " - "}
                                                    <br />
                                                    Thời gian kết thúc: {formatDateTimeWithDefault(row.request.endTime) ?? " - "}
                                                    <br />
                                                    Thời gian cho phép hiển thị: {formatDateTimeWithDefault(row.request.readyTime) ?? " - "}
                                                </TableCell>
                                            } else if (item.value === 2) {
                                                return <TableCell key={item.value} align="left">
                                                    Số lượng bán ra: {!row.request.maxQuantity && row.request.maxQuantity !== 0 ? " - " : formatNumber(row.request.maxQuantity)}
                                                    <br />
                                                    Mã loại giảm giá: {row.request.pricingType ?? " - "}
                                                    <br />
                                                    {row.request.pricingType === PricingType.ABSOLUTE ?
                                                        <React.Fragment>
                                                            Giá: {!row.request.price && row.request.price !== 0 ? " - " : formatNumber(row.request.price)}
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                             Phần trăm giảm giá: {!row.request.discountPercent && row.request.discountPercent !== 0 ? " - " : formatNumber(row.request.discountPercent)}
                                                            <br />
                                                            Giảm giá tối đa: {!row.request.maxDiscountValue && row.request.maxDiscountValue !== 0 ? " - " : formatNumber(row.request.maxDiscountValue)}
                                                        </React.Fragment>
                                                    }
                                                </TableCell>
                                            } else if (item.value === 3) {
                                                return <TableCell key={item.value} align="left">
                                                    Đối tượng khách hàng áp dụng: {row.request.customerLevelCodes?.length ? row.request.customerLevelCodes?.map(level => levelMap[level] ?? level).join(", ") : levelMap["ALL"]}
                                                    <br />
                                                    Khu vực áp dụng: {row.request.areaCodes?.length ? row.request.areaCodes?.map(area => areaMap[area] ?? area).join(", ") : areaMap["ALL"]}
                                                </TableCell>
                                            } else if (item.value === 4) {
                                                return <TableCell key={item.value} style={{
                                                    minWidth: "200px"
                                                }} align="left">
                                                    Mã sku: {row.request.skus?.length ? row.request.skus[0].sku : " - "}
                                                    <br />
                                                    Mã bên chịu giá chênh lệch: {row.request.chargeDealFee ?? " - "}
                                                </TableCell>
                                            }

                                            return <></>
                                        })}
                                        <TableCell align="left" style={{
                                            minWidth: "120px"
                                        }}>
                                            <span style={{
                                                color: row.status === "OK" ? "green" : row.status === "PENDING" ? "blue" : "red",
                                                fontWeight: "bold"
                                            }}>
                                                {row.status === "OK" ?
                                                    "Import thành công" :
                                                    row.status === "PENDING" ?
                                                    "Đang xử lý" :
                                                        "Import thất bại"
                                                }
                                            </span>
                                        </TableCell>
                                        <TableCell align="left" width="15%">
                                            {row.response?.status !== "OK" ? (
                                                <>{messageData[row.response?.errorCode] || row.response?.message}</>
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
                                labelUnit="Deal"
                                count={total}
                                rowsPerPage={limit}
                                page={page}
                                onChangePage={handlePageChange}
                            />
                        </Table>
                    </TableContainer>
                </MyCard>
            </AppMarketing >
        </AuthorizationScreen>
    )
}