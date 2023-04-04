import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AppCS from 'pages/_layout';
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import {
    Button,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Chip,
    Switch,
    Tab,
    Tabs
} from "@material-ui/core";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "containers/marketing/sale-campaign/detail/Filter.js"
import DialogAddProduct from "containers/marketing/sale-campaign/detail/New.js"
import { getSaleCampaignClient } from "client/saleCampaign";
import styles from '../sale-campaign/sale-campaign.module.css';
import { formatShortDateTime, formatNumber, isValid } from "components/global";
import { SaleCampaignButton, CampaignProductButton, CampaignProductStatusLabel } from "containers/sale-campaign/SaleCampaignStatus";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { getSellerClient } from "client/seller";
import { getProductClient } from "client/product";
import { getAccountClient } from "client/account";
import { useRouter } from "next/router";
import { chargeFeeOption, listTimeSlot } from "components/component/constant"
import { ExportCSV } from "components/export-cvs"
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import ModalDelete from "containers/sale-campaign/ModalDelete"
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { useForm } from "react-hook-form";
import ModalImport from "containers/sale-campaign/import-result/ImportModal";
import DialogFlashsale from "containers/sale-campaign/DialogFlashsale";
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';
import { getAreaClient } from "client/area";
import { getMasterDataClient } from "client/master-data";
import SkuItemInfo from "containers/marketing/sale-campaign/detail/SkuItemStatus";
import Link from "next/link";
import { CustomExportCSV } from "components/export-cvs/customExport";
import XLSX from "xlsx"
import { getCategoryClient } from "client/category";
import { getEfficacyClient } from "client/efficacy";

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
        skuMap: {},
        total: 0,
        count: {
            all: 0
        }
    };

    let accountIds = [];
    let sellerCodes = [];
    let skus = [];

    let campaignCode = ctx.query.code;

    const page = parseInt(ctx.query.page) || 0;
    const limit = parseInt(ctx.query.limit) || 20;
    const offset = page * limit;
    const q = JSON.parse(ctx.query.q ?? "{}");
    const filterData = q;
    props.filterData = filterData;
    const tab = filterData.tab ?? null;

    delete filterData.tab

    const saleCampaignClient = getSaleCampaignClient(ctx, {})
    const resp = await saleCampaignClient.getSaleCampaign({ campaignCode: campaignCode });
    if (resp.status === "OK") {
        props.data = resp.data[0];
        accountIds.push(props.data?.createdBy)
    } else {
        props.err = resp
    }

    const campaignProductResp = await saleCampaignClient.getSaleCampaignProduct({ ...filterData, campaignCode: campaignCode }, offset, limit, tab);
    if (campaignProductResp.status === "OK") {
        props.listCampaignProduct = campaignProductResp.data
        // map list id
        campaignProductResp.data?.map(item => {
            if (item.updateBy) accountIds.push(item.updateBy)
            if (item.sellerCode) sellerCodes.push(item.sellerCode)
            if (item.sku) skus.push(item.sku)
        });
        props.total = campaignProductResp.total
    } else {
        props.productErr = campaignProductResp
    }

    const sellerClient = getSellerClient(ctx, {});
    const productClient = getProductClient(ctx, {});

    const [accountResp, sellerResp, skuResp, productResp] = await Promise.all([
        getAccountClient(ctx, {}).getAccountByIds(accountIds),
        sellerClient.getSellerBySellerCodes(sellerCodes),
        productClient.getSkuMainList({
            skuCodes: [... new Set(skus)],
            limit: 1000,
        }),
        productClient.getProductListBySKUs([... new Set(skus)]),
    ])

    if (accountResp.status === "OK") {
        accountResp.data.forEach(acc => {
            props.accountMap[acc.accountId] = acc.email && acc.email !== "" ? acc.email : acc.username;
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
            if (item.code) {
                props.skuMap[item.code] = item ?? {}
            }
        })
    }

    if (productResp.status === "OK") {
        productResp.data?.forEach(item => {
            if (item.sku.code) {
                props.productMap[item.sku.code] = item.product ?? {}
            }
        })
    }


    let tabList = ["all", "active", "inactive", "cancelled"];

    if (tab === null) {
        props.count.all = props.total || 0
        tabList.splice(0, 1)
    } else {
        props.count[tab] = props.total || 0
        tabList.splice(tabList.indexOf(tab), 1)
    }

    let results = await Promise.all(tabList.map(item => {
        return saleCampaignClient.getSaleCampaignProduct({ ...filterData, campaignCode: campaignCode }, 0, 1, item)
    }))

    props.tabList = tabList
    props.result = results
    for (let i = 0; i < tabList.length; i++) {
        props.count[tabList[i]] = results[i]?.total || 0
    }
    props.env = process.env.ENV

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
                    {val?.map((item, idx) =>
                        <Tooltip classes={{ popper: styles.tooltip }} title={item?.dateTime || ""} key={idx}>
                            <Chip key={idx} style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item?.time || "Không xác định"} />
                        </Tooltip>
                    )}
                </span>
            </Box>
        )
    }

    if (type === "link") {
        return (
            <Box className={styles.infoLine}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>
                    <Link href={val} prefetch={false}>
                        <a color="primary" target="_blank" className={styles.link}>
                            {val}
                        </a>
                    </Link>
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

function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key]
    }
    return JSON.stringify(data)
}

