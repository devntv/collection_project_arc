import React, { useEffect, useState } from "react";
import { Grid, Typography, IconButton, Tooltip, MenuItem, TextField } from "@material-ui/core";
import { combinationCondition, conditionMap, defaultCombinationCondition, defaultCondition } from "components/promotion-voucher/constant";
import { Controller } from "react-hook-form";
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";
import { getTagClient } from "client/tag";
import ConditionSlot from "./ConditionSlot";
import OrderConditionSlot from "./OrderConditionSlot";
import { useForm } from "react-hook-form";
import DeleteIcon from '@material-ui/icons/Delete';
import CustomerConditionSlot from "./CustomerConditionSlot";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CancelIcon from '@material-ui/icons/Cancel';
import { uuidv4 } from "components/global";

export const defaultProductCondition = {
    sellerCode: null,
    productId: null,
    minQuantity: 1,
    minTotalPrice: 0
}

export const defaultProductTagCondition = {
    sellerCode: null,
    tagCode: null,
    minQuantity: 1,
    minTotalPrice: 0
}

export const defaultCustomerCondition = {
    minOrderCount: null,
    minDayNoOrder: null,
    maxOrderCount: null
}

export const defaultOrderData = {
    minTotalPrice: null,
}

export default function ConditionScope(props) {

    const {
        disabled,
        listTagConditions,
        setListTagConditions,
        isEdit,
        listOrderConditions = [],
        setListOrderConditions,
        listCustomerConditions = [],
        setListCustomerConditions,
        listProductConditions = [],
        setListProductConditions,
        conditionItem,
        conditionIndex,
        listConditions = [],
        handleChangeCondition,
        handleRemoveCondition,
        hookForm,
        voucherType
    } = props;

    const { control, errors, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            combinationType: conditionItem.combinationType,
        },
    });

    const [defaultListSellers, setDefaultListSellers] = useState([])
    const [defaultOptions, setDefaultOptions] = useState([])
    const [combinationList, setCombinationList] = useState(combinationCondition)

    const handleAddConditionItem = (index, type) => {
        let newList = [];
        switch (type) {
            case defaultCondition.customer:
                newList = [...listCustomerConditions]
                newList.splice(index + 1, 0, { ...defaultCustomerCondition, code: uuidv4() })
                setListCustomerConditions(newList)
                break;
            case defaultCondition.order:
                newList = [...listOrderConditions]
                newList.splice(index + 1, 0, { ...defaultOrderData, code: uuidv4() })
                setListOrderConditions(newList)
                break;

            case defaultCondition.product:
                newList = [...listProductConditions]
                newList.splice(index + 1, 0, { ...defaultProductCondition, code: uuidv4() })
                setListProductConditions(newList)
                break;

            case defaultCondition.productTag:
                newList = [...listTagConditions]
                newList.splice(index + 1, 0, { ...defaultProductTagCondition, code: uuidv4() })
                setListTagConditions(newList)
                break;

            default:
                break;
        }
    }

    const handleRemoveConditionItem = (indexValue, type) => {
        let newList = []
        switch (type) {
            case defaultCondition.customer:
                newList = [...listCustomerConditions]?.filter((_, index) => index !== indexValue)
                setListCustomerConditions(newList)
                break;
            case defaultCondition.order:
                newList = [...listOrderConditions]?.filter((_, index) => index !== indexValue)
                setListOrderConditions(newList)
                break;

            case defaultCondition.product:
                newList = [...listProductConditions]?.filter((_, index) => index !== indexValue)
                setListProductConditions(newList)
                break;

            case defaultCondition.productTag:
                newList = [...listTagConditions]?.filter((_, index) => index !== indexValue)
                setListTagConditions(newList)
                break;

            default:
                break;
        }
    }

    const handleChangeConditionItem = (index, value, type) => {
        let newList = []
        switch (type) {
            case defaultCondition.customer:
                newList = [...listCustomerConditions]
                newList[index] = value
                setListCustomerConditions(newList)
                break;
            case defaultCondition.order:
                newList = [...listOrderConditions]
                newList[index] = value
                setListOrderConditions(newList)

                break;

            case defaultCondition.product:
                newList = [...listProductConditions]
                newList[index] = value
                setListProductConditions(newList)
                break;

            case defaultCondition.productTag:
                newList = [...listTagConditions]
                newList[index] = value
                setListTagConditions(newList)
                break;

            default:
                break;
        }
    }

    const getDefaultListProducts = async () => {
        const productClient = getProductClient();
        const productResp = await productClient.getProductListFromClient({
            offset: 0,
            limit: 20,
            search: "",
            ignoreCombo: true
        });

        if (productResp.status === "OK") {
            const list = productResp.data?.map((product) => ({
                value: product.productID,
                label: product.productID + " - " + product.name,
                productCode: product.code
            }));
            setDefaultOptions(list)
        }
    }

    const getDefaultListTag = async () => {
        const res = await getTagClient().getListTagClient(0, 50, "", "")
        if (res.status === "OK") {
            const list = res.data?.map(item => ({
                label: item.name,
                value: item.code
            }))
            setDefaultOptions(list)
        }
    }

    const getDefaultListSeller = async () => {
        if (defaultListSellers.length > 0) return
        const res = await getSellerClient().getSellerClient(0, 50, JSON.stringify({}), "ACTIVE")
        if (res.status === "OK") {
            const list = res.data?.map(item => ({
                label: `${item.code} - ${item.name}`,
                value: item.code
            }))
            setDefaultListSellers(list)
        }
    }

    useEffect(() => {
        setValue("combinationType", conditionItem.combinationType)
    }, [listConditions])

    useEffect(() => {
        switch (conditionItem.conditionType) {
            case defaultCondition.product:
                if (voucherType === "GIFT" && conditionItem.combinationType === defaultCombinationCondition.or) {
                    handleChangeCondition(conditionIndex, defaultCombinationCondition.and)
                }
                getDefaultListProducts()
                getDefaultListSeller()
                break;
            case defaultCondition.productTag:
                getDefaultListTag()
                getDefaultListSeller()
                break;
            default:
                break;
        }
    }, [conditionItem.conditionType])

    useEffect(() => {
        if (voucherType === "GIFT" && conditionItem.conditionType === defaultCondition.product) {
            setCombinationList(combinationCondition.filter(item => item.value === "AND"))
        } else {
            setCombinationList(combinationCondition)
        }
    }, [voucherType])

    return (

        <>

            <Grid container item xs={12} spacing={2} style={{
                border: "1px solid #afafaf",
                borderRadius: "5px",
                margin: "15px 10px",
                alignItems: "center",
                background: "#fcfcfc",
                position: "relative"
            }}>

                {
                    listConditions.length > 0 && (
                        <IconButton style={{
                            overflow: "unset",
                            position: "absolute",
                            top: "-20px",
                            right: "-20px",
                        }} onClick={() => {
                            handleRemoveCondition(conditionIndex, conditionItem.conditionType)
                        }}>
                            <CancelIcon style={{
                                color: "black"
                            }} />
                        </IconButton>
                    )
                }

                <Grid item xs={12}>
                    <Typography>
                        <span style={{
                            color: "#15A959",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}>{conditionMap[conditionItem.conditionType]}</span>
                        {
                            conditionItem.conditionType === defaultCondition.customer && (
                                <Tooltip title="Khách hàng phải có số ngày không đặt hàng theo quy định, số đơn hàng tối thiểu và tối đa thỏa mãn điều kiện mới có thể áp dụng khuyến mãi">
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            fontSize={6}
                                            style={{ marginLeft: "6px" }}
                                        />
                                    </span>
                                </Tooltip>
                            )
                        }

                        {
                            conditionItem.conditionType === defaultCondition.order && (
                                <Tooltip title="Đơn hàng phải có giá trị >= giá trị nhỏ nhất mới có thể áp dụng khuyến mãi">
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            fontSize={6}
                                            style={{ marginLeft: "6px" }}
                                        />
                                    </span>
                                </Tooltip>
                            )
                        }
                    </Typography>
                </Grid>

                {/* <Grid item sm={1}/> */}


                {conditionItem.conditionType !== defaultCondition.order && (
                    <Grid item container spacing={2} xs={12}>
                        <Grid item style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Typography>
                                Loại kết hợp ĐK:
                            </Typography>
                        </Grid>

                        <Grid item md={3} xs={12}>
                            <Controller
                                control={control}
                                name="combinationType"
                                render={({ onChange, ...props }) => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={!!errors.combinationType}
                                        helperText={errors.combinationType?.message}
                                        fullWidth
                                        select
                                        onChange={(e) => {
                                            onChange(e.target?.value)
                                            handleChangeCondition(conditionIndex, e.target?.value)
                                        }}
                                        {...props}
                                    >
                                        {combinationList?.map((item) => (
                                            <MenuItem key={item.value}
                                                value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                )}

                <Grid item xs={12}>
                    {
                        conditionItem.conditionType === defaultCondition.customer && listCustomerConditions.length > 0 && listCustomerConditions.map((item, index) => (
                            <CustomerConditionSlot
                                key={item.code}
                                disabled={disabled}
                                listCustomerConditions={listCustomerConditions}
                                item={item}
                                index={index}
                                handleAddConditionItem={handleAddConditionItem}
                                handleRemoveConditionItem={handleRemoveConditionItem}
                                handleChangeConditionItem={handleChangeConditionItem}
                                combinationType={conditionItem.combinationType}
                                conditionIndex={conditionIndex}
                                hookForm={hookForm}
                            />
                        ))
                    }

                    {
                        conditionItem.conditionType === defaultCondition.order && listOrderConditions.length > 0 && listOrderConditions.map((item, index) => (
                            <OrderConditionSlot
                                key={item.code}
                                disabled={disabled}
                                listOrderConditions={listOrderConditions}
                                item={item}
                                index={index}
                                handleAddConditionItem={handleAddConditionItem}
                                handleRemoveConditionItem={handleRemoveConditionItem}
                                handleChangeConditionItem={handleChangeConditionItem}
                                hookForm={hookForm}
                            />
                        ))
                    }

                    {
                        conditionItem.conditionType === defaultCondition.product && listProductConditions?.map((item, index) => (
                            <ConditionSlot
                                key={item.code}
                                disabled={disabled}
                                listConditionItem={listProductConditions}
                                item={item}
                                index={index}
                                handleChangeConditionItem={handleChangeConditionItem}
                                handleRemoveConditionItem={handleRemoveConditionItem}
                                handleAddConditionItem={handleAddConditionItem}
                                defaultOptions={defaultOptions}
                                defaultListSellers={defaultListSellers}
                                conditionType={defaultCondition.product}
                                fieldName={"productId"}
                                isEdit={isEdit}
                                combinationType={conditionItem.combinationType}
                                handleChangeCondition={handleChangeCondition}
                                conditionIndex={conditionIndex}
                                hookForm={hookForm}
                                voucherType={voucherType}
                            />
                        ))
                    }

                    {
                        conditionItem.conditionType === defaultCondition.productTag && listTagConditions?.map((item, index) => (
                            <ConditionSlot
                                key={item.code}
                                disabled={disabled}
                                listConditionItem={listTagConditions}
                                item={item}
                                index={index}
                                handleChangeConditionItem={handleChangeConditionItem}
                                handleRemoveConditionItem={handleRemoveConditionItem}
                                handleAddConditionItem={handleAddConditionItem}
                                defaultOptions={defaultOptions}
                                defaultListSellers={defaultListSellers}
                                conditionType={defaultCondition.productTag}
                                fieldName={"tagCode"}
                                isEdit={isEdit}
                                combinationType={conditionItem.combinationType}
                                handleChangeCondition={handleChangeCondition}
                                conditionIndex={conditionIndex}
                                hookForm={hookForm}
                            />
                        ))
                    }

                </Grid>


            </Grid>

        </>


    )
}
