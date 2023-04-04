import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login"
import { getProductClient } from "client/product"
import AppMarketing from 'pages/_layout'
import Head from "next/head"
import { useToast } from '@thuocsi/nextjs-components/toast/useToast'
import { MyCard, MyCardHeader, MyCardContent, MyCardActions } from "@thuocsi/nextjs-components/my-card/my-card"
import { MuiAutoFuzzy } from "@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy"
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableContainer,
    TableHead,
    TableRow, IconButton, TextField, Grid, InputAdornment
} from "@material-ui/core"
import { SaveRounded, SearchRounded, HistoryRounded } from "@material-ui/icons"
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import router, { useRouter } from 'next/router'
import XLSX from "xlsx"
import { isNumber } from "components/global"
import CircularProgress from '@material-ui/core/CircularProgress';
import Authorization from "@thuocsi/nextjs-components/authorization/authorization"

function SkuPointRender({ productMap, skuList, total, skuCode = "", productName }) {
    const productClient = getProductClient()
    const formHook = useForm({ defaultValues: { productSearch: productName ? { label: productName, value: "" } : "" } })
    const router = useRouter()
    const { query } = router
    const { page = 0, limit = 20 } = query
    const [skuSearch, setSkuSearch] = useState(skuCode?.skuCodes?.[0] || "")
    const [loading, setLoading] = useState(false)
    const { error } = useToast();

    useEffect(() => {
        const { q } = router.query
        if (!q) {
            setSkuSearch("")
            formHook.setValue("productSearch", "")
        }
    }, [router.query])
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Cài đặt điểm",
        }
    ]
    const handleRowsPerPageChange = (value) => {
        const { q } = router.query
        router.push(`/marketing/sku-point?page=0&limit=${value}${!!productName ? `&productName=${productName}` : ""}&q=${q ? q : ""}`)
    }
    const handlePageChange = (event, newPage) => {
        const { q } = router.query
        router.push(`/marketing/sku-point?page=${newPage}&limit=${limit}&q=${q ? q : ""}`)
    }
    const filterSku = () => {
        if (!!skuSearch) {
            router.push(`/marketing/sku-point?page=${0}&limit=${limit}&q=${JSON.stringify({
                skuCodes: [skuSearch]
            })}`)
        } else {
            router.push(`/marketing/sku-point?page=${0}&limit=${limit}`)
        }
    }

    async function exportFile() {
        const { q = "" } = router.query
        setLoading(true)
        const params = {
            q,
            offset: 0,
            limit: 1000,
            getTotal: true
        }
        let jsonSheet = []
        let ws
        const skuListResp = await productClient.exportSkuPoint(params)
        if (skuListResp.status === 'OK') {
            const total = skuListResp?.total || 0
            let fetchedAmount = 1000

            jsonSheet = skuListResp.data.map(item => ({
                'Mã SKU': item.code,
                'Điểm tích luỹ': item.point,
                'Hệ số nhân': item.pointMultiplier
            }))
            ws = XLSX.utils.json_to_sheet(jsonSheet)
            while (fetchedAmount < total) {
                let moreSkuResp = await productClient.exportSkuPoint({
                    q,
                    offset: fetchedAmount,
                    limit: 1000
                })
                if (moreSkuResp.status === 'OK') {
                    jsonSheet = moreSkuResp.data.map(item => ({
                        'Mã SKU': item.code,
                        'Điểm tích luỹ': item.point === 0 ? "" : item.point,
                        'Hệ số nhân': item.pointMultiplier === 0 ? "" : item.pointMultiplier
                    }))
                    ws = XLSX.utils.sheet_add_json(ws, jsonSheet, { skipHeader: true, origin: `A${fetchedAmount + 2}` })
                    fetchedAmount += moreSkuResp.data.length
                } else {
                    break;
                }
            }


        } else {
            error(skuListResp?.message)
            setLoading(false)
            return
        }

        var wscols = [
            { wch: 40 },
            { wch: 20 },
            { wch: 20 }
        ];

        const wb = XLSX.utils.book_new();
        wb.SheetNames.push("sku-point");


        ws['!cols'] = wscols;
        wb.Sheets["sku-point"] = ws;
        setLoading(false)
        return XLSX.writeFile(wb, ('CaiDatDiem' + '.xlsx'));
    }
    return (
        <AppMarketing select="/marketing/sku-point" breadcrumb={breadcrumb}>
            <Head>
                <title>Cài đặt điểm</title>
            </Head>
            <MyCard>
                <MyCardHeader title={"CÀI ĐẶT ĐIỂM TÍCH LUỸ CHO TỪNG SKU"}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Authorization requiredAPI="POST/marketplace/product/v2/sku/point/import">
                            <Button onClick={() => router.push('/marketing/sku-point/import')}
                                style={{ marginLeft: "auto", margin: 4 }} variant="contained" color="primary">
                                Import File
                            </Button>
                        </Authorization>
                        <Authorization requiredAPI="GET/marketplace/product/v2/sku/point/export">
                            <Button disabled={loading} onClick={() => exportFile()} style={{ margin: 4 }} variant="contained" color="primary">
                                Export File
                                {loading && <CircularProgress style={{ color: "white", marginLeft: 10 }} size={20} />}
                            </Button>
                        </Authorization>
                    </div>
                </MyCardHeader>
                <MyCardContent>
                    <Grid container spacing={2} >
                        <Grid xs md={4} item>
                            <TextField
                                label="Mã SKU"
                                fullWidth
                                placeholder="Tìm theo code"
                                size="small"
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        filterSku()
                                    }
                                }}
                                value={skuSearch} variant="outlined" onChange={(event) => {
                                    formHook.setValue("productSearch", "")
                                    setSkuSearch(event.target.value.trim())
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton variant="contained" onClick={() => filterSku()}><SearchRounded color="action" /></IconButton >
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid xs md={4} item>
                            <MuiAutoFuzzy
                                onValueChange={(item) => {
                                    if (item) {
                                        router.push(`/marketing/sku-point?page=${0}&limit=${limit}&productName=${item.label}&q=${JSON.stringify({
                                            productCodes: [item.value]
                                        })}`)
                                        return
                                    }
                                    control.setValue("productSearch", null)
                                    router.push(`/marketing/sku-point?page=${0}&limit=${limit}`)
                                }}
                                componentType="MUI_SINGLE"
                                type="PRODUCT"
                                filterForm={formHook}
                                name="productSearch"
                                label="Tên sản phẩm"
                                placeholder="Nhập tên sản phẩm" />
                        </Grid>
                    </Grid>
                </MyCardContent>
                <MyCardActions>
                    <Button style={{ marginLeft: "auto" }} variant="contained" onClick={() => {
                        setSkuSearch("")
                        formHook.control.setValue("productSearch", null)
                        router.push(`/marketing/sku-point?page=${0}&limit=${limit}`)
                    }}>Xoá lọc</Button>
                </MyCardActions>
            </MyCard>
            <MyCard>
                <MyCardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã SKU</TableCell>
                                    <TableCell>Sản phẩm</TableCell>
                                    <TableCell>Điểm tích luỹ</TableCell>
                                    <TableCell>Hệ số nhân</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {skuList.length === 0 && <TableRow><TableCell>Không có dữ liệu</TableCell></TableRow>}
                                {skuList.length > 0 &&
                                    skuList.map((row, index) => <TableRowCustom
                                        key={row.code}
                                        skuCode={row.code}
                                        skuPoint={row.point === 0 ? null : row.point}
                                        skuPointMultiplier={row.pointMultiplier === 0 ? null : row.pointMultiplier}
                                        index={index}
                                        page={Number(page)}
                                        limit={Number(limit)}
                                        productName={productMap?.[row.productID]} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage="Hiển thị mỗi trang"
                        labelDisplayedRows={({ from, to, count }) => `Từ ${from} đến ${to} trong ${count} sku`}
                        rowsPerPageOptions={[20, 50, 100]}
                        component="div"
                        count={total}
                        rowsPerPage={Number(limit)}
                        page={Number(page)}
                        onPageChange={(event, newPage) => handlePageChange(event, newPage)}
                        onRowsPerPageChange={(event) => handleRowsPerPageChange(event.target.value)}
                    />
                </MyCardContent>
            </MyCard>
        </AppMarketing>
    )
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const { page = 0, limit = 20, q = "", productName = "" } = ctx.query
        const productClient = getProductClient(ctx, { props: {} })
        const params = {
            q: q,
            offset: page * limit,
            limit: limit,
            getTotal: true
        }
        let skuCode = function () {
            try {
                return JSON.parse(q)
            } catch {
                return {}
            }
        }()

        const skuListResp = await productClient.getSkuMainList(params)
        let productMap = {}
        let skuList = []
        let total = 0
        if (skuListResp.status === 'OK') {
            skuList = skuListResp.data || []
            total = skuListResp.total || 0
            const ids = skuListResp.data.map(item => item.productID)
            const productByIds = await productClient.getListProductByIds(ids)
            if (productByIds.status === "OK") {
                productMap = productByIds.data.reduce((obj, cur) => {
                    return {
                        ...obj,
                        [cur.productID]: cur.name ?? null
                    }
                }, {})
            }
        }
        return {
            props: {
                productMap,
                skuList,
                total,
                skuCode,
                productName
            }
        }
    });
}
export default function SkuPoint(props) {
    return renderWithLoggedInUser(props, SkuPointRender);
}

