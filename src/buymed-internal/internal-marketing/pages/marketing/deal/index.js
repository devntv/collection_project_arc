import { faEye, faHistory, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel, IconButton, Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@material-ui/core";
import { Edit as EditIcon, ErrorRounded } from "@material-ui/icons";
import {
    doWithLoggedInUser,
    renderWithLoggedInUser
} from "@thuocsi/nextjs-components/lib/login";
import {
    MyCard,
    MyCardHeader
} from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getAreaClient } from 'client/area';
import { getCustomerClient } from 'client/customer';
import { getDealClient } from "client/deal";
import { getMasterDataClient } from 'client/master-data';
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";
import AuthorizationButton from "components/authorization-button";
import AuthorizationScreen from "components/authorization-screen";
import { formatDateTime, formatEllipsisText, formatNumber, parseQ } from "components/global";
import ModalUpdateMultiDeal from "components/modal/updateMultiDealDialog";
import { DealFilter } from "containers/deal/DealFilter";
import SkuItemInfo from 'containers/deal/SkuItemStatus';
import Head from "next/head";
import AppMarketing from "pages/_layout";
import { isAuthorizationAPI } from "utils/function";
import {
    DealStatus, PricingType,
    SkuStatus
} from "view-model/deal";
import styles from './deal.module.css';

async function loadDealData(ctx) {
    const props = {
        deals: [],
        count: 0,
        message: "",
        sellerOpts: [],
        areaMap: {},
        levelMap: {},
        levelOptions: [{ value: "ALL", label: "Chọn tất cả" }],
        areaOptions: [{ value: "00", label: "Chọn tất cả" }],
        regionMap: {},
        skuMap: {}
    };

    const query = ctx.query;
    const q = parseQ(query.q);

    const page = +(query.page || 0);
    const limit = +(query.limit || 20);
    const offset = page * limit;

    const productClient = getProductClient(ctx, {});
    const dealClient = getDealClient(ctx, {});

    const sellerResp = await getSellerClient(ctx, {}).getSeller(0, 3000, "")
    if (sellerResp?.data) {
        const sellerOpts = []
        sellerResp?.data.forEach((seller) => {
            if (seller?.code && seller?.name) {
                sellerOpts.push({
                    value: seller?.code || "",
                    label: `${formatEllipsisText(seller?.name || "", 60)} - ${seller?.code || ""}`
                })
            }
        })
        props.sellerOpts = sellerOpts
    }

    props.areaMap["00"] = "Tất cả"
    const resArea = await getAreaClient(ctx, {}).getListArea();
    if (resArea.status == "OK") {
        resArea.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
            props.regionMap[element.code] = element.provinceCodes ?? []
            props.areaOptions.push({
                value: element.code,
                label: element.name ?? "",
            })
        });
    }

    const resProvince = await getMasterDataClient(ctx, {}).getProvince(0, 100, '', [], true);
    if (resProvince.status == "OK") {
        resProvince.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
            props.areaOptions.push({
                value: element.code,
                label: element.name ?? "",
            })
        });
    }

    props.levelMap["ALL"] = "Tất cả"
    const resLevel = await getCustomerClient(ctx, {}).getListLevel({ status: "ON" });
    if (resLevel?.status == 'OK') {
        resLevel.data?.forEach(element => {
            props.levelMap[element.code] = element.name ?? ""
            props.levelOptions.push({
                value: element.code,
                label: element.name ?? "",
            })
        });
    }

    if (q.locationCodes?.length) {
        let locationCodes = []
        if (q.locationCodes[0] === "00") {
            locationCodes = Object.keys(props.areaMap).concat(["00"])
        } else {
            const areas = q.locationCodes.filter(item => item.length > 2) || []
            areas?.map(item => {
                if (props.regionMap[item] && props.regionMap[item].length)
                    locationCodes = locationCodes.concat(props.regionMap[item])
                return item
            })
            locationCodes = [...new Set(locationCodes.concat(q.locationCodes))]
        }
        q.locationCodes = locationCodes
    }

    if (q.levelCodes?.length) {
        if (q.levelCodes[0] === "ALL") {
            q.levelCodes = Object.keys(props.levelMap).concat(["ALL"])
        }
    }

    const dealsResp = await dealClient.getDealList({ search: q.search, q, limit, offset, getTotal: true });
    if (dealsResp.status !== "OK") {
        if (dealsResp.status === "NOT_FOUND") {
            props.message = "Không tìm thấy deal";
        } else {
            props.message = dealsResp.message;
        }
    }
    const sellerMap = {};
    let skuCodes = [];
    dealsResp.data?.forEach(({ sellerCode, skus }) => {
        if (sellerCode && !sellerMap[sellerCode]) sellerMap[sellerCode] = {};
        if (skus.length && skus[0]?.sku) skuCodes.push(skus[0].sku);
    })

    const skusResp = await productClient.getSkuMainList({ offset: 0, limit: 1000, skuCodes: [... new Set(skuCodes)], })
    skusResp?.data?.forEach((item) => {
        if (item.sellerCode && !sellerMap[item.sellerCode]) sellerMap[item.sellerCode] = {};
        if (item.code) {
            props.skuMap[item.code] = item ?? {}
        }
    })

    const sellerClient = getSellerClient(ctx, {});
    const selerResp = await sellerClient.getSellerBySellerCodes(Object.keys(sellerMap));
    props.seller = await selerResp?.data?.reduce((acc, seller) => {
        acc[seller.code] = seller;
        return acc
    }, {}) || {};

    const listSkus = skusResp?.data?.map(sku => sku.code);
    if (q.forSku && q.forSku !== "") listSkus.push(q.forSku)
    const productsResp = await productClient.getProductListByFilter({ skus: listSkus, getProduct: true })
    if (productsResp?.data) {
        const lstOptions = []
        productsResp?.data.forEach(({ sku, product }) => {
            if (sku.code && product?.name && sku?.sellerCode) {
                let label = product?.name || sku.productCode;
                label += ` - ${props?.seller[sku?.sellerCode]?.name}`
                lstOptions.push({
                    value: sku.code,
                    label,
                })
            }
        })
        props.skuOptions = lstOptions
    }

    props.deals = dealsResp.data ?? [];
    props.count = dealsResp.total ?? 0;

    return {
        props,
    };
}

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, () => loadDealData(ctx));
}

