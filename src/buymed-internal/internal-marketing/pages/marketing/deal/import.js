import Head from "next/head";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Link, makeStyles, Chip } from "@material-ui/core";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box";
import PublishIcon from '@material-ui/icons/Publish';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileCopy } from "@material-ui/icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import readXlsxFile from 'read-excel-file';
import XLSX from "xlsx"
import { getProductClient } from "client/product";
import { getDealClient } from "client/deal";
import clsx from "clsx"
import { DealType, PricingType, PricingTypeOptions } from "view-model/deal";
import { formatDateTimeToISOString } from "components/global";
import AuthorizationScreen from "components/authorization-screen"
import { getAreaClient } from "client/area";
import { getMasterDataClient } from "client/master-data";
import { getCustomerClient } from "client/customer";

const useStyles = makeStyles({
    chip: {
        borderRadius: 8,
        cursor: "pointer",
        margin: 5,
    },
    info: {
        padding: "0 15px 15px 15px"
    },
    infoText: {
        padding: "0 15px"
    },
    file: {
        padding: "0 10px"
    },
    download: {
        color: "cornflowerblue",
        fontWeight: "bold",
        textDecoration: "underline",
        marginLeft: 8,
        cursor: "pointer"
    },
    disabled: {
        cursor: "text",
        color: "black",
    },
    containerFile: {
        "& > .MuiBox-root > .MuiFormLabel-root": {
            fontSize: 18,
        }
    }
});

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadData(ctx);
    });
}

export async function loadData(ctx) {
    let data = {
        props: {
            areaMap: {},
            areaOptions: [],
            levelMap: {},
            levelOptions: []
        }
    };

    data.props.areaMap["00"] = "Tất cả"
    const resArea = await getAreaClient(ctx, {}).getListArea();
    if (resArea.status == "OK") {
        resArea.data?.forEach(element => {
            data.props.areaMap[element.code] = element.name ?? ""
            data.props.areaOptions.push(element)
        });
    }
    const resProvince = await getMasterDataClient(ctx, {}).getProvince(0, 100, '', [], true);
    if (resProvince.status == "OK") {
        resProvince.data?.forEach(element => {
            data.props.areaMap[element.code] = element.name ?? ""
            data.props.areaOptions.push(element)
        });
    }

    data.props.levelMap["ALL"] = "Tất cả"
    const resLevel = await getCustomerClient(ctx, {}).getListLevel({ status: "ON" });
    if (resLevel?.status == 'OK') {
        resLevel.data?.forEach(element => {
            data.props.levelMap[element.code] = element.name ?? ""
            data.props.levelOptions.push(element)
        });
    }

    return data;
}

export default function EditPage(props) {
    return renderWithLoggedInUser(props, render);
}