const SaleCampaignDetailPage = (props) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedPrd, setSelectedPrd] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [openModalImport, setOpenModalImport] = useState(false);
    const [isOpenDialogFlashsale, setIsOpenDialogFlashsale] = useState(false);
    const [areaMap, setAreaMap] = useState({})

    const data = props.data || {};
    const count = props.count || {}
    const internalSellerCodes = ["MEDX", "MEDX-HN", "MARKETING"]

    const { skuMap, productMap } = props
    // console.log("props=", props)
    const router = useRouter()
    const toast = useToast()
    const q = JSON.parse(router.query.q || "{}")
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const total = props.total || 0;
    const mapListTime = {}
    const mapFlashsaleTime = {}
    const fileName = `Danh_Sach_San_Pham_${new Date().toLocaleString().replace(/[ :]/g, '_').replace(/[,]/g, '')}.xlsx`;
    const allFlashSaleTime = []
    listTimeSlot?.forEach(item => mapListTime[item.value] = item.label)

    let domain = "https://thuocsi.vn"
    if (props.env !== "prd") {
        domain = `https://web.v2-${props.env}.thuocsi.vn`
    }

    const getProductUrl = (slug) => {
        let url = `https://thuocsi.vn/product/${slug}`
        if (props.env !== "prd") {
            url = `https://web.v2-${props.env}.thuocsi.vn/product/${slug}`
        }
        return url
    }

    const getFlashsaleTime = () => {
        let arr = []
        data?.flashSaleTimes?.forEach(item => {
            const flashSale = []
            item?.detail?.forEach(el => {
                const saleTime = {
                    value: el.ref,
                    label: (mapListTime[el.code] || el.code) + " (" + formatShortDateTime(item.startTime) + " - " + formatShortDateTime(item.endTime) + ")",
                }
                allFlashSaleTime.push(saleTime)
                mapFlashsaleTime[el.ref] = saleTime
                if (!el.productIDs.length || el.productIDs.find(id => id === selectedPrd?.productID)) {
                    flashSale.push(saleTime)
                }
            })
            arr = arr.concat(flashSale)
        })

        return arr
    }

    const { register, handleSubmit, errors, setValue, watch, control, getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            flashSaleTimeRefs: [getFlashsaleTime()[0]],
        },
    });

    const getAreaMap = async () => {
        let area = {}
        area["00"] = "Tất cả"
        const resArea = await getAreaClient().getListArea();
        if (resArea.status == "OK") {
            resArea.data?.forEach(element => {
                area[element.code] = element.name ?? ""
            });
        }
        const resProvince = await getMasterDataClient().getProvince(0, 100, '', [], true);
        if (resProvince.status == "OK") {
            resProvince.data?.forEach(element => {
                area[element.code] = element.name ?? ""
            });
        }
        setAreaMap(area)
    }

    useEffect(() => {
        getAreaMap()
    }, [])

    useEffect(() => {
        if (!isEdit) {
            setValue("flashSaleTimeRefs", null)
            return
        }
        const arr = selectedPrd?.flashSaleTimeRefs?.map(item => mapFlashsaleTime[item]) || []
        setValue("flashSaleTimeRefs", arr)
    }, [isEdit, selectedPrd])

    const convertDataFlashsale = () => {
        let arr = []
        let timeDetail = {}
        data?.flashSaleTimes?.forEach(item => {
            arr = arr.concat(item?.detail?.map(el => {
                let dateTime = timeDetail[el.code]?.dateTime || []
                dateTime.push(`${formatShortDateTime(item.startTime)} - ${formatShortDateTime(item.endTime)}`)
                timeDetail[el.code] = { dateTime }
                return el.code
            }))
        })
        arr = [...new Set(arr)]
        arr = arr?.map(item => {
            return {
                time: mapListTime[item] || el.code,
                dateTime: timeDetail[item]?.dateTime?.join("\n")
            }
        })
        return arr
    }

    const getTimeFlashsale = (flashSaleTime) => {
        let arr = []
        const objFlashSale = {}
        data?.flashSaleTimes?.forEach(item => {
            item?.detail?.forEach(el => {
                objFlashSale[el.ref] = {
                    time: mapListTime[el.code] || el.code,
                    dateTime: `${formatShortDateTime(item.startTime)} - ${formatShortDateTime(item.endTime)}`
                }
            })
        })

        flashSaleTime?.forEach(item => {
            arr = arr.concat({
                time: objFlashSale[item]?.time,
                dateTime: objFlashSale[item]?.dateTime,
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

    const getData = (resp, mapSeller = {}, mapProduct = {}, mapCategory = {}, mapEfficacy = {}) => {
        return isValid(resp)
            ? resp.data?.map((item) => {
                const dataExport = {
                    'Id sản phẩm': item.productID,
                    'Sku': item.sku,
                    'Mã sản phẩm': item.productCode,
                    'Tên sản phẩm': mapProduct[item.sku]?.name,
                    'Link sản phẩm': getProductUrl(mapProduct[item.sku]?.slug),
                    'Danh mục sản phẩm': mapProduct[item.sku]?.categoryCodes?.map(code => mapCategory[code])?.join(", ") || "",
                    'Công dụng': mapProduct[item.sku]?.efficacyCodes?.map(code => mapEfficacy[code])?.join(", ") || "",
                    'Mã nhà bán hàng': item.sellerCode,
                    'ID nhà bán hàng': mapSeller[item.sellerCode]?.sellerId ?? "-",
                    'Tên nhà bán hàng': mapSeller[item.sellerCode]?.sellerName ?? "-",
                    'Giá trước KM': formatNumber(item.price),
                    'Giá sau KM': item.campaignPrice ? formatNumber(item.campaignPrice) : " - ",
                    'Giảm giá(%/VNĐ)': item.saleType === "ABSOLUTE" ? `${formatNumber(item.absoluteDiscount ?? 0)}đ` : (item.percentageDiscount ? (item.percentageDiscount + "%") : " - "),
                    'Giảm tối đa': item.saleType === "PERCENTAGE" && item.percentageDiscount && item.maxDiscount ? formatNumber(item.maxDiscount) : "-",
                    'Đã bán': item.soldQuantity || 0,
                    'Số lượng': formatNumber(item.quantity),
                    'Giới hạn mua': formatNumber(item.maxQuantityPerOrder) || "100,000",
                    'Hiển thị': item.isActive ? "Hiện" : "Ẩn",
                    'Trạng thái': CampaignProductStatusLabel[item.status] || "Đang bán"
                }
                if (item.campaignType === "FLASH_SALE") {
                    dataExport['Khung giờ KM'] = getTimeFlashsale(item.flashSaleTimeRefs)?.map(item => `${(item.time || "Không xác định")} (${item.dateTime})`).toString()
                }

                return dataExport;
            })
            : [];
    };

    function getDataCampaign() {

        let campaignData = [
            {
                [`Thông tin chương trình`]: "Đường dẫn",
                [""]: `${domain}/khuyenmai/${data.slug}`,
            },
            {
                [`Thông tin chương trình`]: "Thời gian áp dụng",
                [""]: `${formatShortDateTime(data.startTime)} - ${formatShortDateTime(data.endTime)}`,
            }
        ]

        let listData = [{
            [`Thông tin chương trình`]: "Tên chương trình",
            [""]: data.campaignName,
        }].concat(campaignData)
        return listData
    }

    const exportFile = async () => {
        setLoading(true);
        const limit = 100;
        let dataExport = [];
        const totalResult = await getSaleCampaignClient().getSaleCampaignProduct({ ...props.filterData, campaignCode: data.campaignCode }, 0, 1);

        const totalPageSize = Math.ceil(totalResult?.total / limit);
        const requestGetAllData = [];
        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(
                getSaleCampaignClient().getSaleCampaignProduct({ ...props.filterData, campaignCode: data.campaignCode }, page * limit, limit)
            );
        }

        const arrayResult = await Promise.all(requestGetAllData)

        const mapEfficacy = {}
        const efficacyResp = await getEfficacyClient().getAllEfficacy({})
        if (efficacyResp.status === "OK") {
            efficacyResp.data?.forEach(efficacy => {
                mapEfficacy[efficacy.code] = efficacy.name
            })
        }

        await Promise.all(
            arrayResult.map(async (res) => {
                const sellerCodes = []
                const skuCodes = []
                res.data?.forEach(item => {
                    if (item.sellerCode && item.sellerCode !== "") sellerCodes.push(item.sellerCode)
                    if (item.sku && item.sku !== "") skuCodes.push(item.sku)
                })

                const mapSeller = {}
                const sellerResp = await getSellerClient().getSellerBySellerCodesClient(sellerCodes)
                if (sellerResp.status === "OK") {
                    sellerResp.data?.forEach(seller => {
                        mapSeller[seller.code] = {
                            sellerName: seller.name,
                            sellerId: seller.sellerID
                        }
                    })
                }

                let categoryCodes = []
                const mapProduct = {}
                const productResp = await getProductClient().getProductListBySKUs(skuCodes)
                if (productResp.status === "OK") {
                    productResp.data?.forEach(({ product, sku }) => {
                        mapProduct[sku.code] = product
                        mapProduct[sku.code].slug = sku.slug
                        if (product.categoryCodes?.length > 0) {
                            categoryCodes.push([...product.categoryCodes])
                        }
                    })
                }

                const mapCategory = {}
                const categoryResp = await getCategoryClient().getListCategoryByCodesClient(categoryCodes)
                if (categoryResp.status === "OK") {
                    categoryResp.data?.forEach(category => {
                        mapCategory[category.code] = category.name
                    })
                }

                dataExport = dataExport.concat(getData(res, mapSeller, mapProduct, mapCategory, mapEfficacy))
                return getData(res, mapSeller, mapProduct, mapCategory, mapEfficacy)
            })
        )

        let campaignData = getDataCampaign()
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dataExport), "Danh sách sản phẩm");
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(campaignData), "Thông tin chương trình");
        XLSX.writeFile(wb, fileName);
        setLoading(false);
        return dataExport;
    };

    const handleUpdateStatusSKU = async (campaignProductID, isActive) => {
        const res = await getSaleCampaignClient().updateCampaignProduct({
            campaignProductID: campaignProductID,
            isActive: !isActive
        })
        if (res && res.status === "OK") {
            toast.success("Thay đổi trạng thái thành công")
            setOpenModalUpdate(false)
            setSelectedPrd({})
            router.push({
                pathname: "/marketing/detail-sale-campaign",
                query: {
                    ...router.query,
                }
            });
            return
        }

        if (res && res.message) {
            if (res.errorCode === "CONFLICT_CAMPAIGN" && res.data && res.data.length) {
                toast.error(res.data[0]?.message || res.message)
                return
            }
            toast.error(res.message)
        }
    }

    const handleUpdateStatus = async () => {
        const { isActive, campaignProductID } = selectedPrd;
        handleUpdateStatusSKU(campaignProductID, isActive)
    }

    const handleDeleteProduct = async () => {
        const res = await getSaleCampaignClient().deleteCampaignProduct({ code: selectedPrd.campaignProductCode, id: selectedPrd.campaignProductID })
        if (res && res.status === "OK") {
            toast.success("Xoá sản phẩm thành công")
            setSelectedPrd({})
            setOpenModal(false)
            router.push({
                pathname: "/marketing/detail-sale-campaign",
                query: {
                    ...router.query,
                }
            });
            return
        }

        if (res && res.message) toast.error(res.message)
    }

    const handleUpdateCampaignProduct = async (saleTime) => {
        const codes = saleTime?.flashSaleTimeRefs?.map(item => item.value) || []
        const res = await getSaleCampaignClient().updateCampaignProduct({
            campaignProductID: selectedPrd?.campaignProductID,
            flashSaleTimeRefs: codes
        })
        if (res && res.status === "OK") {
            toast.success("Cập nhật khung giờ khuyến mãi thành công")
            setTimeout(() => {
                setIsEdit(false)
                setSelectedPrd({})
            }, 1500);
            router.push({
                pathname: "/marketing/detail-sale-campaign",
                query: {
                    ...router.query,
                }
            });
            return
        }

        if (res && res.message) toast.error(res.message)
    }

    let valueTab = 0

    switch (q.tab) {
        case "":
            valueTab = 0;
            break;
        case "active":
            valueTab = 1;
            break;
        case "inactive":
            valueTab = 2;
            break;
        case "cancelled":
            valueTab = 3;
            break;
        default:
            valueTab = 0;
            break;
    }

    const handleTabChange = (tab, obj = {}) => {

        try {
            const q = router.query.q || "{}"
            let query = JSON.parse(q)

            query.tab = obj.tab

            if (obj.tab == null) delete query.tab

            router.push({
                pathname: `/marketing/detail-sale-campaign`,
                query: {
                    code: router.query?.code,
                    q: JSON.stringify(query),
                }
            }).then()
        } catch (error) {
            console.log(error)
        }
    };

    const handleUrlSku = (sellerCode, code) => {
        let url = ""
        switch (sellerCode) {
            case "MEDX":
                url = `/internal-seller/MEDX/PUR_HCM/sku/edit?code=${code}`
                break;
            case "MEDX-HN":
                url = `/internal-seller/MEDX-HN/PUR_HN/sku/edit?code=${code}`
                break;
            default:
                url = `/seller/sku/edit?code=${code}`
                break;
        }
        return url
    }

    const displayPrice = (row) => {
        switch (row.saleType) {
            case "PERCENTAGE":
                return <>
                    {row.percentageDiscount + "% "}
                    <br />
                    {!!row.maxDiscount && row.maxDiscount > 0 && `Tối đa: ${formatNumber(row.maxDiscount)}`}

                </>
            case "ABSOLUTE":
                return `Giảm ${formatNumber(row.absoluteDiscount)}`
            case "PRICE":
                return `Giá đã giảm: ${formatNumber(row.campaignPrice)}`
            default:
                return "-";
        }
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình khuyến mãi",
            link: "/marketing/sale-campaign"
        },
        {
            name: "Danh sách nhà bán hàng tham gia"
        },
    ]

    return (
        <AppCS select="/marketing/sale-campaign" breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách nhà bán hàng tham gia</title>
            </Head>
            <MyCard>
                <MyCardHeader title={`Chương trình KM #${data.campaignName}`}></MyCardHeader>
                <MyCardContent>
                    <Grid container>
                        <Grid item xl={3} md={4} xs={6}>
                            {data?.banner && (
                                <img src={data.banner} alt={data.campaignName} width={300} height={150} style={{ objectFit: "contain" }} />
                            )}
                        </Grid>
                        <Grid item xl={3} md={4} xs={6}>
                            <InfoLine label="Tên chương trình" val={data.campaignName} />
                            <InfoLine label="Thời gian đăng ký" val={`${formatShortDateTime(data.registrationStartTime)} - ${formatShortDateTime(data.registrationEndTime)}`} />
                            <InfoLine label="Thời gian áp dụng" val={`${formatShortDateTime(data.startTime)} - ${formatShortDateTime(data.endTime)}`} />
                            {data?.campaignType === "FLASH_SALE" && (
                                <Box className={styles.infoLine}>
                                    <span className={styles.label}>
                                        Khung giờ flashsale
                                        <Tooltip title={"Nhấn để xem chi tiết khung giờ flashsale"}>
                                            <HelpOutlineIcon style={{ marginLeft: 8, transform: "translateY(5px)", cursor: "pointer" }} fontSize="small" onClick={() => setIsOpenDialogFlashsale(true)} />
                                        </Tooltip>
                                    </span>
                                    <span className={styles.value}>
                                        {convertDataFlashsale()?.map((item, idx) =>
                                            <Tooltip classes={{ popper: styles.tooltip }} title={item?.dateTime || ""} key={idx}>
                                                <Chip key={idx} style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item?.time || "Không xác định"} />
                                            </Tooltip>
                                        )}
                                    </span>
                                </Box>
                            )}
                            <InfoLine label="Tỉ lệ fulfill tối thiểu" val={`${data.fulfill ?? "0"}%`} />
                        </Grid>
                        <Grid item xl={3} md={4} xs={6}>
                            <InfoLine label="Trạng thái" val={data.status} type="status" />
                            <InfoLine label="Số lượng nhà bán hàng" val={formatNumber(data.totalSeller)} />
                            <InfoLine label="Số lượng sản phẩm" val={formatNumber(data.totalProduct)} />
                            <InfoLine label="Người tạo" val={props.accountMap[data.createdBy] || data.createdBy} />
                            <InfoLine label="Đường dẫn" val={`${domain}/khuyenmai/${data.slug}`} type="link" />
                        </Grid>
                    </Grid>
                </MyCardContent>
            </MyCard>
            <MyCard>
                <MyCardHeader title={'Danh sách sản phẩm'}>
                    <Grid container justifyContent="flex-end">
                        <CustomExportCSV loading={loading} color={""} text={"Xuất file excel"} exportFile={exportFile} />
                        {data?.status !== "EXPIRED" &&
                            (
                                <>
                                    <Button variant="contained" color="primary" style={{ marginLeft: 15 }} onClick={() => setIsOpenDialog(true)}>
                                        Thêm SP khuyến mãi
                                    </Button>

                                    <Authorization requiredAPI="POST/marketplace/promotion/v1/campaign-product/import">
                                        <Button variant="contained" color="primary" style={{ marginLeft: 15 }} onClick={() => setOpenModalImport(true)}>
                                            Thêm SP hàng loạt
                                        </Button>
                                    </Authorization>
                                </>
                            )

                        }
                    </Grid>
                </MyCardHeader>
                <Filter></Filter>
            </MyCard>

            <Tabs
                value={valueTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
            >
                <Tab
                    index={0}
                    label={`Tất cả(${count?.all || "0"}) `}
                    onClick={() => handleTabChange(0, {})}
                />
                <Tab
                    index={1}
                    label={`Mở hiển thị(${count?.active || "0"}) `}
                    onClick={() => handleTabChange(1, { tab: "active" })}
                />
                <Tab
                    index={2}
                    label={`Tắt hiển thị(${count?.inactive || "0"}) `}
                    onClick={() => handleTabChange(2, { tab: "inactive" })}
                />
                {data.status !== "UPCOMING" && (
                    <Tab
                        index={3}
                        label={`Đã hủy(${count?.cancelled || "0"}) `}
                        onClick={() => handleTabChange(2, { tab: "cancelled" })}
                    />
                )}
            </Tabs>

            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col />
                            <col />
                            <col width="15%" />
                            <col />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">STT</TableCell>
                                <TableCell align="left">Hình ảnh</TableCell>
                                <TableCell align="left">Sản phẩm</TableCell>
                                <TableCell align="left">Danh sách
                                    <br />
                                    sku con</TableCell>
                                <TableCell align="left">Giảm giá(%/VNĐ)</TableCell>
                                <TableCell align="left">Đã bán / Số lượng</TableCell>
                                <TableCell align="left">Giới hạn mua</TableCell>
                                {data?.campaignType === "FLASH_SALE" && <TableCell align="left">Khung giờ KM</TableCell>}
                                {
                                    valueTab === 2 && (
                                        <TableCell align="left">Lý do</TableCell>
                                    )
                                }
                                <TableCell align="left">Trạng thái</TableCell>

                                {
                                    valueTab === 3 && (
                                        <TableCell align="left">Lý do</TableCell>
                                    )
                                }
                                <TableCell align="left" width={180}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.listCampaignProduct && props.listCampaignProduct.length > 0 ? (
                                props.listCampaignProduct.map((row, index) => {
                                    const skuStatus = skuMap[row.sku]?.status
                                    let isErrorStatus = (skuStatus !== "LIMIT" && skuStatus !== "NORMAL" && skuStatus !== "NEAR_EXPIRATION") || !skuMap[row.sku]?.isActive

                                    row.privateNote = row.privateNote?.replace("\n", "") || "-"

                                    let skuItems = skuMap[row.sku]?.items || []
                                    let skuUrl = handleUrlSku(row.sellerCode, internalSellerCodes.includes(skuMap[row.sku]?.sellerCode) ? skuItems?.[0]?.itemCode : skuMap[row.sku]?.code)

                                    return (
                                        <TableRow key={row.campaignProductID}>
                                            <TableCell align="left">
                                                {Number(router.query?.page || 0) ? (Number(router.query?.page || 0) * Number(router.query?.limit || 20) + (index + 1)) : index + 1}
                                            </TableCell>
                                            <TableCell align="left">
                                                {productMap[row.sku]?.imageUrls && productMap[row.sku]?.imageUrls?.length > 0 && (
                                                    <img src={productMap[row.sku]?.imageUrls[0]} width={70} height={70} style={{ objectFit: "contain" }} />
                                                )}
                                            </TableCell>
                                            <TableCell align="left" style={{ wordBreak: "break-word" }}>
                                                <span style={{ fontWeight: "bold" }}>Tên:</span> {productMap[row.sku]?.name}
                                                <br />
                                                <span style={{ fontWeight: "bold" }}>Sku:</span>
                                                <Link
                                                    href={skuUrl}
                                                    prefetch={false}>
                                                    <a target="_blank" prefetch={false} color="primary" style={{
                                                        textDecoration: "none",
                                                        cursor: "pointer",
                                                        color: "green",
                                                        fontWeight: "bold"
                                                    }}>
                                                        &nbsp;{row.sku}
                                                    </a>
                                                </Link>

                                                <br />
                                                <span style={{ fontWeight: "bold" }}>ID:</span> {row.productID}
                                                <br />
                                                <span style={{ fontWeight: "bold" }}>Seller:</span> {props.sellerMap[row.sellerCode]?.label || ""}
                                                <br />
                                                <span style={{ fontWeight: "bold" }}>Bên chịu phí:</span> {chargeFeeOption?.filter(item => item?.value === row.chargeFee)?.[0]?.label || (internalSellerCodes.includes(row.sellerCode) ? "Thuốc sỉ" : "Nhà bán hàng")}
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    skuItems?.map(item => (
                                                        <React.Fragment key={item.itemCode}>
                                                            <SkuItemInfo status={item.status} label={item.itemCode} item={item} areaMap={areaMap} handleUrlSku={handleUrlSku} />
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell align="left">
                                                {displayPrice(row)}
                                            </TableCell>
                                            <TableCell align="left">{formatNumber(row.soldQuantity) || 0} / {formatNumber(row.quantity) || 0}</TableCell>
                                            <TableCell align="left">{formatNumber(row.maxQuantityPerOrder) || "100,000"}</TableCell>
                                            {data?.campaignType === "FLASH_SALE" &&
                                                <TableCell align="left" style={{ minWidth: 240, maxWidth: 320 }}>
                                                    {isEdit && (row.sellerCode === "MEDX" || row.sellerCode === "MEDX-HN") && selectedPrd?.campaignProductCode === row.campaignProductCode ?
                                                        <MuiMultipleAuto
                                                            options={getFlashsaleTime() || []}
                                                            name="flashSaleTimeRefs"
                                                            placeholder="Chọn"
                                                            control={control}
                                                            register={register}
                                                            errors={errors}
                                                            message="Vui lòng chọn khung giờ bán"
                                                            required
                                                        />
                                                        :
                                                        getTimeFlashsale(row.flashSaleTimeRefs)?.map((item, idx) =>
                                                            <Tooltip title={item?.dateTime || ""} key={idx}>
                                                                <Chip style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item?.time || "Không xác định"} />
                                                            </Tooltip>
                                                        )
                                                    }
                                                </TableCell>
                                            }

                                            {
                                                valueTab === 2 && (
                                                    <TableCell align="left">{row.privateNote}</TableCell>
                                                )
                                            }

                                            <TableCell align="left">
                                                <span style={{ display: "flex", alignItems: "center" }}>
                                                    <CampaignProductButton status={row.status} isErrorStatus={isErrorStatus} />
                                                    {row.status === "CANCELLED" && row?.cancelReason && valueTab !== 3 &&
                                                        <Tooltip title={row?.cancelReason}>
                                                            <HelpOutlineIcon style={{ marginLeft: 8 }} />
                                                        </Tooltip>
                                                    }
                                                </span>
                                            </TableCell>

                                            {
                                                valueTab === 3 && (
                                                    <TableCell align="left">{row?.cancelReason || "-"}</TableCell>
                                                )
                                            }

                                            <TableCell align="left" width={180}>
                                                {(row.sellerCode === "MEDX" || row.sellerCode === "MEDX-HN") && row.status !== "CANCELLED" &&
                                                    <Tooltip title="Cập nhật thông tin">
                                                        {isEdit && selectedPrd?.campaignProductCode === row.campaignProductCode ?
                                                            <IconButton onClick={handleSubmit(handleUpdateCampaignProduct)}>
                                                                <SaveIcon fontSize="small" />
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={() => {
                                                                setSelectedPrd(row)
                                                                setIsEdit(true)
                                                            }}>
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        }
                                                    </Tooltip>
                                                }
                                                {data?.status === "PROCESSING" && row?.status === "CANCELLED" ? "" :
                                                    <Tooltip title="Xoá">
                                                        <IconButton onClick={() => {
                                                            setOpenModal(true)
                                                            setSelectedPrd(row)
                                                        }}>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                {valueTab !== 3 && <br />}
                                                <Tooltip title="Xem lịch sử mua sản phẩm">
                                                    <IconButton onClick={() => {
                                                        router.push(`/marketing/history-sale-campaign?tab=BOUGHT&q={"sku": "${row.sku}"}`)
                                                    }}>
                                                        <FontAwesomeIcon icon={faEye} size="sm" />
                                                    </IconButton>
                                                </Tooltip>

                                                {valueTab !== 3 && row.status !== "CANCELLED" &&
                                                    <Switch
                                                        color="primary"
                                                        checked={row.isActive || false}
                                                        onClick={() => {
                                                            setSelectedPrd({
                                                                ...row,
                                                                isActive: row.isActive || false
                                                            })
                                                            setOpenModalUpdate(true);
                                                        }}
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="left">
                                        Không có sản phẩm
                                    </TableCell>
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
                    <ModalDelete
                        open={openModal}
                        onClose={() => {
                            setSelectedPrd({})
                            setOpenModal(false)
                        }}
                        selectedPrd={selectedPrd}
                        onExcute={handleDeleteProduct}
                        saleCampaignStatus={data?.status}
                    />
                    <ModalCustom
                        open={openModalUpdate}
                        title="Thông báo"
                        primaryText="Đồng ý"
                        onClose={() => {
                            setSelectedPrd({})
                            setOpenModalUpdate(false)
                        }}
                        onExcute={handleUpdateStatus}
                    >
                        Bạn có muốn&nbsp;
                        <strong>{!selectedPrd?.isActive ? "Hiện" : "Ẩn"}</strong>
                        &nbsp;sản phẩm này không?
                    </ModalCustom>

                    <ModalImport
                        open={openModalImport} onClose={() => {
                            setOpenModalImport(false);
                        }}
                        onCancel={() => {
                            setOpenModalImport(false);
                        }}
                        data={data}
                        listFlashsale={allFlashSaleTime}
                    />
                </TableContainer>
            </MyCard>
            <DialogAddProduct isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} data={data} mapListTime={mapListTime} areaMap={areaMap} />
            <DialogFlashsale isOpen={isOpenDialogFlashsale} onClose={() => setIsOpenDialogFlashsale(false)} data={allFlashSaleTime} />
        </AppCS >
    )
};

export default function SaleCampaignDetail(props) {
    return renderWithLoggedInUser(props, SaleCampaignDetailPage);
}
