import React, { useEffect, useState } from "react";
import { Grid, Typography, FormGroup, Button, FormHelperText } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { defaultCombinationCondition, defaultCondition } from "components/promotion-voucher/constant";
import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import ConditionScope from "./ConditionScope.js";
import AddConditionModal from "./AddConditionModal";
import { getSellerClient } from "client/seller.js";
import { getProductClient } from "client/product.js";
import { getTagClient } from "client/tag.js";
import { arrayEquals } from "utils/function.js";
import { uuidv4 } from "components/global";


export async function handleCondition(ctx, data) {
    let listConditions = []
    const productClient = ctx ? getProductClient(ctx, data) : getProductClient()
    const sellerClient = ctx ? getSellerClient(ctx, data) : getSellerClient()
    const tagClient = ctx ? getTagClient(ctx, data) : getTagClient()

    if (data.andConditions?.["ORDER_VALUE"] && Object.keys(data.andConditions?.["ORDER_VALUE"]).length !== 0) {
        let orderCombinationType = ""
        if (data.andConditions?.["ORDER_VALUE"]?.andConditions?.length > 0) {
            orderCombinationType = "andConditions"
            listConditions.push({
                conditionType: "ORDER_VALUE",
                combinationType: defaultCombinationCondition.and
            })
        }
        else {
            orderCombinationType = "orConditions"
            listConditions.push({
                conditionType: "ORDER_VALUE",
                combinationType: defaultCombinationCondition.or
            })
        }


        let listOrderConditions = []

        data.andConditions?.["ORDER_VALUE"]?.[orderCombinationType]?.forEach((item) => {
            let code = uuidv4();
            listOrderConditions.push({
                minTotalPrice: item?.orderMinTotalPrice || null,
                code
            })
        })

        if (listOrderConditions.length > 0) data.listOrderConditions = listOrderConditions
    }


    if (data.andConditions?.["CUSTOMER_HISTORY"] && Object.keys(data.andConditions?.["CUSTOMER_HISTORY"]).length !== 0) {
        let orderCombinationType = ""
        if (data.andConditions?.["CUSTOMER_HISTORY"]?.andConditions?.length > 0 && Object.keys(data.andConditions?.["CUSTOMER_HISTORY"]?.andConditions?.[0]).length !== 0) {
            orderCombinationType = "andConditions"
            listConditions.push({
                conditionType: "CUSTOMER_HISTORY",
                combinationType: defaultCombinationCondition.and
            })
        }
        else if (data.andConditions?.["CUSTOMER_HISTORY"]?.orConditions?.length > 0 && Object.keys(data.andConditions?.["CUSTOMER_HISTORY"]?.orConditions?.[0]).length !== 0) {
            orderCombinationType = "orConditions"
            listConditions.push({
                conditionType: "CUSTOMER_HISTORY",
                combinationType: defaultCombinationCondition.or
            })
        }

        let listCustomerConditions = []

        data.andConditions?.["CUSTOMER_HISTORY"]?.[orderCombinationType]?.forEach((item, index) => {
            if (Object.keys(item).length !== 0) {
                let code = uuidv4();
                listCustomerConditions.push({
                    ...item,
                    code
                })
            }
        })

        if (listCustomerConditions.length > 0) {
            data.listCustomerConditions = listCustomerConditions
        }
    }

    if (data.andConditions?.["PRODUCT"] && Object.keys(data.andConditions?.["PRODUCT"]).length !== 0) {

        let combinationType = ""
        if (data.andConditions?.["PRODUCT"]?.andConditions?.length > 0) {
            combinationType = "andConditions"
            listConditions.push({
                conditionType: "PRODUCT",
                combinationType: defaultCombinationCondition.and
            })
        }
        else {
            combinationType = "orConditions"
            listConditions.push({
                conditionType: "PRODUCT",
                combinationType: defaultCombinationCondition.or
            })
        }

        let sellerCodes = []
        let productIds = []
        data.andConditions?.["PRODUCT"]?.[combinationType].forEach(condition => {
            if (condition.sellerCode) sellerCodes.push(condition.sellerCode)
            if (condition.productId) productIds.push(condition.productId)
        })

        let sellerMap = {}
        const sellerResp = await sellerClient.getSellerBySellerCodes(sellerCodes)
        if (sellerResp.status === "OK") {
            sellerResp.data?.forEach(seller => {
                sellerMap[seller.code] = {
                    label: `${seller.code} - ${seller.name}`,
                    value: seller.code
                }
            })
        }

        let productMap = {}
        const productResp = await productClient.getListProductByIds(productIds)
        if (productResp.status === "OK") {
            productResp.data?.forEach(product => {
                productMap[product.code] = {
                    value: product.productID,
                    label: product.productID + " - " + product.name,
                    productCode: product.code
                }
            })
        }

        const _listConditions = data.andConditions?.["PRODUCT"]?.[combinationType].map(condition => ({
            productId: productMap[condition.productCode] ?? null,
            sellerCode: sellerMap[condition.sellerCode] ?? null,
            minQuantity: condition.minQuantity ?? 0,
            minTotalPrice: condition.minTotalPrice ?? 0,
            code: uuidv4()
        }))

        if (_listConditions.length > 0) data.listProductConditions = _listConditions
    }

    if (data.andConditions?.["PRODUCT_TAG"] && Object.keys(data.andConditions?.["PRODUCT_TAG"]).length !== 0) {

        let combinationType = ""
        if (data.andConditions?.["PRODUCT_TAG"]?.andConditions?.length > 0) {
            combinationType = "andConditions"
            listConditions.push({
                conditionType: "PRODUCT_TAG",
                combinationType: defaultCombinationCondition.and
            })
        }
        else {
            combinationType = "orConditions"
            listConditions.push({
                conditionType: "PRODUCT_TAG",
                combinationType: defaultCombinationCondition.or
            })
        }

        let sellerCodes = []
        let tagCodes = []
        data.andConditions?.["PRODUCT_TAG"]?.[combinationType].forEach(condition => {
            if (condition.tagSellerCode) sellerCodes.push(condition.tagSellerCode)
            if (condition.tagCode) tagCodes.push(condition.tagCode)
        })

        let tagMap = {}
        const tagResp = await tagClient.getTagByTagCodes(tagCodes)
        if (tagResp.status === "OK") {
            tagResp.data?.forEach(tag => {
                tagMap[tag.code] = {
                    label: tag.name,
                    value: tag.code
                }
            })
        }

        let sellerMap = {}
        const sellerResp = await sellerClient.getSellerBySellerCodes(sellerCodes)
        if (sellerResp.status === "OK") {
            sellerResp.data?.forEach(seller => {
                sellerMap[seller.code] = {
                    label: `${seller.code} - ${seller.name}`,
                    value: seller.code
                }
            })
        }

        const _listConditions = data.andConditions?.["PRODUCT_TAG"]?.[combinationType].map(condition => ({
            tagCode: tagMap[condition.tagCode] ?? null,
            sellerCode: sellerMap[condition.tagSellerCode] ?? null,
            minQuantity: condition.tagMinQuantity ?? 0,
            minTotalPrice: condition.tagMinTotalPrice ?? 0,
            code: uuidv4()
        }))

        if (_listConditions.length > 0) data.listTagConditions = _listConditions

    }

    data.listConditions = listConditions

    return data
}