function render(props) {
    const classes = useStyles();
    const dealClient = getDealClient();
    const { error, success } = useToast();
    const [loading, setLoading] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [isClickedSku, setIsClickedSku] = useState(false);
    const [listContent, setListContent] = useState([]);
    const [file, setFile] = useState();
    const router = useRouter()
    const { levelMap, levelOptions, areaMap, areaOptions } = props

    const chargeDealFeeOption = [
        { label: "Thuốc sỉ", value: "MARKETPLACE" },
        { label: "Nhà bán hàng", value: "SELLER" },
        { label: "Thuốc sỉ lên deal cùng nhà bán hàng", value: "SELLER_MARKETPLACE" }
    ]

    const DealTypeOption = [{ label: "Giảm giá", value: DealType.DEAL }]

    async function onSubmit() {
        if (!file) return error("Vui lòng chọn file")
        if (listContent?.length === 0 || !listContent) return error("Dữ liệu file không hợp lệ, vui lòng kiểm tra lại")

        setLoading(true);
        const res = await dealClient.importDeal({ data: listContent });
        if (res.status === "OK") {
            success("Import thành công");
            setTimeout(() => {
                router.push(`/marketing/import-history-deal/detail?code=${res.data[0].code}`)
            }, 2000);
        } else {
            if (res.status === "INVALID") {
                error("Dữ liệu file không hợp lệ, vui lòng kiểm tra lại")
                setLoading(false)
                return
            }
            error("Import thất bại")
        }
        setLoading(false)
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách deal",
            link: "/marketing/deal",
        },
        {
            name: "Import",
        }
    ]

    const handleDocumentFile = async (event) => {
        const fileObj = event.target.files[0];
        setFile({ name: fileObj.name })
        let list = [], rowMap = {}

        const headColumn = [
            {
                label: `Tên deal*`,
                value: "name"
            },
            {
                label: `Mã loại deal*`,
                value: "dealType"
            },
            {
                label: `Thời gian bắt đầu*`,
                value: "startTime"
            },
            {
                label: `Thời gian kết thúc*`,
                value: "endTime"
            },
            {
                label: `Thời gian cho phép hiển thị*`,
                value: "readyTime"
            },
            {
                label: "Số lượng bán ra",
                value: "maxQuantity"
            },
            {
                label: `Mã loại giảm giá*`,
                value: "pricingType"
            },
            {
                label: `Giá*`,
                value: "price"
            },
            {
                label: `Phần trăm giảm giá*`,
                value: "discountPercent"
            },
            {
                label: "Giảm giá tối đa",
                value: "maxDiscountValue"
            },
            {
                label: `Đối tượng khách hàng áp dụng*`,
                value: "customerLevelCodes"
            },
            {
                label: `Khu vực áp dụng*`,
                value: "areaCodes"
            },
            {
                label: `Mã sku*`,
                value: "skus"
            },
            {
                label: `Mã bên chịu giá chênh lệch*`,
                value: "chargeDealFee"
            },
        ]

        await readXlsxFile(fileObj).then((rows) => {
            rows.map((row, index) => {
                if (index === 0) {
                    row.forEach((item, idx) => {
                        const data = headColumn.find(el => el.label === item)
                        if (data) {
                            rowMap[data.value] = idx
                        }
                    })
                    return
                }

                const pricingType = row[rowMap["pricingType"]]?.toString() ?? ""

                const itemData = {}

                for (const key in rowMap) {
                    if (key === "maxQuantity" || key === "price" || key === "discountPercent" || key === "maxDiscountValue") {
                        itemData[key] = row[rowMap[key]] ?? null
                        if (key === "maxDiscountValue" && !row[rowMap[key]]) itemData[key] = 0
                    } else if (key === "skus") {
                        const sku = row[rowMap[key]]?.toString() ?? null
                        if (sku) {
                            itemData["sellerCode"] = sku.split(".")?.length ? sku.split(".")[0] : null
                            itemData[key] = [{
                                sku,
                                quantity: 1
                            }]
                        } else {
                            itemData[key] = []
                        }
                    } else if (key === "startTime" || key === "endTime" || key === "readyTime") {
                        itemData[key] = formatDateTimeToISOString(row[rowMap[key]]?.toString() ?? null)
                    } else {
                        itemData[key] = row[rowMap[key]]?.toString() ?? null
                    }

                    if (key === "areaCodes" || key === "customerLevelCodes") {
                        let defaultValue = ["ALL"]
                        if (key === "areaCodes") defaultValue = ["00"]
                        let codes = row[rowMap[key]]?.toString()?.replace(/\s+/g, '')?.split(",").map(String) ?? defaultValue

                        if (key === "areaCodes") {
                            itemData[key] = codes.filter(code => areaMap[code])
                        } else if (key === "customerLevelCodes") {
                            itemData[key] = codes.filter(code => levelMap[code])
                        }
                        let index = itemData[key].findIndex(item => item === "ALL")
                        if (index !== -1 || itemData[key]?.length === 0) itemData[key] = defaultValue
                    }

                }

                if (pricingType === PricingType.ABSOLUTE) {
                    delete itemData.discountPercent
                    delete itemData.maxDiscountValue
                } else if (pricingType === PricingType.PERCENTAGE) {
                    delete itemData.price
                }

                list.push(itemData)
            })
        })

        const listContent = list.filter(item => {
            if (item.name === null
                && item.dealType === null
                && item.startTime === null
                && item.endTime === null
                && item.readyTime === null
                && item.maxQuantity === null
                && item.pricingType === null
                && item.price === null
                && item.discountPercent === null
                && item.maxDiscountValue === null
                && item.areaCodes === null
                && item.customerLevelCodes === null
                && item.skus === null
                && item.chargeDealFee === null) return;
            return item;
        }) || []
        setListContent(listContent)
    }

    function exampleExcel() {
        return (
            <table id="example" border="1" style={{ display: "none" }}>
                <thead>
                    <tr>
                        <th>Tên deal*</th>
                        <th>Mã loại deal*</th>
                        <th>Thời gian bắt đầu*</th>
                        <th>Thời gian kết thúc*</th>
                        <th>Thời gian cho phép hiển thị*</th>
                        <th>Số lượng bán ra</th>
                        <th>Mã loại giảm giá*</th>
                        <th>Giá*</th>
                        <th>Phần trăm giảm giá*</th>
                        <th>Giảm giá tối đa</th>
                        <th>Đối tượng khách hàng áp dụng*</th>
                        <th>Khu vực áp dụng*</th>
                        <th>Mã sku*</th>
                        <th>Mã bên chịu giá chênh lệch*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><p>SP quà tặng purchaser</p></td>
                        <td><p>DEAL</p></td>
                        <td><p>22-06-2022 13:51:38</p></td>
                        <td><p>22-07-2022 13:51:38</p></td>
                        <td><p>22-06-2022 13:51:38</p></td>
                        <td>100</td>
                        <td><p>ABSOLUTE</p></td>
                        <td><p>10000</p></td>
                        <td><p></p></td>
                        <td><p></p></td>
                        <td><p>ALL</p></td>
                        <td><p>ALL</p></td>
                        <td><p>MEDX.674GEQ1P</p></td>
                        <td><p>MARKETPLACE</p></td>
                    </tr>
                    <tr>
                        <td><p>thuoc123 - Chương trình KM</p></td>
                        <td><p>DEAL</p></td>
                        <td><p>22-06-2022 13:51:38</p></td>
                        <td><p>22-07-2022 13:51:38</p></td>
                        <td><p>22-06-2022 13:51:38</p></td>
                        <td>100</td>
                        <td><p>ABSOLUTE</p></td>
                        <td><p>10000</p></td>
                        <td><p></p></td>
                        <td><p></p></td>
                        <td><p>ALL</p></td>
                        <td><p>1R0VW12DX4A, 94</p></td>
                        <td><p>MEDX.674GEQ1P</p></td>
                        <td><p>MARKETPLACE</p></td>
                    </tr>
                    <tr>
                        <td><p>Sp có deal - fixpriced</p></td>
                        <td><p>DEAL</p></td>
                        <td><p>22-06-2022 13:51:38</p></td>
                        <td><p>22-07-2022 13:51:38</p></td>
                        <td><p>22-06-2022 13:51:38</p></td>
                        <td>100</td>
                        <td><p>PERCENTAGE</p></td>
                        <td><p></p></td>
                        <td><p>5</p></td>
                        <td><p>12000</p></td>
                        <td><p>LEVEL_SILVER, LEVEL_GOLD</p></td>
                        <td><p>87, 22</p></td>
                        <td><p>MEDX.674GEQ1P</p></td>
                        <td><p>MARKETPLACE</p></td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const getData = (listData, id, name, column1, column2) => {
        return listData?.map(({ [`${id}`]: value, [`${name}`]: label }) => {
            return {
                [`${column1}`]: value,
                [`${column2}`]: label
            }
        }) || []
    }

    async function downloadFileExcel() {
        setLoadingDownload(true)
        const file = document.getElementById("example");
        const fileName = `ImportDealHangLoat.xlsx`;

        const pricingType = getData(PricingTypeOptions, "value", "label", "Mã", "Tên loại giảm giá")
        const dealType = getData(DealTypeOption, "value", "label", "Mã", "Tên loại deal")
        const chargeDealFee = getData(chargeDealFeeOption, "value", "label", "Mã", "Tên")
        const areaScope = getDataArea()
        const customerScope = getCustomerScope()

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(file), "Dữ liệu mẫu");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dealType), "Loại deal");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pricingType), "Loại giảm giá");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(chargeDealFee), "Bên chịu giá chênh lệch");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(areaScope), "Khu vực");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(customerScope), "Cấp bậc khách hàng");
        XLSX.writeFile(wb, fileName);
        setLoadingDownload(false)
    }

    const SkuIsActive = {
        [true]: "Đang hoạt động",
        [false]: "Ngừng hoạt động",
    }

    async function downloadDataSku() {
        setIsClickedSku(true)
        const fileName = `DuLieuSku.xlsx`;
        const productClient = getProductClient()
        const productTotalRes = await productClient.getSkuList({ limit: 1, offset: 0, getTotal: true });
        const pageSize = 1000
        const totalPage = Math.ceil((productTotalRes?.total || 0) / pageSize)
        let skuRes = []

        for (let page = 0; page < totalPage; page++) {
            const res = await productClient.getSkuList({ limit: pageSize, offset: page * pageSize, getTotal: true })
            if (res.status === "OK") {
                skuRes = skuRes.concat(res?.data || [])
            }
        }

        let skuData = []

        if (skuRes.length) {
            skuData = skuRes?.map(item => {
                return {
                    [`Mã sku`]: item.code,
                    [`Mã sản phẩm`]: item.productCode,
                    [`Mã nhà bán hàng`]: item.sellerCode,
                    [`Trạng thái`]: SkuIsActive[item.isActive],
                }
            }) || []
        }

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(skuData), "Sku");
        XLSX.writeFile(wb, fileName);
        setIsClickedSku(false)
    }


    function getDataArea() {

        let data = []

        if (areaOptions.length > 0) {
            data = areaOptions?.map(item => {
                return {
                    [`Mã khu vực`]: item.code,
                    [`Loại`]: item.regionID ? "Khu vực" : "Tỉnh thành",
                    [`Tên khu vực/tỉnh thành`]: item.name,
                    [`Danh sách tỉnh/thành thuộc khu vực`]: item.provinceCodes?.length > 0 ? item.provinceCodes?.map(province => areaMap[province] ?? province).join(", ") : "-",
                }
            }) || []
        }

        let listData = [{
            [`Mã khu vực`]: "ALL",
            [`Loại`]: "Khu vực",
            [`Tên khu vực/tỉnh thành`]: "Tất cả",
            [`Danh sách tỉnh/thành thuộc khu vực`]: "Tất cả tỉnh/thành",
        }].concat(data)


        return listData
    }

    function getCustomerScope() {

        let data = []

        if (levelOptions.length > 0) {
            data = levelOptions?.map(item => {
                return {
                    [`Mã`]: item.code,
                    [`Cấp bậc khách hàng`]: item.name,
                }
            }) || []
        }

        let listData = [{
            [`Mã`]: "ALL",
            [`Cấp bậc khách hàng`]: "Tất cả"
        }].concat(data)

        return listData

    }

    return (

        <AppMarketing select="/marketing/deal" breadcrumb={breadcrumb}>
            <Head>
                <title>Import</title>
            </Head>

            <AuthorizationScreen linkAddress="/marketing">
                <MyCard>
                    <MyCardHeader title="Import deal hàng loạt" />
                    <MyCardContent>
                        <Grid container>
                            <Grid item xs={12} md={6} sm={12}>
                                <Grid item xs={12} md={12} sm={12}>
                                    <ul className={classes.infoText}>
                                        <li>
                                            <span><b>Các cột dữ liệu có đánh dấu * là bắt buộc nhập</b></span>
                                            <ul className={classes.infoText}>
                                                <li>Tên deal<span style={{ color: "red" }}>*</span></li>
                                                <li>Mã loại deal<span style={{ color: "red" }}>*</span></li>
                                                <li>Thời gian bắt đầu<span style={{ color: "red" }}>*</span></li>
                                                <li>Thời gian kết thúc<span style={{ color: "red" }}>*</span></li>
                                                <li>Thời gian cho phép hiển thị<span style={{ color: "red" }}>*</span></li>
                                                <li>Số lượng bán ra</li>
                                                <li>Mã loại giảm giá<span style={{ color: "red" }}>*</span></li>
                                                <li>Giá<span style={{ color: "red" }}>*</span></li>
                                                <li>Phần trăm giảm giá<span style={{ color: "red" }}>*</span></li>
                                                <li>Giảm giá tối đa<span style={{ color: "red" }}>*</span></li>

                                                <li>Đối tượng khách hành áp dụng
                                                    <span style={{ color: "red" }}>*</span>
                                                </li>

                                                <li>Khu vực áp dụng
                                                    <span style={{ color: "red" }}>*</span>
                                                </li>

                                                <li>
                                                    Mã sku
                                                    <span style={{ color: "red" }}>*</span>
                                                    <span className={clsx(classes.download, isClickedSku && classes.disabled)} onClick={() => {
                                                        if (!isClickedSku) downloadDataSku()
                                                    }}>
                                                        {isClickedSku && <CircularProgress size={12} style={{ marginLeft: 5, marginRight: 5 }} />}
                                                        Tải file dữ liệu
                                                    </span>
                                                </li>
                                                <li>Mã bên chịu giá chênh lệch<span style={{ color: "red" }}>*</span></li>
                                            </ul>
                                        </li>
                                        <li><span><b>Tải về mẫu file excel hướng dẫn trước khi import sản phẩm.</b></span></li>
                                    </ul>
                                </Grid>
                                <Grid item xs={12} md={12} sm={12} className={classes.containerFile}>
                                    <div className={classes.file}>
                                        <Button variant="outlined" disabled={loadingDownload} onClick={downloadFileExcel}><FileCopy fontSize="small" />Mẫu file excel</Button>
                                    </div>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <ul className={classes.infoText}>
                                            <li><span><b>Chọn file để tạo deal</b></span></li>
                                        </ul>
                                    </Grid>
                                    <LabelBox label={"Danh sách deal"} padding={1}>
                                        {file?.name ? <>
                                            <Chip
                                                className={classes.chip}
                                                icon={<FileCopy fontSize="small" />}
                                                label={file.name}
                                            />
                                            &nbsp;&nbsp;
                                            <FontAwesomeIcon style={{ color: "red", cursor: "pointer" }}
                                                onClick={
                                                    () => {
                                                        setListContent([])
                                                        setFile();
                                                    }
                                                }
                                                icon={faTrash}
                                            />
                                        </> :
                                            (<label htmlFor="documentFiles">
                                                <input
                                                    style={{ display: "none" }}
                                                    id="documentFiles"
                                                    onClick={e => e.target.value = ""}
                                                    onChange={handleDocumentFile}
                                                    type="file"
                                                    accept=".xlsx"
                                                />
                                                <Button variant="contained" component="span" style={{ marginBottom: "5px" }}>
                                                    <PublishIcon fontSize="inherit" />Chọn file
                                                </Button>
                                            </label>)}
                                    </LabelBox>
                                </Grid>
                                <Grid container spacing={1} style={{ margin: "10px 0" }}>
                                    <Grid item>
                                        <Link href="/marketing/deal" style={{ textDecoration: "none" }}>
                                            <Button variant="contained">
                                                Trở về
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onSubmit}
                                            disabled={loading}
                                        >
                                            {loading && <CircularProgress size={20} />}
                                            Lưu
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MyCardContent>
                </MyCard>
                {exampleExcel()}
            </AuthorizationScreen>
        </AppMarketing>

    );
}