const selectedRowContent = 'Bạn đang chọn {x} Deal'
const maxSelectedRow = 50
const ENUM_STATUS_RESP = {
    OK: "OK",
    INVALID: "INVALID"
}
const activeDealContent = {
    title: 'Xác nhận bật deal đã chọn ?',
    desc: "Bạn có chắc muốn bật {x} Deal đã chọn ?"
}
const inActiveDealContent = {
    title: "Xác nhận tắt deal đã chọn ?",
    desc: "Bạn có chắc muốn tắt {x} Deal đã chọn ?"
}
const resultUpdatedTitle = 'Thông báo'

const ENUM_FIELD_UPDATE = {
    STATUS: 'status'
}
const warningMaxSelected = "Bạn được chọn tối đa {x} Deal cùng lúc"
const textUnCheckAll = 'bỏ chọn các Deal đã chọn'

const LoadingElement = ({statusUpdate}) => {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <CircularProgress color={statusUpdate === DealStatus.ACTIVE ? 'primary' : 'secondary'} /> </div>
} 

const getCheckedAll = (data, listChecked) => {
    if(data.length === 0 ) return false;
    return data.every(child => listChecked.map(child => child.dealID).includes(child.dealID))
}

const render = ({ deals, count, message, seller, skuOptions, sellerOpts, levelOptions, areaOptions, areaMap, levelMap, regionMap, skuMap }) => {

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách deal",
        },
    ];
    const router = useRouter();
    const toast = useToast();

    const limit = +(router.query.limit || 20);
    const page = +(router.query.page || 0);

    const [selectedDeal, setSelectedDeal] = useState(null);
    const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState([])
    const [isCheckedAll, setCheckedAll] = useState(getCheckedAll(deals, selectedRow))
    const [openMultiUpdateDialog, setOpenMultiUpdateDialog] = useState(false)
    const [actionUpdateMulti, setActionUpdateMulti] = useState(null)
    const [stateProcessUpdateMulti, setStateProcessUpdateMulti] = useState({
        isLoading: false,
        isSuccess: false,
        historyUpdated: {
            data: []
        }
    })

    const updateDeal = useCallback(async (field) => {
        let { code, status, skus, areaCodes } = selectedDeal;
        const dealClient = getDealClient();
        
        if (status === DealStatus.ACTIVE && skus.length > 0) {
            const skusResp = await getProductClient().getSkuMainList({ q: JSON.stringify({ code: skus[0]?.sku }), offset: 0, limit: 10 })
            let skuItems = []
            if (skusResp.status === "OK") {
                let skuItemCodes = []
                const getSkuItems = skusResp.data?.map(async (sku) => {
                    if (sku?.skuItems?.length) {
                        sku?.skuItems.forEach(element => {
                            skuItemCodes.push(element.itemCode)
                        });
                    }

                    const respItem = await getProductClient().getSkuItemList({ itemCodes: skuItemCodes })

                    if (respItem.status === "OK") {
                        const skuItemMap = {}
                        respItem.data?.forEach(element => {
                            skuItemMap[element.itemCode] = element.retailPriceValue || 0
                        });

                        sku.skuItems = sku.skuItems?.map(element => {
                            if (skuItemMap[element.itemCode]) {
                                element.retailPriceValue = skuItemMap[element.itemCode] || 0
                            }
                            return element
                        });
                    }
                    skuItems = sku.skuItems || []

                    return sku
                })

                await Promise.all(getSkuItems)
            }

            let newSkus = skuItems?.filter(item => (item.status === SkuStatus.NORMAL || item.status === SkuStatus.LIMIT) && item.isActive)

            if (newSkus.length === 0) {
                throw new Error("Trạng thái sku con trong khu vực áp dụng không hợp lệ");
            }
            
            const isValidSku = (skuItems) => {
                let skuLocations = [], skuLocationMap = {}, locations = [], flag = false
                skuItems?.forEach(item => {
                    if (item.locationCodes.find(code => code === "00")) flag = true
                    skuLocations = skuLocations.concat(regionMap[item.locationCodes] || item.locationCodes)
                })

                skuLocations?.forEach(element => {
                    skuLocationMap[element] = element
                });

                areaCodes?.forEach(item => {
                    locations.push(item)
                    
                    if (item === "ALL" || item === "00") {
                        flag = true
                    }
                    if (regionMap[item]) {
                        locations = locations.concat(regionMap[item] || item)
                    }
                })

                if (flag) {
                    return true
                }

                return locations?.find(element => skuLocationMap[element]) ?? false
            }

            if (!isValidSku(newSkus)) {
                if (newSkus.length !== skuItems?.length) {
                    throw new Error("Trạng thái sku con trong khu vực áp dụng không hợp lệ")
                }
                throw new Error("Sku không thuộc khu vực áp dụng");
            }
            
        }
        
        let resp;
        if (field === "status") {
            resp = await dealClient.updateDealStatus({ code, status });
        }
        if (resp.status !== "OK") {
            throw new Error(resp.errorCode === "CONFLICT_CAMPAIGN_PRODUCT" ? resp.message : resp.errorCode === "IN_PROCESSING" ? "Đang xử lý dữ liệu, xin vui lòng đợi" : "Deal đã quá hạn. Không thể chuyển trạng thái");
        }
        toast.success("Cập nhật deal thành công")
    }, [selectedDeal]);

    const updateMultiDeal = useCallback(async(field, fixedStatus) =>{
        let resp;
        if(field === ENUM_FIELD_UPDATE.STATUS){
            resp = await updateStatusMultiDeal(field, selectedRow, fixedStatus)
        }
        if(resp.data.length === 0){
            setStateProcessUpdateMulti(prev => ({...prev, isSuccess: false}))
            throw new Error("Đã có lỗi trong quá trình cập nhật deal, xin vui lòng thử lại!")
        }
        // clear selected Row
        setStateProcessUpdateMulti(prev => ({...prev, historyUpdated: resp, isSuccess: true}))
    }, [selectedRow])

    const handleUpdateDealStatus = async (field) => {
        try {
            await updateDeal(field);
            setSelectedDeal(null);
            router.push({
                pathname: "/marketing/deal",
                query: {
                    ...router.query,
                }
            });
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/deal",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
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
            case "MEDX_E":
                url = `/internal-seller/MEDX_E/PUR_HCM/sku/edit?code=${code}`
                break;
            default:
                url = `/seller/sku/edit?code=${code}`
                break;
        }
        return url
    }

    // handle checkbox Deals
    const handleChangeCheckbox = (value) => {
        const {dealID} = value
        const valueIndex = selectedRow.map(child => child.dealID).indexOf(dealID)
        const filterArray = selectedRow.filter(child => child.dealID !== dealID)
        if(valueIndex !== -1){
            setSelectedRow(filterArray)
        }else{
            setSelectedRow(prev => [...prev, value])
        }
    };

    const handleCheckAllBox = (allValue) => {
        if(!isCheckedAll){
            const checkedList = [...selectedRow, ...allValue.filter(child => !selectedRow.map(item => item.dealID).includes(child.dealID))]
            setSelectedRow(checkedList.slice(0, maxSelectedRow))
            setCheckedAll(true)
        }else{
            const checkedSet = new Set(allValue.map(child => child.dealID))
            const result = selectedRow.filter(item => !checkedSet.has(item.dealID))
            setSelectedRow(result)
            setCheckedAll(false)
        }
    }

    const initSelectedRow = () =>{
        setSelectedRow([])
    }

    const handleApplyAll = async(field, fixedStatus, multiUpdate = true) => {
        try {
            setStateProcessUpdateMulti(prev => ({...prev, isLoading: true}))
            await updateMultiDeal(field, fixedStatus, multiUpdate);
            setStateProcessUpdateMulti(prev => ({...prev, isLoading: false}))
        } catch (e) {
            toast.error(e.message);
            setStateProcessUpdateMulti(prev => ({...prev, isLoading: false}))
        }
    }    

    useEffect(()=>{
        setCheckedAll(getCheckedAll(deals, selectedRow))
    }, [page, selectedRow])
    useEffect(()=>{
        setCheckedAll(getCheckedAll(deals, selectedRow))
    })
    const updateStatusMultiDeal = async(field, listSelectedRow, updateStatus ) => {
        // TODO: Move error message on Notify into TableResult
        // TODO: On update multi, with case multi having the same sku, call API update with the first one, and after that call deals have duplicate sku.
        const promises = [];
        const promisesDealDuplicate = []
        const arrayInvalidated = [];
        const dealClient = getDealClient();
        // custom resp for updateMultiStatus
        let dataUpdated = []
        for(let i = 0; i< listSelectedRow.length; ++i){
            let { code, status, skus, areaCodes } = listSelectedRow[i]
            // TODO: need reverse status of selectedDeal before compare
            status = status === DealStatus.ACTIVE ? DealStatus.INACTIVE : DealStatus.ACTIVE;
            if (status === DealStatus.ACTIVE && skus.length > 0) {
                const skusResp = await getProductClient().getSkuMainList({ q: JSON.stringify({ code: skus[0]?.sku }), offset: 0, limit: 10 })
                let skuItems = []
                if (skusResp.status === "OK") {
                    let skuItemCodes = []
                    const getSkuItems = skusResp.data?.map(async (sku) => {
                        if (sku?.skuItems?.length) {
                            sku?.skuItems.forEach(element => {
                                skuItemCodes.push(element.itemCode)
                            });
                        }
    
                        const respItem = await getProductClient().getSkuItemList({ itemCodes: skuItemCodes })
    
                        if (respItem.status === "OK") {
                            const skuItemMap = {}
                            respItem.data?.forEach(element => {
                                skuItemMap[element.itemCode] = element.retailPriceValue || 0
                            });
    
                            sku.skuItems = sku.skuItems?.map(element => {
                                if (skuItemMap[element.itemCode]) {
                                    element.retailPriceValue = skuItemMap[element.itemCode] || 0
                                }
                                return element
                            });
                        }
                        skuItems = sku.skuItems || []
    
                        return sku
                    })
    
                    await Promise.all(getSkuItems)
                }
                
                let newSkus = skuItems?.filter(item => (item.status === SkuStatus.NORMAL || item.status === SkuStatus.LIMIT) && item.isActive)
                
                const isValidSku = (skuItems) => {
                    let skuLocations = [], skuLocationMap = {}, locations = [], flag = false
                    skuItems?.forEach(item => {
                        if (item.locationCodes.find(code => code === "00")) flag = true
                        skuLocations = skuLocations.concat(regionMap[item.locationCodes] || item.locationCodes)
                    })
    
                    skuLocations?.forEach(element => {
                        skuLocationMap[element] = element
                    });
    
                    areaCodes?.forEach(item => {
                        locations.push(item)

                        if (item === "ALL" || item === "00") {
                            flag = true
                        }
                        if (regionMap[item]) {
                            locations = locations.concat(regionMap[item] || item)
                        }
                    })
    
                    if (flag) {
                        return true
                    }
                    
                    return locations?.find(element => skuLocationMap[element]) ?? false
                }

                if(newSkus.length === 0){
                    arrayInvalidated.push({data: listSelectedRow[i], message: "Trạng thái sku con trong khu vực áp dụng không hợp lệ", status: ENUM_STATUS_RESP.INVALID})
                }else if (!isValidSku(newSkus)) {
                    if (newSkus.length !== skuItems?.length) {
                        arrayInvalidated.push({data: listSelectedRow[i], message: "Trạng thái sku con trong khu vực áp dụng không hợp lệ", status: ENUM_STATUS_RESP.INVALID})
                    }else{
                        arrayInvalidated.push({data: listSelectedRow[i], message: "Sku không thuộc khu vực áp dụng", status: ENUM_STATUS_RESP.INVALID});
                    }
                }
            }
        }
        if(field === ENUM_FIELD_UPDATE.STATUS){
            const arrayValidated = listSelectedRow.filter(child => !arrayInvalidated.map(child => child.data.code).includes(child.code))
            const arraySkuDupes = new Set(); // arraySku Duplicate
            // arrayValidate deal with no duplicate, run first
            const arrayValidatedNoDupes = arrayValidated.filter(child => {
                const dupes = arraySkuDupes.has(child?.skus[0]?.sku);
                arraySkuDupes.add(child?.skus[0]?.sku);
                return !dupes
            })
            // arrayValidate Deal but have duplicate with one on above, run later
            const arrayValidateDupes = arrayValidated.filter(child => !arrayValidatedNoDupes.map(item => item.code).includes(child.code))
            if(arrayInvalidated.length > 0 ){
                arrayInvalidated.map(child => dataUpdated.push(child))
            }

            if(arrayValidated.length > 0){
                arrayValidatedNoDupes.map(child => {
                    promises.push(dealClient.updateDealStatus({code: child.code, status: updateStatus}))
                })
                const arrayResult = await Promise.all(promises)
                await Promise.all(
                    arrayResult.map(async (res, idx) => {
                        if(res.status === ENUM_STATUS_RESP.OK ){
                            dataUpdated.push({data: res.data[0], message: res.message, status: res.status})
                        }else{
                            const getCodeNotUpdate = listSelectedRow[idx]
                            dataUpdated.push({data: getCodeNotUpdate, message: res.message, status: res.status})
                        }
                        return res
                    })
                )
                arrayValidateDupes.map(child => {
                    promisesDealDuplicate.push(dealClient.updateDealStatus({code: child.code, status: updateStatus}))
                })
                 const arrayDupesResult = await Promise.all(promisesDealDuplicate)
                await Promise.all(
                    arrayDupesResult.map(async (res, idx)=>{
                        if(res.status === ENUM_STATUS_RESP.OK ){
                            dataUpdated.push({data: res.data[0], message: res.message, status: res.status})
                        }else{
                            const getCodeNotUpdate = listSelectedRow[idx]
                            dataUpdated.push({data: getCodeNotUpdate, message: res.message, status: res.status})
                        }
                        return res
                    })
                )
            }
        }
        
        return {
            data: dataUpdated
        }
    }

    const clearHistoryUpdated = () => {
        setStateProcessUpdateMulti({
            isSuccess: false,
            historyUpdated: {
                updated: [],
                notUpdate: []
            }
        })
        // reset selectedRow
        initSelectedRow();
        router.push({
            pathname: "/marketing/deal",
            query: {
                ...router.query,
            }
        });
    }

    const renderTitleUpdateModal = () => {
        let title = ''
        if(!stateProcessUpdateMulti.isSuccess){
            title = actionUpdateMulti === DealStatus.ACTIVE ? activeDealContent.title : inActiveDealContent.title
        }else{
            title = resultUpdatedTitle
        }

        return title
    }

    const onCloseUpdateModal = () => {
        setOpenMultiUpdateDialog(false)
        if(stateProcessUpdateMulti.isSuccess){
            clearHistoryUpdated()
        }
        
    }
    const renderVariantUpdateModal = () => {
        let variant = 'primary'
        if(!stateProcessUpdateMulti.isSuccess){
           variant = actionUpdateMulti !== DealStatus.ACTIVE ? 'error' : 'primary'
        }else{
            variant = 'primary'
        }
        return variant
    }

    const DescUpdateModal = () => {
        if(stateProcessUpdateMulti.isLoading) return <LoadingElement statusUpdate={actionUpdateMulti}  />
        if(!stateProcessUpdateMulti.isSuccess){
            return (
                <Box> 
                    <div style={{padding: '8px 4px'}} dangerouslySetInnerHTML={{__html: (actionUpdateMulti === DealStatus.ACTIVE ? activeDealContent.desc : inActiveDealContent.desc).replace(/{x}/, `<strong>${selectedRow.length}</strong>`)}} /> 
                    <TableBeforeUpdate dataTable={selectedRow} statusUpdate={actionUpdateMulti} />
                </Box>
            )
        }
        return (
            <Box className={styles.resultUpdateForm_container}>
                <TableResultUpdated dataResult={stateProcessUpdateMulti.historyUpdated.data} />
                <Box className={styles.tableCaption}>
                    <span>Có tổng {selectedRow.length} Deal tiến hành cập nhật.&nbsp;<span style={{color: '#1cb773'}}>{stateProcessUpdateMulti.historyUpdated?.data?.filter(item => item.status === ENUM_STATUS_RESP.OK).length}</span>&nbsp;Deal cập nhật thành công.&nbsp; <span style={{color: '#ff2a26'}}>{stateProcessUpdateMulti.historyUpdated?.data?.filter(item => item.status === ENUM_STATUS_RESP.INVALID).length}</span>&nbsp;Deal cập nhật thất bại.</span>
                </Box>
            </Box>
        )
    }
    
    return (
        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách deal</title>
            </Head>
            <MyCard>
                <MyCardHeader title="Danh sách deal" >
                    <AuthorizationButton requiredAPI="POST/marketplace/product/v2/deal/import">
                        <Link href="/marketing/deal/import">
                            <Button style={{ marginRight: 8 }} variant="contained" color="primary">
                                Import deal
                            </Button>
                        </Link>
                    </AuthorizationButton>

                    <AuthorizationButton requiredAPI="POST/marketplace/product/v2/deal">
                        <Link href="/marketing/deal/new">
                            <Button variant="contained" color="primary">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ marginRight: 8 }}
                                />
                                Thêm mới
                            </Button>
                        </Link>
                    </AuthorizationButton>
                </MyCardHeader>
                <DealFilter
                    skuOptions={skuOptions}
                    sellerOpts={sellerOpts}
                    levelOptions={levelOptions}
                    areaOptions={areaOptions}
                    areaMap={areaMap}
                    levelMap={levelMap}
                    selectedRowData={selectedRow}
                    handleApplyAll={handleApplyAll}
                    initSelectedRow={initSelectedRow}
                    setActionUpdateMulti={setActionUpdateMulti}
                    setOpenMultiUpdateDialog={setOpenMultiUpdateDialog}
                />
            </MyCard>
            {
                selectedRow.length > 0 && <Typography variant="body1" className={styles.captionSelectedRow}>
                    {selectedRowContent.replace(/{x}/, selectedRow.length)} 
                    <Tooltip title={warningMaxSelected.replace(/{x}/, maxSelectedRow)}>
                        <IconButton className={styles.buttonWarning}>
                            <ErrorRounded />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="body2" onClick={initSelectedRow} style={{textDecoration: 'underline', color: 'rgb(26, 115, 184)', cursor: 'pointer'}}>({textUnCheckAll})</Typography>
                </Typography>
            }
          
            <MyCard>
                <TableContainer>
                    <Table size="small" aria-label="a dense table">
                        <colgroup>
                            <col width="5%" />
                            <col width="5%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="5%" />
                            <col width="10%" />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"> 
                                    <FormControlLabel 
                                        control={ 
                                            <Checkbox
                                                disabled={deals.length === 0}
                                                checked={isCheckedAll}
                                                value={deals}
                                                onChange={() => handleCheckAllBox(deals)}
                                                color="primary"
                                            />
                                        } 
                                    />
                                </TableCell>
                                <TableCell align="left">Mã</TableCell>
                                <TableCell align="left">Tên deal</TableCell>
                                <TableCell align="left">Danh sách sku con</TableCell>
                                <TableCell align="left">Khu vực áp dụng</TableCell>
                                <TableCell align="right">Khuyến mãi</TableCell>
                                <TableCell align="right">Đã bán/<br />Số lượng</TableCell>
                                <TableCell align="left">Thời gian áp dụng</TableCell>
                                <TableCell align="left">Thời gian tạo</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        {deals.length > 0 ? (
                            <TableBody>
                                {deals.map((row) => {
                                    return (
                                        <TableRow key={`tr_${row.code}`} row={row}>
                                            <TableCell align="center">
                                                <FormControlLabel 
                                                    control={
                                                        <Checkbox
                                                            checked={selectedRow.map(child => child.dealID).includes(row.dealID)}
                                                            onChange={() => handleChangeCheckbox(row)} 
                                                            value={row.dealID}
                                                            color="primary"
                                                            disabled={selectedRow.length >= 50 && !selectedRow.map(child => child.dealID).includes(row.dealID)}
                                                        />
                                                    } 
                                                />
                                            </TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>
                                                <Typography><b>{row.name}</b></Typography>
                                                {row?.skus ? (`${row?.skus[0]?.sku}`) : ""}
                                                <br />
                                                {seller[row?.sellerCode]?.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    (skuMap[row?.skus[0]?.sku]?.items || [])?.map(item => (
                                                        <React.Fragment key={item.itemCode}>
                                                            <SkuItemInfo status={item.status} label={item.itemCode} item={item} areaMap={areaMap} handleUrlSku={handleUrlSku} />
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </TableCell>
                                            <Tooltip title={row.areaCodes?.map(item => areaMap[item] ?? item).join(", ")}>
                                                <TableCell align="left">
                                                    <span className={styles.valueLocation}>{row.areaCodes?.map(item => areaMap[item] ?? item).join(", ")}</span>
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell align="right">
                                                {(row.pricingType === PricingType.ABSOLUTE || row.pricingType === undefined) && formatNumber(row.price ?? 0)}
                                                {row.pricingType === PricingType.PERCENTAGE && `Giảm ${formatNumber(row.discountPercent ?? 0)}%`}
                                            </TableCell>
                                            <TableCell align="right">{row.quantity}/{row.maxQuantity}</TableCell>
                                            <TableCell align="left">
                                                Từ: {formatDateTime(row.startTime)}
                                                <br />
                                                Đến: {formatDateTime(row.endTime)}
                                            </TableCell>
                                            <TableCell align="left">{formatDateTime(row.createdTime)}</TableCell>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    checked={row.status === DealStatus.ACTIVE}
                                                    onClick={() => {
                                                        const { status, ...others } = row;
                                                        setSelectedDeal({
                                                            ...others,
                                                            status: status === DealStatus.ACTIVE ? DealStatus.INACTIVE : DealStatus.ACTIVE,
                                                        })
                                                        setOpenStatusChangeDialog(true);
                                                    }}
                                                    disabled={!isAuthorizationAPI(["PUT/marketplace/product/v2/deal", "PUT/marketplace/product/v2/deal/status"])}
                                                />
                                                <Typography variant="caption" style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                                                    {row.status === DealStatus.ACTIVE ? "Đang bán" : "Tạm ngưng bán"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" width="170px">
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <AuthorizationScreen requiredScreen="/marketing/deal/detail">
                                                        <Link
                                                            href={`/marketing/deal/edit?dealCode=${row.code}`}
                                                        >
                                                            <Tooltip title="Cập nhật thông tin">
                                                                <IconButton>
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Link>
                                                    </AuthorizationScreen>


                                                    <AuthorizationScreen requiredScreen="/marketing/history/deal">
                                                        <Link href={`/marketing/deal/history?dealCode=${row.code}`}>
                                                            <a>
                                                                <Tooltip title="Xem lịch sử thao tác">
                                                                    <IconButton>
                                                                        <FontAwesomeIcon icon={faHistory} style={{ color: "#777" }} size="sm" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </a>
                                                        </Link>
                                                    </AuthorizationScreen>

                                                    <AuthorizationScreen requiredScreen="/marketing/history-deal">
                                                        <Link href={`/marketing/history-deal?dealCode=${row.code}`}>
                                                            <a>
                                                                <Tooltip title="Xem lịch sử dùng deal">
                                                                    <IconButton>
                                                                        <FontAwesomeIcon icon={faEye} size="sm" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </a>
                                                        </Link>
                                                    </AuthorizationScreen>

                                                </div>

                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} align="left">
                                        {message}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}

                        <MyTablePagination
                            labelUnit="deal"
                            count={count}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />
                    </Table>
                </TableContainer>
                <ModalCustom
                    open={openStatusChangeDialog}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    closeText="Đóng"
                    onClose={setOpenStatusChangeDialog}
                    onExcute={() => handleUpdateDealStatus("status")}
                >
                    Bạn có muốn <strong>
                        {selectedDeal?.status === DealStatus.ACTIVE ? "Bật" : "Tắt"}
                    </strong> trạng thái của <strong> {selectedDeal?.name || " - "}
                    </strong> không?
                </ModalCustom>
                <ModalUpdateMultiDeal
                    open={openMultiUpdateDialog}
                    title={renderTitleUpdateModal()}
                    primaryText={!stateProcessUpdateMulti.isSuccess ? 'Xác nhận' : ''}
                    closeText={!stateProcessUpdateMulti.isSuccess ? 'Huỷ': 'Đóng'}
                    onClose={() => onCloseUpdateModal()}
                    onExcute={() => handleApplyAll("status", actionUpdateMulti)}
                    variant={renderVariantUpdateModal()}
                    removeCloseOnExcute={!stateProcessUpdateMulti.isSuccess}
                    disableButton={stateProcessUpdateMulti.isLoading}
                    maxWidth="lg"
                    showButtonConfirm={!stateProcessUpdateMulti.isSuccess}
                >
                    <DescUpdateModal />
                </ModalUpdateMultiDeal>
            </MyCard>
        </AppMarketing>
    );
};

const columns = [
    { id: 'name', label: 'Tên deal', minWidth: 170 },
    { id: 'status_before', label: 'Trước', minWidth: 150, border: '1px solid rgba(224,224,224,1)' },
    {
      id: 'status_before',
      label: 'Sau',
      minWidth: 150,
    },
]

const TableBeforeUpdate = ({ dataTable, statusUpdate }) => {
    return (
        <TableContainer component={Paper} style={{maxHeight: 550}}>
            <Table aria-label="result updated table">
            <TableHead>
                <TableRow>
                    <TableCell align="left" style={{borderBottom: 'none'}}></TableCell>
                    <TableCell align="center" style={{borderLeft: '1px solid rgba(224,224,224,1)'}} colSpan={2}>
                        Trạng thái deal
                    </TableCell>
                </TableRow>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth, borderLeft: column.border, borderRight: column.border }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {dataTable?.map((row) => {
                    return (
                        <TableRow
                            key={row.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row?.name}
                            </TableCell>
                            <TableCell align="left">
                                <span style={{color: row.status === DealStatus.ACTIVE ? '#1cb773': 'rgba(0,0,0,0.54'}}>
                                {row.status === DealStatus.ACTIVE ? "Đang bán" : "Tạm ngưng bán"}
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                <span style={{color: statusUpdate === DealStatus.ACTIVE ? '#1cb773': 'rgba(0,0,0,0.54'}}>
                                {statusUpdate === DealStatus.ACTIVE ? "Đang bán" : "Tạm ngưng bán"}
                                </span>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

const TableResultUpdated = ({ dataResult }) => {
    return (
        <TableContainer component={Paper} style={{maxHeight: 550}}>
            <Table aria-label="result updated table">
            <colgroup>
                <col width="35%" />
                <col width="25%" />
                <col />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell align="left">Tên deal</TableCell>
                    <TableCell align="left">Trạng thái</TableCell>
                    <TableCell align="left">Lý do</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataResult?.map((row) => {
                    const {data, message, status} = row
                    return (
                        <TableRow
                            key={data.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {data?.name}
                            </TableCell>
                            <TableCell align="left">
                                <span style={{color: status === ENUM_STATUS_RESP.OK ? '#1cb773': '#ff2a26'}}>
                                    {status === ENUM_STATUS_RESP.OK ? 'Thành công' : 'Thất bại'}
                                </span>
                            </TableCell>
                            <TableCell align="left">
                                {status === ENUM_STATUS_RESP.OK ? '-': message}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default function ListDealPage(props) {
    return renderWithLoggedInUser(props, render);
}