const TableRowCustom = ({ productName, page, limit, index, skuCode, skuPoint = null, skuPointMultiplier = null }) => {
    const [point, setPoint] = useState(skuPoint)
    const [pointMultiplier, setPointMultiplier] = useState(skuPointMultiplier)
    const [disabled, setDisabled] = useState(true)
    const { error, success } = useToast()
    const productClient = getProductClient()

    const [msgPoint, setMsgPoint] = useState("")
    const [msgPointMultiplier, setMsgPointMultiplier] = useState("")
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        if ((skuPoint !== point || skuPointMultiplier !== pointMultiplier) || ((skuPoint === point || skuPointMultiplier === pointMultiplier) && isChanged)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [point, pointMultiplier])
    const onKeyDownNumber = (event) => {
        ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()
    }
    const submit = async () => {
        let errPoint = "", errPointMultiplier = ""
        // if (point === null && pointMultiplier === null){
        //     return error("Vui lòng cài đặt ít nhất 1 trong 2: Điểm tích lũy hoặc Hệ số nhân")
        // }
        if (isNumber(point) && (point < 1 || point > 100)) errPoint = "Vui lòng nhập số từ 1 đến 100"
        if (isNumber(pointMultiplier) && (pointMultiplier < 1 || pointMultiplier > 10)) errPointMultiplier = "Vui lòng nhập số từ 1 đến 10"
        if (!!errPoint || !!errPointMultiplier) {
            setMsgPoint(errPoint)
            setMsgPointMultiplier(errPointMultiplier)
            return
        } else {
            setMsgPoint("")
            setMsgPointMultiplier("")
        }

        try {
            const result = await productClient.updateSkuPoint({ point: Number(point), pointMultiplier: Number(pointMultiplier), skuCode: skuCode })
            if (result.status === "OK") {
                setDisabled(true)
                success("Cập nhật thành công")
                setIsChanged(true)
            } else {
                error(result?.message)
            }
        } catch (err) {
            error("Cập nhật thất bại")
        }
    }

    const handleError = async (value, type) => {
        let msg = ""
        switch (type) {
            case "point":
                if (isNumber(value) && (value < 1 || value > 100)) {
                    msg = "Vui lòng nhập từ 1 đến 100"
                }
                setMsgPoint(msg)
                break;
            case "pointMultiplier":
                if (isNumber(value) && (value < 1 || value > 10)) {
                    msg = "Vui lòng nhập từ 1 đến 10"
                }
                setMsgPointMultiplier(msg)
            default:
                msg = ""
                break;
        }
    }
    return (
        <TableRow>
            <TableCell>
                {page * limit + index + 1}
            </TableCell>
            <TableCell>{skuCode}</TableCell>
            <TableCell>{productName}</TableCell>
            <TableCell width={250}>
                <TextField
                    size="small"
                    fullWidth
                    InputProps={{ inputProps: { min: 1, max: 100 } }}
                    type="number" value={point === 0 ? null : point}
                    variant="outlined"
                    onKeyDown={onKeyDownNumber}
                    helperText={<span style={{ position: "absolute" }}>{msgPoint}</span>}
                    error={!!msgPoint}
                    onChange={(event) => {
                        let value = event.target.value
                        setPoint(value === "" ? null : Number(value))
                        handleError(value, "point")
                    }} />
            </TableCell>
            <TableCell width={250}>
                <TextField
                    size="small"
                    fullWidth
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    type="number"
                    value={pointMultiplier === 0 ? null : pointMultiplier}
                    helperText={<span style={{ position: "absolute" }}>{msgPointMultiplier}</span>}
                    error={!!msgPointMultiplier}
                    variant="outlined"
                    onKeyDown={onKeyDownNumber}
                    onChange={(event) => {
                        let value = event.target.value
                        setPointMultiplier(value === "" ? null : Number(value))
                        handleError(value, "pointMultiplier")
                    }} />
            </TableCell>
            <TableCell align="center">
                <Grid container justifyContent="center" alignItems="center">
                    <Authorization requiredAPI="PUT/marketplace/product/v2/sku/point">
                        <IconButton disabled={disabled} variant="contained" onClick={async () => await submit()}><SaveRounded style={{ fill: disabled ? "rgba(0, 0, 0, 0.54)" : "#00b46e" }} /></IconButton >
                    </Authorization>
                    <Authorization requiredAPI="GET/marketplace/product/v2/sku/point/history">
                        <IconButton variant="contained" onClick={async () => await router.push(`/marketing/sku-point/history?code=${skuCode}`)}><HistoryRounded color="action" /></IconButton >
                    </Authorization>
                </Grid>
            </TableCell>
        </TableRow>
    )
}