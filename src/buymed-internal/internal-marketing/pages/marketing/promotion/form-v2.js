import {
    Button,
    FormGroup,
    ButtonGroup,
    CircularProgress,
    Typography,
    Grid
} from "@material-ui/core";
import Head from "next/head";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import {
    defaultCondition,
    defaultPromotion,
    defaultPromotionType,
    defaultReward,
    defaultCombinationCondition,
    defaultScope,
    defaultPromotionRewardType,
    combinationConditionValue
} from "../../../components/promotion-voucher/constant";
import { useRouter } from "next/router";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { getPromoClient } from "client/promo";
import ModalCustom from "components/modal/dialogs";
import { formatDatetimeFormType, formatErrorMessage, uuidv4 } from "components/global";
import moment from "moment";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import PromotionInfo from "components/promotion-voucher/form-v2/PromotionInfo";
import TimePermissionSetting from "components/promotion-voucher/form-v2/TimeSetting";
import PromotionScope from "components/promotion-voucher/form-v2/PromotionScope";
import PromotionReward from "components/promotion-voucher/form-v2/PromotionReward";
import PromotionsConditions from "components/promotion-voucher/form-v2/PromotionsConditions";
import AuthorizationScreen from "components/authorization-screen";
import { formatEditorData, deepEqual, shallowEqual } from "utils/function";
import { defaultProductTagCondition, defaultOrderData, defaultCustomerCondition, defaultProductCondition } from "containers/voucher/ConditionScope";


const defaultListConditions = [
    {
        conditionType: defaultCondition.order,
        combinationType: defaultCombinationCondition.or
    },
    {
        conditionType: defaultCondition.customer,
        combinationType: defaultCombinationCondition.or
    }
]

