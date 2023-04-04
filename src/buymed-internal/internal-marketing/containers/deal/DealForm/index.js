import { Button, Grid } from "@material-ui/core";
import {
    MyCard,
    MyCardActions,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getDealClient } from "client/deal";
import { getProductClient } from "client/product";
import { formatDatetimeFormType } from "components/global";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import { DealType, DealStatus } from "view-model/deal";
import DealInfo from "./DealInfo";
import DealPricing from "./DealPricing";
import DealSku from "./DealSku";
import DealTime from "./DealTime";
import DealScope from "./DealScope";
import ModalCustom from 'components/modal/dialogs';
import { SkuStatus } from "view-model/sku";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { isAuthorizationAPI } from "utils/function";

function DealForm(props) {
    const router = useRouter();
    const toast = useToast();
    const [code, setCode] = useState(props.deal?.code || "")

    if (props.isUpdate && !props.deal?.code) return (
        <NotFound linkAddress="/marketing/deal" />
    )
    const [isOpen, setIsOpen] = useState(false)
    const [skuOptions, setSkuOptions] = useState(props.skuOptions || [])
    const isLateUpdate = props.isUpdate && moment(props.deal?.startTime).isBefore(moment());
    const defaultValuesDealForm = useMemo(
        () => ({
            startTime: formatDatetimeFormType(moment().add(1, "d")),
            endTime: formatDatetimeFormType(moment().add(10, "d")),
            readyTime: null,
            name: "",
            slug: "",
            dealType: DealType.DEAL,
            description: "",
            tags: [],
            imageUrls: [],
            maxQuantity: 100,
            price: 10000,
            skus: [],
            sellerCode: "",
            comboLocationCodes: [],
            customerLevelCodes: [],
            areaCodes: [],
            autoOffSku: false,
            autoUpdateSku: false,
            autoUpdateDataSku: []
        }),
        [router.asPath]
    );
    const dealForm = useForm({
        defaultValues: props.isUpdate
            ? {
                ...props.deal,
                imageUrls: props.deal?.imageUrls ? props.deal.imageUrls : [],
                startTime: formatDatetimeFormType(props.deal?.startTime),
                endTime: formatDatetimeFormType(props.deal?.endTime),
                readyTime: formatDatetimeFormType(props.deal?.readyTime),
            }
            : defaultValuesDealForm,
        mode: "onChange",
    });
    useController({ control: dealForm.control, name: "skus" });
    const { formState: { dirtyFields } } = dealForm;
    const [isLoading, setIsLoading] = useState(false)
    let isViewOnly = props.isUpdate && !isAuthorizationAPI(["PUT/marketplace/product/v2/deal"])

    async function createOrUpdateDeal(formData) {
        let data = Object.assign({}, formData);

        if (formData.skus.length === 0) throw new Error("Vui lòng chọn sku.");

        let newSkus = formData.skus?.[0]?.skuItems?.filter(item => (item.status === SkuStatus.NORMAL || item.status === SkuStatus.LIMIT) && item.isActive)
        if (newSkus.length === 0) {
            throw new Error("Trạng thái sku con trong khu vực áp dụng không hợp lệ");
        }

        if (!isValidSku(newSkus)) {
            if (newSkus.length !== formData.skus?.[0]?.skuItems?.length) {
                throw new Error("Trạng thái sku con trong khu vực áp dụng không hợp lệ")
            }
            throw new Error("Sku không thuộc khu vực áp dụng");
        }

        let seller = data.skus[0]?.sku?.split(".");
        data.sellerCode = seller[0] ?? ""
        if (data.dealType === DealType.COMBO) {
            data.comboLocationCodes = data.comboLocationCodes?.map(({ value }) => value) ?? [];
            if (data.comboLocationCodes.length === 0) data.comboLocationCodes.push("00");
        }
        data.startTime = moment(formData.startTime).toISOString();
        data.endTime = moment(formData.endTime).toISOString();
        data.readyTime = moment(
            formData.readyTime || formData.startTime
        ).toISOString();
        data.owner = "MARKETPLACE";

        data.customerLevelCodes = formData.customerLevelCodes.map(x => x.value);
        data.areaCodes = formData.areaCodes.map(x => {
            if (x.value === "ALL") {
                x.value = "00"
            }
            return x.value
        });

        let autoUpdateDataSku = []
        formData.autoUpdateDataSku?.forEach(item => {
            if (item.skuItemCode?.value && item.skuItemCode?.value !== "") {
                let newItem = {
                    skuItemCode: item.skuItemCode?.value || "",
                }

                if (item.nextStatus === "OFF_SKU") {
                    newItem.isInActive = true
                }
                else {
                    newItem.nextStatus = item.nextStatus
                }

                autoUpdateDataSku.push(newItem)
            }
        })

        if (autoUpdateDataSku.length !== (formData.autoUpdateDataSku?.length || 0)) throw new Error("Vui lòng chọn sku.");

        data.autoUpdateDataSku = autoUpdateDataSku

        if (data.areaCodes.length === 0) data.areaCodes = ["00"]
        if (data.customerLevelCodes.length === 0) data.customerLevelCodes = ["ALL"]

        const hasChanges = Object.keys(dirtyFields).length > 0;
        const dealClient = getDealClient();
        let resp;
        if (props.isUpdate) {
            if (!hasChanges || (hasChanges && dirtyFields.length === 1 && dirtyFields["status"] === props.deal.status)) {
                throw new Error("Không có cập nhật thêm");
            }
            // filter unchanged fields
            Object.keys(data).forEach((key) => {
                if (!dirtyFields[key]) delete data[key];
            });
            resp = await dealClient.updateDeal({ code: props.deal?.code, ...data });
        } else {
            resp = await dealClient.createDeal({ ...data });
            if (resp.status === "OK" && resp.data && resp.data.length) {
                setCode(resp.data[0].code)
            }
        }
        if (resp.status !== "OK") {
            throw new Error(resp.message);
        }
        return resp.data ? resp.data[0] : { code: props.deal?.code };
    }

    const handleSubmitDealForm = async (formData) => {
        try {
            setIsLoading(true)
            await createOrUpdateDeal(formData);
            toast.success(
                props.isUpdate ? "Cập nhật deal thành công" : "Tạo deal thành công"
            );
            if (!props.isUpdate) {
                setIsOpen(true)
                return
            }
            setIsLoading(false)
            router.reload()
        } catch (e) {
            toast.error(e.message);
            setIsLoading(false)
        }
    };

    const handleUpdateStatus = async () => {
        setIsOpen(false)
        const dealClient = getDealClient();

        try {
            const resp = await dealClient.updateDeal({ code, status: DealStatus.ACTIVE });
            if (resp.status !== "OK") {
                throw new Error(resp.message);
            }
            toast.success("Cập nhật deal thành công");
            setIsOpen(false)
            router.push("/marketing/deal");
        } catch (e) {
            toast.error(e.message);
            router.push({
                pathname: "/marketing/deal/edit",
                query: {
                    dealCode: code,
                },
            });
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        router.push({
            pathname: "/marketing/deal/edit",
            query: {
                dealCode: code,
            },
        });
    }

    const SkuIsActive = {
        [true]: "Đang hoạt động",
        [false]: "Không hoạt động",
    }

    const searchSkus = async (text, normalOnly = false, locations, isChangeScope = false) => {
        const productClient = getProductClient();
        let listMapProductSku = {};
        const skuMap = {}

        let skusResp = await productClient.getSkuMainList({
            search: text,
            q: normalOnly ? JSON.stringify({ type: SkuType.NORMAL }) : undefined,
            locationCodes: locations
        });
        if (skusResp.status !== "OK") {
            if (skusResp.status === "NOT_FOUND") {
                if (isChangeScope) setSkuOptions([])
                return [];
            } else {
                toast.error(skusResp.message ?? "Lỗi không xác định");
            }
            if (isChangeScope) setSkuOptions([])
            return [];
        }

        const skus = skusResp.data?.map(item => {
            skuMap[item.code] = item.skuItems ?? []
            return item.code
        }) || []

        // Get data product
        const productResp = await productClient.getProductListByFilterFromClient({
            skus,
            getProduct: true
        });

        if (productResp.status === "OK") {
            productResp.data?.forEach((prd) => {
                if (prd && prd.product) {
                    listMapProductSku[prd.product.code] = prd.product || {};
                }
            });
        }

        // Map data to options
        let lstOptions = [];
        skusResp.data?.forEach(
            ({ code, productCode, sellerCode, isActive }) => {
                let label = listMapProductSku[productCode]?.name ?? code;
                label += ` - ${code} - ${SkuIsActive[isActive]}`;
                if (code && productCode && sellerCode) {
                    lstOptions.push({
                        sku: code ?? "",
                        value: code ?? "",
                        sellerCode,
                        product: listMapProductSku[productCode],
                        label,
                        isActive,
                        skuItems: skuMap[code] ?? []
                    });
                }
            }
        );
        if (isChangeScope) setSkuOptions(lstOptions)
        return lstOptions;
    }

    const isValidSku = (skuItems) => {
        let skuLocations = [], skuLocationMap = {}, locations = [], flag = false
        skuItems?.forEach(item => {
            if (item.locationCodes.find(code => code === "00")) flag = true
            skuLocations = skuLocations.concat(props.regionMap[item.locationCodes] || item.locationCodes)
        })

        skuLocations?.forEach(element => {
            skuLocationMap[element] = element
        });

        dealForm.watch().areaCodes?.forEach(item => {
            locations.push(item.value)

            if (item.value === "ALL" || item.value === "00") {
                flag = true
            }
            if (props.regionMap[item.value]) {
                locations = locations.concat(props.regionMap[item.value] || item.value)
            }
        })

        if (flag) {
            return true
        }

        return locations?.find(element => skuLocationMap[element]) ?? false
    }

    return (
        <FormProvider {...dealForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <DealInfo
                        isUpdate={props.isUpdate}
                        isLateUpdate={isLateUpdate}
                        deal={props.deal}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DealTime
                        isUpdate={props.isUpdate}
                        defaultValues={defaultValuesDealForm}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DealPricing
                        deal={props.deal}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DealScope
                        isUpdate={props.isUpdate}
                        deal={props.deal}
                        defaultValues={defaultValuesDealForm}
                        searchSkus={searchSkus}
                    />
                </Grid>

                <Grid item xs={12}>
                    <DealSku
                        isUpdate={props.isUpdate}
                        isLateUpdate={isLateUpdate}
                        deal={props.deal}
                        skuOptions={skuOptions}
                        defaultValues={defaultValuesDealForm}
                        areaMap={props.areaMap}
                        searchSkus={searchSkus}
                    />
                </Grid>

                <Grid item xs={12}>
                    <MyCard>
                        <MyCardActions>
                            <Link href="/marketing/deal">
                                <Button variant="contained">Quay lại</Button>
                            </Link>
                            {!isViewOnly && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={dealForm.handleSubmit(handleSubmitDealForm)}
                                    disabled={isLoading}
                                >
                                    Lưu
                                </Button>
                            )}
                        </MyCardActions>
                    </MyCard>
                </Grid>
                <ModalCustom
                    open={isOpen}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    closeText="Đóng"
                    onClose={handleClose}
                    onExcute={handleUpdateStatus}
                >
                    Bạn có muốn <strong> bật</strong> trạng thái của <strong>{dealForm.getValues()?.name}</strong> không?
                </ModalCustom>
            </Grid>
        </FormProvider>
    );
}

export default DealForm;
