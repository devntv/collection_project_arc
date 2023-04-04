import NotFound from '@thuocsi/nextjs-components/not-found/not-found';
import AuthorizationScreen from 'components/authorization-screen';
import { compareTime } from 'components/component/util';
import AppMarketing from 'pages/_layout';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Typography, Grid, ButtonGroup, Button, Tabs, Tab, AppBar, Box } from '@material-ui/core'
import { formatDatetimeFormType, formatErrorMessage } from "components/global";
import { deepEqual, formatEditorData, formatUTCTime, isAuthorizationAPI, isObject, shallowEqual } from 'utils/function';
import {
    defaultCondition,
    defaultPromotion,
    defaultPromotionType,
    defaultReward,
    defaultCombinationCondition,
    defaultScope,
    defaultPromotionStatus,
    defaultPromotionRewardType,
    CalculationType,
    combinationConditionValue
} from "../../../components/promotion-voucher/constant";
import { useRouter } from 'next/router';
import Head from "next/head";
import VoucherInfo from 'containers/voucher/VoucherInfo';
import VoucherTime from 'containers/voucher/VoucherTime';
import moment from 'moment';
import VoucherScope from 'containers/voucher/VoucherScope';
import VoucherCondition, { handleCondition } from 'containers/voucher/VoucherCondition';
import ApplicableCustomer from 'containers/voucher/ApplicableCustomer';
import VoucherReward, { handleReward } from 'containers/voucher/VoucherReward';
import { defaultCustomerCondition, defaultProductCondition, defaultProductTagCondition } from 'containers/voucher/ConditionScope';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { CustomerUsedTable } from 'containers/voucher/ListCustomerUsed';
import { getVoucherClient } from 'client/voucher';
import ApplicableSetting from 'containers/voucher/ApplicableSetting';
import { getCustomerClient } from 'client/customer';
import UnavailableCustomer from 'containers/voucher/UnavailableCustomer';
import LogUserVoucherActivity from 'containers/voucher/LogUserVoucherActivity';
import AutoApplyModal from 'containers/voucher/AutoApplyModal';
import { uuidv4 } from "components/global";
import { handleScope } from 'components/promotion-voucher/form-v2/PromotionScope';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const tabOpts = [
    {
        label: "Cài đặt khách hàng",
        value: "CUSTOMER-SETTING",
        index: 1
    },
    {
        label: "Lịch sử dùng mã",
        value: "CUSTOMER-USED",
        index: 2
    },
    {
        label: "Lịch sử cài đặt khách hàng",
        value: "CUSTOMER-LOG",
        index: 3
    },
]