const PromotionForm = (props, type) => {
    let isEdit = type == "edit";
    if (isEdit && (!props.promotionRes?.promotionId || props.promotionRes?.promotionId === "")) return (
        <NotFound />
    )

    const toast = useToast();

    const router = useRouter();

    const { promotionRes, createdBy, levelOpts, areaOpts } = props;

    const defaultValues = {
        description: "",
        conditionDescription: "",
        endTime: formatDatetimeFormType(moment().add(1, "months")),
        startTime: formatDatetimeFormType(moment().add(1, "days")),
        publicTime: formatDatetimeFormType(moment().add(1, "days")),
        promotionName: "",
        promotionOrganizer: defaultPromotion.MARKETPLACE,
        percentageDiscount: 0,
        absoluteDiscount: 0,
        maxDiscount: 0,
        pointValue: 0,
        customerLevelCodes: [{ value: "all", label: "Tất cả" }],
        customerScopes: [{ value: "all", label: "Tất cả" }],
        areaCodes: [{ value: "all", label: "Tất cả" }],
        rewardType: "ALL",
        point: null,
        promotionType: defaultPromotionRewardType.ALL,
        gift: null


    }

    const form = useForm({
        mode: "onChange",
        defaultValues: !isEdit ? defaultValues : {
            ...defaultValues,
            ...promotionRes,
            status: promotionRes.status == "ACTIVE" ? true : false,
            endTime: formatDatetimeFormType(promotionRes.endTime),
            startTime: formatDatetimeFormType(promotionRes.startTime),
            publicTime: formatDatetimeFormType(promotionRes.publicTime),
            gift: promotionRes.rewardType !== defaultReward.gift ? (promotionRes.listGifts?.[0]?.sku || null) : null
        },
    });

    const {
        getValues,
        setValue,
        handleSubmit,
        formState: { isSubmitting, dirtyFields }
    } = form;

    let disabled = isEdit && new Date() >= new Date(promotionRes.startTime);
    let isExpired = isEdit && promotionRes.status === "EXPIRED"

    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingPage, setIsLoadingPage] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [promotionId, setPromotionId] = useState(
        promotionRes ? promotionRes.promotionId : ""
    );

    const [openCopyDialog, setOpenCopyDialog] = useState(false);

    const [promotionType, setPromotionType] = useState(isEdit ? props.promotionRes.promotionType : defaultPromotionRewardType.ALL)

    const [listGifts, setListGifts] = useState((isEdit && promotionRes.listGifts) ? promotionRes.listGifts : [{
        sku: null,
        quantity: 1,
        code: uuidv4()
    }])

    const [listOrderConditions, setListOrderConditions] = useState([])
    const [listTagConditions, setListTagConditions] = useState([])
    const [listCustomerConditions, setListCustomerConditions] = useState([])
    const [listProductConditions, setListProductConditions] = useState([])

    const [listConditions, setListConditions] = useState((isEdit && promotionRes?.listConditions) ? promotionRes?.listConditions : defaultListConditions)

    const formatPrice = (value) => {
        let newValue = isNaN(value) ? 0 : Number(value)
        if (isNaN(value) && typeof value === "string") {
            let data = value?.replace("đ", "")
            data = data.replace(new RegExp(",", "g"), "")
            newValue = Number(data)
        }
        return newValue ?? 0
    }

    const formatPayload = (formData) => {
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

        let _conditions = {}

        if (promotionType !== defaultPromotionRewardType.ALL) {
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

            listConditions.forEach(item => {
                if (item.conditionType === defaultCondition.order) {
                    let orderConditions = []

                    listOrderConditions.forEach(condition => {
                        if (formatPrice(condition.minTotalPrice) > 0) {
                            orderConditions.push({
                                orderMinTotalPrice: formatPrice(condition.minTotalPrice)
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
                    let productTagConditions = listTagConditions?.map(condition => {
                        let _condition = {
                            tagMinTotalPrice: formatPrice(condition.minTotalPrice ?? 0),
                            tagMinQuantity: Number(condition.minQuantity ?? 0),
                            tagCode: condition.tagCode?.value
                        }

                        if (condition.sellerCode?.value) {
                            _condition.tagSellerCode = condition.sellerCode?.value || null
                        }
                        return _condition
                    })

                    if (productTagConditions.length > 0) {
                        _conditions[item.conditionType] = {}
                        _conditions[item.conditionType][combinationConditionValue[item.combinationType]] = productTagConditions
                    }
                }

                if (item.conditionType === defaultCondition.product) {
                    let productConditions = listProductConditions?.map(condition => {
                        let _condition = {
                            minTotalPrice: formatPrice(condition.minTotalPrice ?? 0),
                            minQuantity: Number(condition.minQuantity ?? 0),
                            productCode: condition.productId?.productCode || "",
                            productId: condition.productId?.value || 0
                        }

                        if (condition.sellerCode?.value) {
                            _condition.sellerCode = condition.sellerCode?.value || null
                        }
                        return _condition
                    })

                    if (productConditions.length > 0) {
                        _conditions[item.conditionType] = {}
                        _conditions[item.conditionType][combinationConditionValue[item.combinationType]] = productConditions
                    }
                }
            })
        }

        if (isEdit && Object.keys(_conditions).length === 0 && promotionRes.listConditions.length > 0) {
            promotionRes.listConditions.forEach(item => {
                _conditions[item.conditionType] = {}
            })
        }

        let conditionDescription = formatEditorData(formData.conditionDescription ?? "")
        conditionDescription === "" ? conditionDescription = "" : conditionDescription = formData.conditionDescription

        if (!isEdit) return {
            promotionName: formData.promotionName,
            promotionOrganizer: defaultPromotion.MARKETPLACE,
            promotionType: promotionType,
            startTime: new Date(formData.startTime).toISOString(),
            publicTime: formData.publicTime !== "" ? new Date(formData.publicTime).toISOString() : "",
            endTime: new Date(formData.endTime).toISOString(),
            scopes,
            description: formData.description,
            conditionDescription: conditionDescription,
            andConditions: _conditions,
            rewards,
        }

        Object.keys(formData).forEach((key) => {
            if (!dirtyFields[key]) delete formData[key];
        });

        let payload = {}
        if (promotionRes.promotionType !== promotionType) payload.promotionType = promotionType
        if (formData.promotionName) payload.promotionName = formData.promotionName
        if (formData.startTime) payload.startTime = new Date(formData.startTime).toISOString()
        if (formData.publicTime) payload.publicTime = new Date(formData.publicTime).toISOString()
        if (formData.endTime) payload.endTime = new Date(formData.endTime).toISOString()
        if (formData.description) payload.description = formData.description
        if (conditionDescription !== promotionRes.conditionDescription) payload.conditionDescription = conditionDescription
        if (formData.customerLevelCodes || formData.areaCodes || formData.customerScopes) payload.scopes = scopes
        if (formData.rewardType || !deepEqual(promotionRes.rewards?.[0] || {}, rewards?.[0] || {})) payload.rewards = rewards
        if (!deepEqual(promotionRes.andConditions, _conditions)) payload.andConditions = _conditions

        return payload
    }

    const checkIsDuplicate = () => {

        for (let i = 0; i < listProductConditions.length - 1; i++) {
            for (let j = i + 1; j <= listProductConditions.length - 1; j ++) {
                if (shallowEqual(listProductConditions[i], listProductConditions[j])) {
                    return true
                }
            }
        }

        for (let i = 0; i < listTagConditions.length - 1; i++) {
            for (let j = i + 1; j <= listTagConditions.length - 1; j ++) {
                if (shallowEqual(listTagConditions[i], listTagConditions[j])) {
                    return true
                }
            }
        }

        return false
    }

    const onSubmitUpdate = async (formData) => {
        let isDuplicate = checkIsDuplicate()
        if (isDuplicate) {
            toast.error("Điều kiện bị trùng")
            return
        }
        setIsLoading(true)
        const payload = formatPayload(formData)
        if (Object.keys(payload).length === 0) {
            setIsLoading(false)
            return toast.error("Không có sự thay đổi")
        }
        const resp = await getPromoClient().updatePromotion({ ...payload, promotionId })
        if (resp.status === "OK") {
            toast.success("Cập nhật chương trình khuyến mãi thành công")
            router.reload()
        }
        else toast.error(formatErrorMessage(resp))

        setIsLoading(false)
    };

    const onSubmitCreate = async (formData) => {
        let isDuplicate = checkIsDuplicate()
        if (isDuplicate) {
            toast.error("Điều kiện bị trùng")
            return
        }

        setIsLoading(true)
        const payload = formatPayload(formData)
        const resp = await getPromoClient().createPromotion({ ...payload, status: "ACTIVE" })
        if (resp.status === "OK") {
            toast.success("Tạo chương trình khuyến mãi thành công")
            setPromotionId(resp.data[0].promotionId);
            setOpenModal(true);
        } else toast.error(formatErrorMessage(resp))
        setIsLoading(false)
    };

    const handleCopyData = async () => {
        const res = await getPromoClient().copyPromotion(promotionId);
        setOpenCopyDialog(false)
        if (res.status === "OK") {
            toast.success("Nhân bản chương trình khuyến mãi thành công");
            window.location.href = `/marketing/promotion/edit?promotionId=${res.data[0].promotionId}`
            return
        }
        if (res?.message) toast.error(formatErrorMessage(res));
    }

    const handleResetCondition = () => {
        setListConditions(defaultListConditions)
        setListTagConditions([{ ...defaultProductTagCondition, code: uuidv4() }])
        setListCustomerConditions([defaultCustomerCondition])
        setListOrderConditions([defaultOrderData])
        setListProductConditions([{ ...defaultProductCondition, code: uuidv4() }])
    }

    const handleChangePromotionType = (type) => {      
        if (type === "GIFT") {
            let list = [...listConditions]
            let index = list.findIndex(item => item.conditionType === defaultCondition.product)
            list[index] = {
                conditionType: defaultCondition.product,
                combinationType: defaultCombinationCondition.and
            }
            setListConditions(list)
        }
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình",
            link: "/marketing/promotion"
        },
        {
            name: isEdit ? "Chỉnh sửa chương trình" : "Tạo chương trình",
        },
    ]

    useEffect(() => {
        if (isEdit && promotionRes?.listCustomerConditions) {
            setListCustomerConditions(promotionRes?.listCustomerConditions)
        } else {
            setListCustomerConditions([{
                minOrderCount: null,
                minDayNoOrder: null,
                maxOrderCount: null,
                code: uuidv4()
            }])
        }

        if (isEdit && promotionRes?.listOrderConditions) {
            setListOrderConditions(promotionRes?.listOrderConditions)
        } else {
            setListOrderConditions([{
                minTotalPrice: null,
                code: uuidv4()
            }])
        }

        if (isEdit && promotionRes?.listProductConditions) {
            setListProductConditions(promotionRes?.listProductConditions)
        } else {
            setListProductConditions([{
                sellerCode: null,
                productId: null,
                minQuantity: 1,
                minTotalPrice: 0,
                code: uuidv4()
            }])
        }

        if (isEdit && promotionRes?.listTagConditions) {
            setListTagConditions(promotionRes?.listTagConditions)
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

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/promotion" breadcrumb={breadcrumb}>
                <Head>
                    <title>{isEdit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi"}</title>
                </Head>
                <ModalCustom
                    title="Thông tin"
                    open={openModal}
                    onClose={(val) => {
                        setOpenModal(val);
                        router.push(`/marketing/promotion`);
                    }}
                    primaryText="Đồng ý"
                    onExcute={() =>
                        router.push(`/marketing/voucher/new?promotionId=${promotionId}`)
                    }
                    closeText="Đóng"
                >
                    <p>
                        Tạo khuyến mãi
                    </p>
                </ModalCustom>
                {isLoadingPage ? (
                    <MyCard>
                        <FormGroup style={{ width: "100%" }}>
                            <MyCardHeader
                                small={true}
                                title={isEdit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi"}
                            ></MyCardHeader>
                            <MyCardContent>
                                <center>
                                    <CircularProgress />
                                </center>
                            </MyCardContent>
                        </FormGroup>
                    </MyCard>
                ) : (
                    <>
                        <PromotionInfo
                            disabled={disabled}
                            useForm={form}
                            createdBy={createdBy}
                            isEdit={isEdit}
                            handleResetCondition={handleResetCondition}
                            setPromotionType={setPromotionType}
                            handleChangePromotionType={handleChangePromotionType}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TimePermissionSetting
                                    useForm={form}
                                    disabled={disabled}
                                    isEdit={isEdit}
                                />
                            </Grid>

                            <Grid item xs>
                                <PromotionScope
                                    useForm={form}
                                    disabled={disabled}
                                    levelOpts={levelOpts ?? []}
                                    areaOpts={areaOpts ?? []}
                                />
                            </Grid>
                        </Grid>

                        <PromotionsConditions
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
                            setListConditions={setListConditions}
                            promotionType={promotionType}
                        />

                        {promotionType !== defaultPromotionRewardType.ALL && (
                            <PromotionReward
                                disabled={disabled}
                                useForm={form}
                                setListGifts={setListGifts}
                                listGifts={listGifts}
                                isSubmitting={isSubmitting}
                                promotionRes={promotionRes}
                                isEdit={isEdit}
                                promotionType={promotionType}

                            />
                        )}

                    </>
                )}
                {!isLoadingPage && (
                    // <MyCardActions>
                    <ButtonGroup>
                        {isEdit &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setOpenCopyDialog(true)
                                }}
                                style={{ marginTop: 8, marginBottom: 8, marginRight: 16 }}
                            >
                                Nhân bản
                            </Button>
                        }

                        {isLoading ? (
                            <Button variant="contained" style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}>
                                <CircularProgress color="secondary" size={20} />
                            </Button>
                        ) : (
                            <ButtonGroup>
                                {isEdit && !isExpired && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit(onSubmitUpdate)}
                                        style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
                                    >
                                        Cập nhật
                                    </Button>
                                )}

                                {!isEdit && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit(onSubmitCreate)}
                                        style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
                                    >
                                        Thêm chương trình khuyến mãi
                                    </Button>
                                )}
                            </ButtonGroup>
                        )}

                        <Button
                            variant="contained"
                            style={{ margin: 8 }}
                            onClick={() => router.reload()}
                        >
                            Làm mới
                        </Button>
                    </ButtonGroup>

                    //</MyCardActions>
                )}
                <ModalCustom
                    title="Thông tin"
                    open={openModal}
                    onClose={(val) => {
                        setOpenModal(val);
                        router.push(`/marketing/promotion`);
                    }}
                    primaryText="Đồng ý"
                    onExcute={() =>
                        router.push(`/marketing/voucher/new?promotionId=${promotionId}`)
                    }
                    closeText="Đóng"
                >
                    <p>
                        Bạn có muốn tiếp tục tạo Mã khuyến mãi cho chương trình này không?
                    </p>
                </ModalCustom>

                <ModalCustom
                    title="Thông báo"
                    primaryText="Đồng ý"
                    closeText="Thoát"
                    open={openCopyDialog}
                    onExcute={handleCopyData}
                    onClose={() => {
                        setOpenCopyDialog(false)
                    }}
                >
                    <Typography>Bạn xác nhận muốn nhân bản chương trình này không ?</Typography>
                </ModalCustom>
            </AppMarketing>
        </AuthorizationScreen>
    )
};

export default PromotionForm;
