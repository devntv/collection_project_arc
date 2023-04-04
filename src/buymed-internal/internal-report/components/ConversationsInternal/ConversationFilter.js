import {makeStyles} from '@material-ui/core/styles'
import { Box, Button, Checkbox, FormControlLabel, OutlinedInput } from '@material-ui/core';
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DateRangePickerInput from '../DatePicker/DatePickerInput/DateRangePickerInput';
import CustomAutoComplete from '../Element/CustomAutoComplete';
import { getProductForFilter } from '../../services/ProductService';
import { APIStatus } from '../../lib/common';
import ListBox from '../Element/ListBox';
import { useDebounce } from '../hook/useDebounce/useDebounce';
import { getListCustomerSupport } from '../../services/ChatService';
import { useRouter } from 'next/router';

const productLimit = 20;

const useStyles = makeStyles({
    inputField: {
        height: "40px",
        margin: "4px 0 12px",
        width: "100%",
        backgroundColor: "white"
    },
    labelField: {
        fontSize: "16px",
        alignItems: "start",
        "& > span": {
            fontWeight: "500",
            fontSize: "16px",
        },
        width: "100%",
        margin: 0,
        "& span": {
            whiteSpace: "nowrap",
            maxWidth: "7vw",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    dateRangeLabel: {
        marginTop: "26px",
    },

})


function ConversationFilter({fetchData, rowsPerPage, data, isAllTopic, setData, setPage, setRowsPerPage, setIsAllTopic, setTransferEmployeeList, setIsSubmit}) {
    const classes = useStyles();
    const [stopLoading, setStopLoading] = useState(false);
    const [productOffset, setProductOffset] = useState(0);
    const [productSearchValue, setProductSearchValue] = useState("");
    const [listProduct, setListProduct] = useState([]);
    const { register, handleSubmit, control, setValue, getValue, reset } = useForm();
    const { name } = register('topicID');
    const [isEmployeeLoading, setIsEmployeeLoading] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [totalOption, setTotalOption] = useState(0);
    const [employeeSelected, setEmployeeSelected] = useState([]);
    const debounceSearchValue = useDebounce(productSearchValue);
    const mountedRef = useRef(false);
    const [offsetEmployee, setOffsetEmployee] = useState(20);
    const [dataEmployee, setDataEmployee] = useState([]);
    const [employeeSearchValue, setEmployeeSearchValue] = useState("");
    const [stopLoadingEmployee, setStopLoadingEmployee] = useState(false);
    const debounceSearchValueEmployee = useDebounce(employeeSearchValue);
    const router = useRouter()

    const disabledFilterOption = {
        filterOptions: (options, state) => options
    }

    const getProductList = async (bodyData) => {
        if (stopLoading) {
            return
        }
        setIsProductLoading(true);
        setProductOffset(bodyData.offset);
        const res = await getProductForFilter({
            params: {
                ...bodyData,
            },
        })
        if (res.data.status == APIStatus.OK) {
            let listProductTemp = [];
            res.data.data.map(item => {
                let productTemp = {};
                productTemp.id = item.skuItem.sku;
                productTemp.name = item.product.name;
                let isExistSku = false;
                listProductTemp.forEach(item2 => {
                    if (productTemp.id == item2.id){
                        isExistSku = true;
                    }
                })
                listProduct.forEach(item3 => {
                    if (productTemp.id == item3.id){
                        isExistSku = true;
                    }
                })
                if (!isExistSku){
                    listProductTemp.push(productTemp);
                }
            })
            setListProduct([...listProduct,...listProductTemp]);
            setTotalOption(res.data.total);
        }
        if (res.data.status == APIStatus.NOT_FOUND) {
            setStopLoading(true);
        }
        setIsProductLoading(false);
    }

    const handleScrollFunc = async (e) => {
        if (isProductLoading) {
            return;
        }
        if (listProduct.length >= totalOption) {
            return;
        }
        const listboxNode = e.currentTarget;

        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        if (listboxNode.scrollHeight - position <= 1) {
            await getProductList({
                text: productSearchValue,
                limit: productLimit,
                offset: productOffset + productLimit,
            })
        }
    }


    const onHighlightChangeFunc = async (e, option)=>{

    }

    useEffect(()=>{
        if (productOffset === 0){
            setListProduct([]);
        }
    }, [productOffset])



    useEffect(()=>{
        if(mountedRef.current){
            getListOption(0, debounceSearchValueEmployee);
        }
        mountedRef.current = true;
    }, [debounceSearchValueEmployee])

    useEffect(()=>{
        if(mountedRef.current){
            getProductList({
                text: debounceSearchValue,
                limit: productLimit,
                offset: 0
            });
        }
        mountedRef.current = true;
    }, [debounceSearchValue])

    const onInputChangeFunc = (e, value)=>{
        setProductSearchValue(value);
        setProductOffset(0);
        setListProduct([]);
        setIsProductLoading(true);
        setIsProductLoading(false);
        setStopLoading(false);
    }

    const onInputChangeFuncEmployee = async (e, value) => {
        setStopLoading(false)
        setOffsetEmployee(20);
        setDataEmployee([]);
        setEmployeeSearchValue(value);
    }

    const handleScrollFuncEmployee = async (e) => {
        if (stopLoadingEmployee) {
            return
        }
        if (isEmployeeLoading) {
            return;
        }
        const listboxNode = e.currentTarget;

        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        if (listboxNode.scrollHeight - position <= 1) {
            getListOption(offsetEmployee, employeeSearchValue);
            setOffsetEmployee(prev => prev + 20);
        }
    }

    const onHighlightChangeFuncEmployee = async (e, option)=>{

    }


    const submitFilter = (submitData) => {
        setTransferEmployeeList([]);
        setIsSubmit(true);
        const query = {
            topicID: parseInt(submitData.topicID) || 0,
            customerInfo: (submitData.customerInfo || "").trim(),
            ticketCode: (submitData.ticketCode || "").trim(),
            orderCode: (submitData.orderCode || "").trim(),
            customerSupportIDs: submitData.supporter.length > 0 ? submitData.supporter.map(item => item.id) : [],
            productCode: (submitData.productCode?.id || "").trim(),
            allTopic: submitData.allTopic,
            getTotal: true,
            offset: 0,
            limit: rowsPerPage,
            startTimeFilter: submitData.dateRange ? new Date(submitData.dateRange.start) : null,
            endTimeFilter: submitData.dateRange ? new Date(submitData.dateRange.end) : null
        }
        fetchData(query)
    }

    const onclickReset = () => {
        setIsAllTopic(false);
        setEmployeeSelected([]);
        setData(
            {
                topicID: "",
                customerInfo: "",
                ticketCode: "",
                orderCode: "",
                productCode: null,
                supporter: [],
                allTopic: false,
                getTotal: true,
                offset: 0,
                limit: 5,
                dateRange: null,
            }
        )
        reset({
            topicID: "",
            customerInfo: "",
            supporter: [],
            ticketCode: "",
            orderCode: "",
            productCode: null,
            allTopic: false,
            dateRange: null,
        })
        router.push("")
    }

    const getCustomerSupportObject = async (id) => {
        let newData = {}
        const res = await getListCustomerSupport({
            params: {
                q: JSON.stringify({
                    accountId: id,
                }),
                limit: 1,
                offset: 0
            }
        })
        if (res.data?.status === APIStatus.OK) {
            newData.id = id
            newData.name = res.data?.data[0].fullname
            return newData
        }
        return null
    }

    const getListOption = async (newOffset, searchContent) => {
        setIsEmployeeLoading(true);
        let employeeData = [];
        const res = await getListCustomerSupport({
            params: {
                q: JSON.stringify({
                    search: searchContent,
                }),
                limit: 20,
                offset: newOffset,
                getTotal: true,
            }
        })
        const dataRes = res.data;
        if (dataRes?.status === APIStatus.OK) {
            employeeData.push(...dataRes.data);
            let newData = employeeData.map(item => {
                let temp = {}
                temp.name = item.fullname || item.username
                temp.id = item.accountId
                return temp
            })
            setDataEmployee([...dataEmployee, ...newData]);
            setStopLoadingEmployee(false);
        } else {
            setStopLoadingEmployee(true);
        }
        setIsEmployeeLoading(false);
    }

    const getProductCode = async (sku) => {
        if (sku != "") {
            const getProductFromQuery = await getProductForFilter({
                params: {
                    text: sku,
                    limit: 1,
                    offset: 0,
                }
            })
            if (getProductFromQuery.data.status == APIStatus.OK) {
                setValue("productCode", {id: getProductFromQuery.data.data[0].skuItem.sku, name: getProductFromQuery.data.data[0].product.name});
            }
        }
        else {
            setValue("productCode", "");
        }
    }

    useEffect(() => {
        getListOption(0);
        let promises = []
		data.customerSupportIDs?.forEach(item => {
            promises.push(getCustomerSupportObject(item))
        })
        Promise.all(promises).then(res => {
            res = res.filter(i => i != null)
            setValue("supporter", res)
            setEmployeeSelected(res)
        })
        getProductList({
            text: "",
            limit: productLimit,
            offset: 0,
        })
        setValue("topicID", data.topicID);
        setValue("customerInfo", data.customerInfo);
        setValue("ticketCode", data.ticketCode);
        setValue("orderCode", data.orderCode);
        getProductCode(data.productCode);
        setValue("allTopic", data.allTopic);
        setValue("dateRange", data.startTimeFilter ? { start: new Date(data.startTimeFilter), end: new Date(data.endTimeFilter) } : null);
    }, [])

    return (
            <Box
                component="form"
                onSubmit={handleSubmit(submitFilter)}
                sx={{ display: "flex", gap: "16px" }}
            >
                <Box sx={{ flex: 1 }}>
                    <FormControlLabel className={classes.labelField} labelPlacement='top' control={
                        <Controller
                            name={name}
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <OutlinedInput
                                    color="success"
                                    className={classes.inputField}
                                    placeholder="Tìm kiếm mã hội thoại"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    error={!!error}
                                />
                            )}
                        >

                        </Controller>
                    } label="Mã hội thoại" />
                    <FormControlLabel className={classes.labelField} labelPlacement='top' control={
                        <Controller
                            name="orderCode"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <OutlinedInput
                                    color="success"
                                    className={classes.inputField}
                                    placeholder="Tìm kiếm mã đơn hàng"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    error={!!error}
                                />
                            )}
                        >

                        </Controller>
                    } label="Đơn hàng" />
                </Box>
                <Box sx={{ flex: 1, minWidth: "100px" }}>
                    <FormControlLabel className={classes.labelField} labelPlacement='top' control={
                        <Controller
                            control={control}
                            name="customerInfo"
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <OutlinedInput
                                    color="success"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    error={!!error}
                                    className={classes.inputField}
                                    placeholder="Tìm kiếm mã khách hàng/sđt khách hàng"
                                />
                            )}
                        >

                        </Controller>
                    } label={t("chat:customer")} />
                    <Box
                            sx={{ width: "100%", zIndex: 100 }}
                        >
                            <CustomAutoComplete
                                id="supporter"
                                name='supporter'
                                zIndex={0}
                                fullWidth
                                label={t("chat:supportEmployee")}
                                placeholder={t("chat:placeholder.supportEmployee")}
                                noOnBlur={true}
                                size='small'
                                control={control}
                                data={dataEmployee}
                                selectedItem={employeeSelected}
                                multiple
                                ListboxComponent={ListBox}
                                isLoading={isEmployeeLoading}
                                limitTags={1}
                                filterSelectedOptions
                                handleOpen={(e) => {if (dataEmployee.length <= 0){getListOption(0)}}}
                                propsOnChange={(e, newValue) => {
                                    if (newValue) {
                                        setEmployeeSelected(pre => [...newValue]);
                                    }
                                }}
                                onHighlightChange={(e, option)=>{
                                    onHighlightChangeFuncEmployee(e, option)
                                }}
                                onInputChange={(e, value)=>{
                                    onInputChangeFuncEmployee(e, value)
                                    }
                                }
                                handleScroll={handleScrollFuncEmployee}
                                value={employeeSelected}
                                isOptionEqualToValue={(option, value) => {
                                    return (option && value && option.id === value.id)
                                }}
                            />

                        </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <CustomAutoComplete
                        disabledFilterOption={disabledFilterOption}
                        id="productCode"
                        name='productCode'
                        label="Sản phẩm"
                        zIndex={0}
                        fullWidth
                        placeholder="Tìm kiếm sản phẩm"
                        noOnBlur={true}
                        size='small'
                        control={control}
                        isLoading={isProductLoading}
                        data={listProduct}
                        limitTags={1}
                        filterSelectedOptions
                        handleClose={(e)=>{}}
                        propsOnChange={(e, newValue) => {
                            setValue("productCode", newValue)
                        }}
                        ListboxComponent={ListBox}
                        isOptionEqualToValue={(option, value) => {
                            return (option && value && option.id == value.id)
                        }}
                        onHighlightChange={(e, option)=>{
                            onHighlightChangeFunc(e, option)
                        }}
                        onInputChange={(e, value)=>{
                            onInputChangeFunc(e, value)
                            }
                        }
                        renderOption={(props, option) => {
                            return (
                            <li {...props} style={{flexDirection: "column", alignItems: "start"}} key={option.id}>
                                <strong>{option.name}</strong>
                                <i style={{fontSize: "85%"}}>{option.id}</i>
                            </li>
                            );
                        }}
                        handleScroll={handleScrollFunc}
                    />
                    <FormControlLabel sx={{ "& input": { cursor: "pointer" }, "& > div > div": { "& > div": {height: "100%"}, height: "40px", marginTop: "5px", bgcolor: "white" }, justifyContent: "start", marginTop: "14px" }} className={`${classes.labelField} ${classes.dateRangeLabel}`} labelPlacement='top' control={

                        <Controller
                            name="dateRange"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <DateRangePickerInput
                                    id="dateRange"
                                    maxRange={30}
                                    fullWidth
                                    size='small'
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        >
                        </Controller>
                    } label=t("common:created_time") />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FormControlLabel className={classes.labelField} labelPlacement='top' control={
                        <Controller
                            control={control}
                            name="ticketCode"
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <OutlinedInput
                                    color="success"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    error={!!error}
                                    className={classes.inputField}
                                    placeholder="Tìm kiếm mã phiếu hỗ trợ"
                                />
                            )}
                        >
                        </Controller>
                    } label="Phiếu hỗ trợ" />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ height: "24px" }}></Box>
                        <Box sx={{ display: "flex", gap: "7px", minWidth: "100px", marginTop: "4px", alignItems: "center" }}>

                            <FormControlLabel className={classes.labelField} sx={{ fontSize: "14px", margin: 0, marginRight: "10px", flex: 1 }} control={
                                <Controller
                                    control={control}
                                    name="allTopic"
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Checkbox
                                            color="success"
                                            sx={{ "& > svg": { height: "20px", width: "20px" }, padding: 0 }}
                                            checked={!!value}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                                setIsAllTopic(!isAllTopic);
                                            }}
                                        />
                                    )}
                                >
                                </Controller>
                            } label="Tất cả hội thoại" />
                            <Button sx={{ fontSize: "14px", bgcolor: "#D9D9D9", height: "40px", width: "86px", borderRadius: "6px", padding: 0, "&:hover": { bgcolor: "#c7c5c5" }, color: "black" }} variant="contained" onClick={onclickReset} type='reset'>LÀM MỚI</Button>
                            <Button type='submit' sx={{ fontSize: "14px", bgcolor: "#15A959", height: "40px", width: "86px", borderRadius: "6px", padding: 0, "&:hover": { bgcolor: "#149952" } }} variant="contained">ÁP DỤNG</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
    )
}

export default ConversationFilter