const VoucherForm = (props, type) => {
    const { voucher = {}, promotionData = {}, listPromotionDefault = [], levelOpts, areaOpts, listCustomerDefault } = props
    const router = useRouter()
    const toast = useToast()
    const promotionId = router.query.promotionId ?? null

    let isEdit = type == "edit";
    if (isEdit && (!voucher?.code || voucher?.code === "")) return (
        <NotFound linkLabel="Trang chủ" />
    )

    let isViewOnly = isEdit && !isAuthorizationAPI(["PUT/marketplace/promotion/v1/voucher"]) && isAuthorizationAPI(["GET/marketplace/promotion/v1/view-voucher"])
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách mã khuyến mãi",
            link: "/marketing/voucher"
        },
        {
            name: isEdit ? "Chỉnh sửa mã khuyến mãi" : "Tạo mã khuyến mãi"
        },
    ]

    let disabled = isEdit && new Date() >= new Date(voucher.startTime);
    let isExpired = isEdit && voucher.status === "EXPIRED"

    let valueTab = 0

    switch (router.query.tab) {
        case "":
            valueTab = 0;
            break;
        case "CUSTOMER-SETTING":
            valueTab = 1;
            break;
        case "CUSTOMER-USED":
            valueTab = 2;
            break;
        case "CUSTOMER-LOG":
            valueTab = 3;
            break;
        default:
            valueTab = 0;
            break;
    }

    const [voucherType, setVoucherType] = useState(voucher?.rewardType === defaultReward.gift ? defaultPromotionRewardType.GIFT : defaultPromotionRewardType.DISCOUNT)
    const [openModal, setOpenModal] = useState(false)

    const [listGifts, setListGifts] = useState((isEdit && voucher?.listGifts) ? voucher?.listGifts : [{
        sku: null,
        quantity: 1,
        code: uuidv4()
    }])

    const [listOrderConditions, setListOrderConditions] = useState([])

    const [listTagConditions, setListTagConditions] = useState([])

    const [listCustomerConditions, setListCustomerConditions] = useState([])

    const [listProductConditions, setListProductConditions] = useState([])

    const [listConditions, setListConditions] = useState((isEdit && voucher?.listConditions) ? voucher?.listConditions : [
        {
            conditionType: defaultCondition.order,
            combinationType: defaultCombinationCondition.or
        },
        {
            conditionType: defaultCondition.customer,
            combinationType: defaultCombinationCondition.or
        }
    ])

    const [promotion, setPromotion] = useState(promotionData)
    const [isApplyNewPromo, setIsApplyNewPromo] = useState(false)
    const [rewardType, setRewardType] = useState(voucher?.rewardType || defaultReward.absolute)

    const defaultValues = {
        code: "",
        type: "PUBLIC",
        customerLevelCodes: [{ value: "all", label: "Tất cả" }],
        areaCodes: [{ value: "all", label: "Tất cả" }],
        customerScopes: [{ value: "all", label: "Tất cả" }],
        status: false,
        maxUsage: 0,
        maxUsagePerCustomer: 0,
        maxAutoApplyCount: 1,
        rewardType: defaultReward.absolute,
        percentageDiscount: 0,
        absoluteDiscount: 0,
        maxDiscount: 0,
        conditionDescription: "",
        displayName: "",
        startTime: formatDatetimeFormType(moment().add(1, "days")),
        endTime: formatDatetimeFormType(moment().add(1, "months")),
        publicTime: formatDatetimeFormType(moment().add(1, "days")),
        promotionId: "",
        voucherType: defaultPromotionRewardType.DISCOUNT,
        isSkipNextVoucher: false,
        applyType: "MANUAL",
        gift: null,
        calculationType: CalculationType.ORIGIN_PRICE,
        priority: null,
        customerApplyType: "ALL",
        customerCondition: {},
        orderCondition: {},
        tagCondition: {},
        productCondition: {}
    }

    const form = useForm({
        defaultValues: !isEdit ? defaultValues : {
            ...defaultValues,
            ...voucher,
            status: props.voucher.status === 'ACTIVE' ? true : false,
            startTime: formatDatetimeFormType(voucher.startTime),
            endTime: formatDatetimeFormType(voucher.endTime),
            publicTime: formatDatetimeFormType(voucher.publicTime),
            promotionId: voucher.promotionId ? promotion : "",
            customerScopes: voucher.customerScopes ?? [{ value: "all", label: "Tất cả" }],
            gift: voucher.rewardType !== defaultReward.gift ? (voucher.listGifts?.[0]?.sku || null) : null,
            usageTotal: voucher.usageTotal ?? 0,
            voucherType: voucher.rewardType === defaultReward.gift ? defaultPromotionRewardType.GIFT : defaultPromotionRewardType.DISCOUNT,
            applyType: voucher.applyType ?? "MANUAL",
            priority: voucher.priority === 0 ? null : voucher.priority
        },
        mode: 'onChange',
    });


    const {
        register, getValues, handleSubmit, setError, clearErrors, setValue, reset, errors, control, unregister, formState: {
            dirtyFields
        }
    } = form;

    const formatPrice = (value) => {
        let newValue = isNaN(value) ? 0 : Number(value)
        if (isNaN(value) && typeof value === "string") {
            let data = value?.replace("đ", "")
            data = data.replace(new RegExp(",", "g"), "")
            newValue = Number(data)
        }
        return newValue ?? 0
    }

    const formatCondition = (_conditions) => {
        listConditions.forEach(item => {
            if (item.conditionType === defaultCondition.order) {
                let orderConditions = []

                listOrderConditions.forEach(condition => {
                    if (formatPrice(condition.minTotalPrice ?? 0) > 0) {
                        orderConditions.push({
                            orderMinTotalPrice: formatPrice(condition.minTotalPrice ?? 0)
                        })
                    }
                })


                if (orderConditions.length > 0) {
                    _conditions[item.conditionType] = {}
                    _conditions[item.conditionType][combinationConditionValue[item.combinationType]] = orderConditions
                }
            }

            if (item.conditionType === defaultCondition.customer) {
                let customerConditions = []
                listCustomerConditions.forEach(condition => {
                    if ((condition?.maxOrderCount != null && condition?.maxOrderCount !== "" && Number(condition.maxOrderCount) >= 0) || (condition?.minOrderCount != null && condition?.minOrderCount !== "" && Number(condition.minOrderCount) >= 0) || (condition?.minDayNoOrder != null && condition?.minDayNoOrder !== "" && Number(condition.minDayNoOrder) > 0)) {
                        let newCondition = {}
                        if (condition?.maxOrderCount != null && condition?.maxOrderCount !== "" && Number(condition.maxOrderCount) >= 0) {
                            newCondition.maxOrderCount = Number(condition.maxOrderCount ?? 0)
                        }

                        if (condition?.minOrderCount != null && condition?.minOrderCount !== "" && Number(condition.minOrderCount) >= 0) {
                            newCondition.minOrderCount = Number(condition.minOrderCount ?? 0)
                        }

                        if (condition?.minDayNoOrder != null && condition?.minDayNoOrder !== "" && Number(condition.minDayNoOrder) > 0) newCondition.minDayNoOrder = Number(condition.minDayNoOrder)

                        customerConditions.push(newCondition)

                    }
                })

                if (customerConditions.length > 0) {
                    _conditions[item.conditionType] = {}
                    _conditions[item.conditionType][combinationConditionValue[item.combinationType]] = customerConditions
                }
            }

            if (item.conditionType === defaultCondition.productTag) {
                let productTagConditions = []
                listTagConditions?.forEach(condition => {
                    let _condition = {
                        tagMinTotalPrice: formatPrice(condition.minTotalPrice ?? 0),
                        tagMinQuantity: Number(condition.minQuantity ?? 0),
                        tagCode: condition.tagCode?.value
                    }

                    if (condition.sellerCode?.value) {
                        _condition.tagSellerCode = condition.sellerCode?.value || null
                    }

                    if (_condition.tagCode) return productTagConditions.push(_condition)

                })

                if (productTagConditions.length > 0) {
                    _conditions[item.conditionType] = {}
                    _conditions[item.conditionType][combinationConditionValue[item.combinationType]] = productTagConditions
                }
            }

            if (item.conditionType === defaultCondition.product) {
                let productConditions = []
                listProductConditions?.forEach(condition => {
                    let _condition = {
                        minTotalPrice: formatPrice(condition.minTotalPrice ?? 0),
                        minQuantity: Number(condition.minQuantity ?? 0),
                        productCode: condition.productId?.productCode || "",
                        productId: condition.productId?.value || 0
                    }

                    if (condition.sellerCode?.value) {
                        _condition.sellerCode = condition.sellerCode?.value || null
                    }

                    if (_condition.productId) productConditions.push(_condition)
                })

                if (productConditions.length > 0) {
                    _conditions[item.conditionType] = {}
                    _conditions[item.conditionType][combinationConditionValue[item.combinationType]] = productConditions
                }
            }
        })
        return _conditions
    }

    const formatPayload = (formData) => {
        let {
            code,
            maxUsage,
            maxUsagePerCustomer,
            maxAutoApplyCount,
            promotionId,
            startTime,
            endTime,
            publicTime,
            status,
            type,
            // isSkipNextVoucher,
            priority,
            applyType,
            customerApplyType,
            displayName
        } = formData;

        let payload = {
            code,
            maxUsage: parseInt(maxUsage),
            maxUsagePerCustomer: parseInt(maxUsagePerCustomer),
            maxAutoApplyCount: parseInt(maxAutoApplyCount ?? 1),
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            publicTime: new Date(publicTime).toISOString(),
            status: Boolean(status) === true ? defaultPromotionStatus.ACTIVE : defaultPromotionStatus.HIDE,
            type,
            promotionId: promotionId?.value ? promotionId.value : null,
            // isSkipNextVoucher: Boolean(isSkipNextVoucher),
            priority: priority ? parseInt(priority) : null,
            applyType: applyType ?? "MANUAL",
            customerApplyType,
            displayName
        }

        let isAllLevel = formData.customerLevelCodes?.[0]?.value === "all"
        let isAllArea = formData.areaCodes?.[0]?.value === "all";
        let isAllScope = formData.customerScopes?.[0]?.value === "all";

        let scopes = [
            {
                type: defaultScope.customerLevel,
                quantityType: isAllLevel ? "ALL" : "MANY",
                customerLevelCodes: isAllLevel
                    ? []
                    : formData.customerLevelCodes?.map(level => level.value)
            },
            {
                type: defaultScope.area,
                quantityType: isAllArea ? "ALL" : "MANY",
                areaCodes: isAllArea ? [] : formData.areaCodes?.map(area => area.value),
            },
            {
                type: defaultScope.customerScope,
                quantityType: isAllScope ? "ALL" : "MANY",
                customerScopes: isAllScope ? [] : formData.customerScopes?.map(scope => scope.value),
            }
        ];

        let rewards = []

        let gifts = []
        if (formData.gift?.value) {
            gifts = [{
                sku: formData.gift?.value || "",
                quantity: 1
            }]
        }

        switch (formData.rewardType) {
            case defaultReward.absolute_on_product:
            case defaultReward.absolute:
                rewards = [
                    {
                        type: formData.rewardType,
                        absoluteDiscount: formatPrice(formData.absoluteDiscount),
                        gifts
                    },
                ];
                break;
            case defaultReward.gift:
                rewards = [
                    {
                        type: formData.rewardType,
                        gifts: listGifts?.map((item) => ({
                            sku: item?.sku?.value || "",
                            quantity: parseInt(item?.quantity ?? 1),
                        })),
                    },
                ];
                break;
            case defaultReward.percentage_on_product:
            case defaultReward.percentage:
                rewards = [
                    {
                        type: formData.rewardType,
                        percentageDiscount: parseInt(formData.percentageDiscount),
                        maxDiscount: formatPrice(formData.maxDiscount),
                        gifts
                    },
                ];
                break;
            case defaultReward.point:
                rewards = [
                    {
                        type: formData.rewardType,
                        pointValue: parseInt(formData.pointValue),
                        gifts
                    },
                ];
                break;
            default:
                break;
        }

        let _conditions = formatCondition({})

        if (isEdit && Object.keys(_conditions).length === 0 && voucher?.listConditions.length > 0) {
            voucher?.listConditions.forEach(item => {
                _conditions[item.conditionType] = {}
            })
        }

        let conditionDescription = formatEditorData(formData.conditionDescription ?? "")
        conditionDescription === "" ? conditionDescription = "" : conditionDescription = formData.conditionDescription

        if (!isEdit) {
            return {
                ...payload,
                scopes,
                conditionDescription: conditionDescription,
                andConditions: _conditions,
                rewards,
            }
        }

        let payloadUpdate = {
            ...payload,
            scopes,
        }

        if (!!voucher.priority && !payloadUpdate.priority) {
            payloadUpdate.priority = 0
        }

        if (!!voucher.promotionId && !payloadUpdate.promotionId) {
            payloadUpdate.promotionId = 0
        }

        if (conditionDescription !== voucher?.conditionDescription) payloadUpdate.conditionDescription = conditionDescription
        if (!deepEqual(voucher?.rewards?.[0] || {}, rewards?.[0] || {})) payloadUpdate.rewards = rewards
        if (!deepEqual(voucher?.andConditions, _conditions)) payloadUpdate.andConditions = _conditions

        return payloadUpdate

    }

    const createNewVoucher = async (payload) => {
        const resp = await getVoucherClient().createVoucher(payload)
        if (resp && resp.status === 'OK') {
            toast.success("Tạo mã khuyến mãi thành công");
            router.push({
                pathname: `/marketing/voucher/edit`,
                query: {
                    voucherId: resp.data?.[0]?.voucherId || "",
                    tab: "CUSTOMER-SETTING"
                }
            })
        } else {
            toast.error(formatErrorMessage(resp));
        }
    }

    const updateVoucher = async (payload) => {
        const resp = await getVoucherClient().updateVoucher({ ...payload, voucherId: voucher.voucherId })
        if (resp && resp.status === 'OK') {
            toast.success("Cập nhật khuyến mãi thành công");
            router.reload();
        } else {
            toast.error(formatErrorMessage(resp));
        }
    }

    const checkIsValidCondition = () => {
        let isValid = true
        listConditions.forEach(item => {
            if (item.conditionType === defaultCondition.productTag) {
                isValid = false
            }

            if (item.conditionType === defaultCondition.product && item.combinationType !== defaultCombinationCondition.and) {
                isValid = false
            }
        })
        return isValid
    }

    const checkIsDuplicate = () => {

        for (let i = 0; i < listProductConditions.length - 1; i++) {
            for (let j = i + 1; j <= listProductConditions.length - 1; j++) {
                if (shallowEqual(listProductConditions[i], listProductConditions[j])) {
                    return true
                }
            }
        }

        for (let i = 0; i < listTagConditions.length - 1; i++) {
            for (let j = i + 1; j <= listTagConditions.length - 1; j++) {
                if (shallowEqual(listTagConditions[i], listTagConditions[j])) {
                    return true
                }
            }
        }

        return false
    }

    const onSubmit = async (formData) => {
        let isDuplicate = checkIsDuplicate()
        if (isDuplicate) {
            toast.error("Điều kiện bị trùng")
            return
        }

        if (getValues("applyType") === "AUTO" && voucherType === defaultPromotionRewardType.GIFT && !checkIsValidCondition()) {
            setOpenModal(true)
            return
        }
        let payload = formatPayload(formData)
        isEdit ? await updateVoucher(payload) : await createNewVoucher(payload)
    }

    const handleTabChange = (tab) => {
        if (isEdit) router.push({
            pathname: `/marketing/voucher/edit`,
            query: {
                ...router.query,
                tab
            }
        }, null, { shallow: true })
    };

    const handleSearchCustomer = async (text) => {
        let listCustomerResponse = await getCustomerClient().getCustomerFromClient(0, 10, JSON.stringify({ search: text }));
        if (listCustomerResponse && listCustomerResponse.status === "OK") {
            let listCustomer = [];
            listCustomerResponse.data.forEach((cusResponse) => {
                listCustomer.push({
                    ...cusResponse,
                    label: cusResponse.customerID + " - " + cusResponse.name + " - " + cusResponse.phone,
                    value: cusResponse.customerID
                });

            });
            return listCustomer
        }

        return []
    };

    const handleResetPromotionData = () => {
        setIsApplyNewPromo(true)
        clearErrors()
        reset({
            ...defaultValues
        })
        setValue("promotionId", "")
        setValue("status", false)
        register("conditionDescription")
        setValue("conditionDescription", "")
        setListTagConditions([{ ...defaultProductTagCondition, code: uuidv4() }])
        setListCustomerConditions([{ ...defaultCustomerCondition, code: uuidv4() }])
        setListOrderConditions([{
            minTotalPrice: null,
            code: uuidv4()
        }])
        setListProductConditions([{ ...defaultProductCondition, code: uuidv4() }])
        setListConditions([
            {
                conditionType: defaultCondition.order,
                combinationType: defaultCombinationCondition.or
            },
            {
                conditionType: defaultCondition.customer,
                combinationType: defaultCombinationCondition.or
            }
        ])
        setListGifts([{
            sku: null,
            quantity: 1,
            code: uuidv4()
        }])

        setVoucherType(defaultPromotionRewardType.DISCOUNT)
        setRewardType(defaultReward.absolute)
        setTimeout(() => {
            setIsApplyNewPromo(false)
        }, 10)
    }

    const handleApplyPromotionData = (data) => {
        if (data.promotionId) {
            setIsApplyNewPromo(true)
            clearErrors()
            let voucherCode = getValues("code") ?? ""
            let _voucherType = ""
            let _rewardType = ""
            // view
            if (data?.promotionType && data?.promotionType !== "ALL") {
                _voucherType = data?.promotionType
                setVoucherType(data?.promotionType)
                if (data.promotionType === defaultPromotionRewardType.DISCOUNT && data.rewardType === "ALL") {
                    _rewardType = defaultReward.absolute
                    setRewardType(defaultReward.absolute)
                }
            }
            else {
                // view
                if (data.rewardType === "ALL") {
                    _voucherType = defaultPromotionRewardType.DISCOUNT
                    _rewardType = defaultReward.absolute
                    setVoucherType(defaultPromotionRewardType.DISCOUNT)
                    setRewardType(defaultReward.absolute)
                }
            }

            if (data?.rewardType !== defaultReward.gift && data.listGifts?.length > 0) {
                setValue("gift", data.listGifts?.[0]?.sku || null)
            }

            if (data.rewardType && data.rewardType !== "ALL") {
                _rewardType = data.rewardType
                setRewardType(data.rewardType)
            }

            reset({
                ...defaultValues,
                ...voucher,
                code: voucherCode,
                usageTotal: voucher.usageTotal ?? 0,
                applyType: "MANUAL",
                promotionId: data,
                startTime: formatDatetimeFormType(data.startTime),
                endTime: formatDatetimeFormType(data.endTime),
                publicTime: formatDatetimeFormType(data.publicTime),
                customerLevelCodes: data.customerLevelCodes,
                areaCodes: data.areaCodes,
                customerScopes: data.customerScopes ?? [],
                percentageDiscount: data.percentageDiscount ?? 0,
                absoluteDiscount: data.absoluteDiscount ?? 0,
                maxDiscount: data.maxDiscount,
                pointValue: data.pointValue,
                conditionDescription: data.conditionDescription,
                displayName: data.description,
                voucherType: _voucherType,
                rewardType: _rewardType

            })
            register("conditionDescription")
            setValue("conditionDescription", data.conditionDescription)
            setListTagConditions(data.listTagConditions ?? [{ ...defaultProductTagCondition, code: uuidv4() }])
            setListCustomerConditions(data.listCustomerConditions ?? [{ ...defaultCustomerCondition, code: uuidv4() }])
            setListOrderConditions(data.listOrderConditions ?? [{
                minTotalPrice: null,
                code: uuidv4()
            }])
            setListProductConditions(data.listProductConditions ?? [{ ...defaultProductCondition, code: uuidv4() }])

            setListConditions(data.listConditions ?? [
                {
                    conditionType: defaultCondition.order,
                    combinationType: defaultCombinationCondition.or
                },
                {
                    conditionType: defaultCondition.customer,
                    combinationType: defaultCombinationCondition.or
                }
            ])

            if (data?.rewardType === defaultReward.gift) {
                setListGifts(data.listGifts ?? [{
                    sku: null,
                    quantity: 1,
                    code: uuidv4()
                }])
            }

            setIsApplyNewPromo(false)
        }
    }

    const handlePromotionScope = (data) => {
        return handleScope(data, levelOpts, areaOpts)
    }

    const handleChangeListConditions = (list) => {
        setListConditions(list)
    }

    const handleVoucherType = (type) => {
        if (type === "GIFT") {
            if (!(dirtyFields.customerCondition || dirtyFields.orderCondition || dirtyFields.customerCondition && dirtyFields.tagCondition || dirtyFields.productCondition)) {
                setListConditions([{
                    conditionType: defaultCondition.product,
                    combinationType: defaultCombinationCondition.and
                }])
            } else {
                let list = [...listConditions]
                let index = list.findIndex(item => item.conditionType === defaultCondition.product)
                if (index !== -1) {
                    list[index] = {
                        conditionType: defaultCondition.product,
                        combinationType: defaultCombinationCondition.and
                    }
                }
                setListConditions(list)
            }
        }
    }

    useEffect(() => {
        register("conditionDescription")
        if (isEdit) {
            setVoucherType(voucher?.rewardType === defaultReward.gift ? defaultPromotionRewardType.GIFT : defaultPromotionRewardType.DISCOUNT)
        }

        if (isEdit && voucher?.listCustomerConditions) {
            setListCustomerConditions(voucher?.listCustomerConditions)
        } else {
            setListCustomerConditions([{
                minOrderCount: null,
                minDayNoOrder: null,
                maxOrderCount: null,
                code: uuidv4()
            }])
        }

        if (isEdit && voucher?.listOrderConditions) {
            setListOrderConditions(voucher?.listOrderConditions)
        } else {
            setListOrderConditions([{
                minTotalPrice: null,
                code: uuidv4()
            }])
        }

        if (isEdit && voucher?.listProductConditions) {
            setListProductConditions(voucher?.listProductConditions)
        } else {
            setListProductConditions([{
                sellerCode: null,
                productId: null,
                minQuantity: 1,
                minTotalPrice: 0,
                code: uuidv4()
            }])
        }

        if (isEdit && voucher?.listTagConditions) {
            setListTagConditions(voucher?.listTagConditions)
        } else {
            setListTagConditions([{
                sellerCode: null,
                tagCode: null,
                minQuantity: 1,
                minTotalPrice: 0,
                code: uuidv4()
            }])
        }

    }, [])

    useEffect(() => {
        if (promotionId && promotionData) {
            handleApplyPromotionData(promotionData)
        }
    }, [promotionId])

    return (

        <AppMarketing select="/marketing/voucher" breadcrumb={breadcrumb}>

            <Head>
                <title>{isEdit ? "Chỉnh sửa mã khuyến mãi" : "Tạo mã khuyến mãi"}</title>
            </Head>

            <AuthorizationScreen>

                <Tabs
                    value={valueTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    <Tab
                        index={0}
                        label={`THÔNG TIN MÃ KHUYẾN MÃI`}
                        onClick={() => handleTabChange("")}
                    // {...a11yProps(0)}
                    />

                    {isEdit && tabOpts?.map((item) => (
                        <Tab
                            index={item.index}
                            label={item.label}
                            onClick={() => handleTabChange(item.value)}
                            {...a11yProps(item.index)}
                        />
                    ))}

                </Tabs>


                <TabPanel index={0} value={valueTab}>
                    <VoucherInfo
                        voucher={voucher}
                        promotion={promotion}
                        listPromotionDefault={listPromotionDefault}
                        errors={errors}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        isEdit={isEdit}
                        setVoucherType={setVoucherType}
                        handleResetPromotionData={handleResetPromotionData}
                        setPromotion={setPromotion}
                        handleApplyPromotionData={handleApplyPromotionData}
                        handlePromotionScope={handlePromotionScope}
                        handleVoucherType={handleVoucherType}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <VoucherTime
                                voucher={voucher}
                                promotion={promotion}
                                errors={errors}
                                control={control}
                                setValue={setValue}
                                getValues={getValues}
                                register={register}
                                isEdit={isEdit}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <VoucherScope
                                voucher={voucher}
                                promotion={promotion}
                                errors={errors}
                                control={control}
                                setValue={setValue}
                                getValues={getValues}
                                register={register}
                                clearErrors={clearErrors}
                                isEdit={isEdit}
                                levelOpts={levelOpts}
                                areaOpts={areaOpts}
                            />
                        </Grid>
                    </Grid>

                    <VoucherCondition
                        disabled={disabled}
                        useForm={form}
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
                        promotion={promotion}
                        handleChangeListConditions={handleChangeListConditions}
                        isApplyNewPromo={isApplyNewPromo}
                        voucherType={voucherType}
                    />

                    <ApplicableSetting
                        voucher={voucher}
                        promotion={promotion}
                        errors={errors}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        isEdit={isEdit}
                        voucherType={voucherType}
                        listConditions={listConditions}
                    />

                    <VoucherReward
                        disabled={disabled}
                        useForm={form}
                        setListGifts={setListGifts}
                        listGifts={listGifts}
                        promotion={promotion}
                        isEdit={isEdit}
                        voucherType={voucherType}
                        promotionData={promotionData}
                        isApplyNewPromo={isApplyNewPromo}
                        rewardType={rewardType}
                        setRewardType={setRewardType}
                    />


                    {!isExpired && (
                        <ButtonGroup>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: 8 }}
                                onClick={handleSubmit(onSubmit)}
                                disabled={isViewOnly}
                            >
                                {isEdit ? "Cập nhật" : "Thêm mã"}
                            </Button>
                        </ButtonGroup>
                    )}

                </TabPanel>

                {isEdit && (
                    <>
                        <TabPanel index={1} value={valueTab}>
                            <ApplicableCustomer
                                voucher={voucher}
                                defaultValues={defaultValues}
                                listCustomerDefault={listCustomerDefault}
                                handleSearchCustomer={handleSearchCustomer}
                                isViewOnly={isViewOnly}
                            />

                            <UnavailableCustomer
                                voucher={voucher}
                                defaultValues={defaultValues}
                                listCustomerDefault={listCustomerDefault}
                                handleSearchCustomer={handleSearchCustomer}
                                isViewOnly={isViewOnly}
                            />

                        </TabPanel>

                        <TabPanel index={2} value={valueTab}>
                            <CustomerUsedTable
                                code={voucher.code}
                                voucher={voucher}
                                promotion={promotion}
                                listCustomerDefault={listCustomerDefault}
                                handleSearchCustomer={handleSearchCustomer}
                            />
                        </TabPanel>

                        <TabPanel index={3} value={valueTab}>
                            <LogUserVoucherActivity
                                voucher={voucher}
                            />
                        </TabPanel>
                    </>
                )}

                <AutoApplyModal
                    open={openModal}
                    onExcute={setOpenModal}
                    onClose={setOpenModal}
                />
            </AuthorizationScreen>
        </AppMarketing>
    )
}

export default VoucherForm;