export default function VoucherCondition(props) {
    const {
        useForm,
        disabled,
        isEdit,
        listOrderConditions,
        setListOrderConditions,
        listCustomerConditions,
        setListCustomerConditions,
        listTagConditions,
        setListTagConditions,
        listProductConditions,
        setListProductConditions,
        listConditions,
        handleChangeListConditions,
        promotion,
        isApplyNewPromo,
        voucherType
    } = props;

    const {
        getValues,
        register,
        setValue,
        setError,
        errors,
        formState: { isSubmitting, isSubmitted }
    } = useForm;


    const [openDialog, setOpenDialog] = useState(false)

    const [promotionConditionCodes, setPromotionConditionCodes] = useState([])
    const [voucherConditionCodes, setVoucherConditionCodes] = useState([])

    const handleAddCondition = (type) => {
        let newCondition = {
            conditionType: type,
            combinationType: defaultCombinationCondition.or
        }

        if (newCondition.conditionType === defaultCondition.product && voucherType === "GIFT") {
            newCondition.combinationType = defaultCombinationCondition.and
        }

        handleChangeListConditions([...listConditions, newCondition])
    }

    const handleChangeCondition = (indexValue, combinationType) => {
        let newList = [...listConditions]
        newList[indexValue] = {
            ...listConditions[indexValue],
            combinationType
        }
        handleChangeListConditions(newList)
    }

    const handleRemoveCondition = (index, type) => {
        let newList = [...listConditions].filter((_, indexValue) => indexValue !== index)
        handleChangeListConditions(newList)

        switch (type) {
            case defaultCondition.customer:
                setListCustomerConditions([{
                    minTotalPrice: null,
                    minDayNoOrder: null,
                    maxOrderCount: null,
                    code: uuidv4()
                }])
                break;
            case defaultCondition.order:
                setListOrderConditions([{
                    minTotalPrice: null,
                    code: uuidv4()
                }])
                break;

            case defaultCondition.product:
                setListProductConditions([{
                    sellerCode: null,
                    productId: null,
                    minQuantity: 1,
                    minTotalPrice: 0,
                    code: uuidv4()
                }])
                break;

            case defaultCondition.productTag:
                setListTagConditions([{
                    sellerCode: null,
                    tagCode: null,
                    minQuantity: 1,
                    minTotalPrice: 0,
                    code: uuidv4()
                }])
                break;

            default:
                break;
        }

    }

    const getConditionCodes = (conditions = {}) => {
        let codes = []
        if (conditions?.[defaultCondition.customer]) codes.push(defaultCondition.customer)
        if (conditions?.[defaultCondition.order]) codes.push(defaultCondition.order)
        if (conditions?.[defaultCondition.productTag]) codes.push(defaultCondition.productTag)
        if (conditions?.[defaultCondition.product]) codes.push(defaultCondition.product)
        return codes
    }

    useEffect(() => {
        setPromotionConditionCodes(getConditionCodes(promotion.andConditions))
    }, [promotion])

    useEffect(() => {
        setVoucherConditionCodes(listConditions.map(condition => condition.conditionType))
    }, [listConditions])

    return (
        <MyCard>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="ĐIỀU KIỆN ÁP DỤNG"
                ></MyCardHeader>
                <MyCardContent style={{ width: "100%" }}>
                    <Grid spacing={2} container style={{ width: "100%" }}>

                        {listConditions.length > 0 && listConditions?.map((item, index) => (
                            <ConditionScope
                                key={item.conditionType}
                                disabled={disabled}
                                listTagConditions={listTagConditions}
                                setListTagConditions={setListTagConditions}
                                isEdit={isEdit}
                                listOrderConditions={listOrderConditions}
                                setListOrderConditions={setListOrderConditions}
                                listCustomerConditions={listCustomerConditions}
                                setListCustomerConditions={setListCustomerConditions}
                                listProductConditions={listProductConditions}
                                setListProductConditions={setListProductConditions}
                                listConditions={listConditions}
                                conditionItem={item}
                                conditionIndex={index}
                                handleChangeCondition={handleChangeCondition}
                                isSubmitting={isSubmitting}
                                handleRemoveCondition={handleRemoveCondition}
                                isSubmitted={isSubmitted}
                                getValues={getValues}
                                setError={setError}
                                hookForm={useForm}
                                voucherType={voucherType}

                            />
                        ))}


                        {listConditions.length < 4 && (
                            <Grid item xs={12}>
                                <Button variant="outlined" color="primary" onClick={() => {
                                    setOpenDialog(true)
                                }}>Thêm loại điều kiện</Button>
                            </Grid>
                        )}

                        <Grid item md={6} xs={12}>
                            <Typography>
                                Mô tả điều kiện sử dụng
                            </Typography>

                            {!isApplyNewPromo && (
                                <RichTextField
                                    name="conditionDescription"
                                    getValue={getValues}
                                    setValue={setValue}
                                />
                            )}

                        </Grid>
                        <Grid item xs={12}>
                            {promotion.promotionId && promotion.rewardType !== "ALL" && !arrayEquals(promotionConditionCodes, voucherConditionCodes) && (
                                <FormHelperText error>*Bạn đang chọn loại điều kiện khác loại điều kiện của chương trình</FormHelperText>
                            )}
                        </Grid>

                    </Grid>

                    <AddConditionModal
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        onExcute={(data) => {
                            handleAddCondition(data)
                            setOpenDialog(false)
                        }}
                        selectedConditionType={listConditions.map(item => item.conditionType)}
                    />

                </MyCardContent>
            </FormGroup>
        </MyCard>
    )
}
