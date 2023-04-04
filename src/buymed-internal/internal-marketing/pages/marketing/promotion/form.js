import {
  Button,
  FormGroup,
  ButtonGroup,
  CircularProgress,
	Typography,
} from "@material-ui/core";
import Head from "next/head";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getProductClient } from "../../../client/product";
import { getCategoryClient } from "../../../client/category";
import {
  defaultCondition,
  defaultPromotion,
  defaultPromotionType,
  defaultReward,
  defaultScope
} from "../../../components/promotion-voucher/constant";
import {
  formatUTCTime,
  onSubmitPromotion,
} from "../../../components/promotion-voucher/util";
import { useRouter } from "next/router";
import InfomationFields from "components/promotion-voucher/form/infomation-fields";
import ConditionFields from "components/promotion-voucher/form/condition-fields";
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { getCustomerClient } from "client/customer";
import { getTagClient } from "client/tag";
import { getAreaClient } from "client/area";
import { getProducerClient } from "client/producer";
import { getIngredientClient } from "client/ingredient";
import { getSellerClient } from "client/seller";
import { getPromoClient } from "client/promo";
import { getMasterDataClient } from "client/master-data";
import ModalCustom from "components/modal/dialogs";
import { formatDatetimeFormType } from "components/global";
import moment from "moment";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";

async function getListProductByIdsClient(q) {
  return getProductClient().getListProductByIdsClient(q);
}

async function getListCategoryByCodesClient(q) {
  return getCategoryClient().getListCategoryByCodesClient(q);
}

async function getProductTagByCodeClient(q) {
  return getTagClient().getTagByTagCodesClient(q);
}

async function getListAreaClient() {
  return getAreaClient().getListArea();
}

async function getListProvinceClient() {
  return getMasterDataClient().getProvinceFromClient(0, 100, "", true);
}

async function getListLevelClient() {
  return getCustomerClient().getLevel();
}

async function getListProducerByCodesClient(q) {
  return getProducerClient().getProducerByCodesClient(q);
}

async function getListSellerByCodesClient(q) {
  return getSellerClient().getSellerBySellerCodesClient(q);
}

async function getListIngredientByCodesClient(q) {
  return getIngredientClient().getIngredientByCodesClient(q);
}

function getRewardDefaultValues(rewards) {
  const data = {}
  if (rewards?.[0]?.type == defaultReward.gift) {
    rewards?.[0].gifts.forEach((gift, index) => {
      data["quantity" + index] = gift.quantity;
      data["gift" + index] = null;
    });
  }
  return data;
}

const PromotionForm = (props, type) => {
  let edit = type == "edit";
  if (edit && (!props.promotionRes?.promotionId || props.promotionRes?.promotionId === "")) return (
    <NotFound/>
  )
  
  const toast = useToast();

  const router = useRouter();

  const { promotionRes, createdBy } = props;

  const {
    description,
    endTime,
    startTime,
    publicTime,
    promotionName,
    promotionOrganizer,
    promotionType,
    conditions,
    rewards,
    scopes,
    status,
  } = promotionRes
      ? promotionRes
      : {
        description: "",
        endTime: formatDatetimeFormType(moment().add(1, "months")),
        startTime: formatDatetimeFormType(moment().add(1, "days")),
        publicTime: "",
        promotionName: "",
        promotionOrganizer: defaultPromotion.MARKETPLACE,
        promotionType: defaultPromotionType.VOUCHER_CODE,
        scopes: null,
        conditions: null,
        rewards: null,
        status: "ACTIVE",
      };

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      description: description,
      endTime: formatUTCTime(endTime),
      startTime: formatUTCTime(startTime),
      publicTime: formatUTCTime(publicTime),
      promotionName: promotionName,
      promotionOrganizer: promotionOrganizer,
      promotionType: promotionType,
      status: status == "ACTIVE" ? true : false,
      minOrderValue: conditions ? conditions[0].minOrderValue : null,
      minTotalOrder: conditions ? conditions[0].minTotalOrder : 0,
      maxTotalOrder: conditions ? conditions[0].maxTotalOrder : 0,
      minDaysNoOrder: conditions ? conditions[0].minDaysNoOrder : 0,
      // registeredBefore:
      //   scopes && scopes[0].registeredBefore
      //     ? formatUTCTime(scopes[0].registeredBefore)
      //     : new Date(),
      // registeredAfter:
      //   scopes && scopes[0].registeredAfter
      //     ? formatUTCTime(scopes[0].registeredAfter)
      //     : new Date(),
      percentageDiscount: rewards && rewards[0]?.percentageDiscount,
      absoluteDiscount: rewards && rewards[0]?.absoluteDiscount ? rewards[0].absoluteDiscount : 0,
      maxDiscount: rewards ? rewards[0].maxDiscount : 0,
      pointValue: rewards && rewards[0]?.pointValue,
      ...getRewardDefaultValues(rewards)
    },
  });

  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { dirtyFields }
  } = form;

  let disabled = edit && new Date() >= new Date(startTime);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [promotionId, setPromotionId] = useState(
    promotionRes ? promotionRes.promotionId : ""
  );

	const [openCopyDialog, setOpenCopyDialog] = useState(false);

  const [textField, setTextField] = useState({
    descriptionField: "",
    promotionOrganizer: "",
    promotionType: "",
  });

  const [scopeObject, setScopeObject] = useState([
    {
      selectField: defaultScope.customerLevel,
      //registeredBefore: new Date(),
      //registeredAfter: new Date(),
      list: [{ name: "Chọn tất cả" }],
    },
    {
      selectField: defaultScope.area,
      list: [{ name: "Chọn tất cả" }],
    },
  ]);

  const [conditionObject, setConditionObject] = useState({
    selectField:
      conditions && conditions[1] && conditions[1].type
        ? conditions[1].type
        : defaultCondition.noRule,
    minOrderValue: conditions && conditions[0].minOrderValue !== 0 ? conditions[0].minOrderValue : 0,
    minTotalValue: conditions && conditions[1].type === defaultCondition.noRule ? [] : (conditions && conditions[1] && conditions[1].productConditions && conditions[1].productConditions[0].minTotalValue !== 0 ? conditions[1].productConditions : []),
    quantityType: conditions && conditions[1].type === defaultCondition.noRule ? defaultCondition.noRule : (conditions && conditions[1] && conditions[1].productConditions ? conditions[1].productConditions : 0),
    seller: conditions && conditions[1].type === defaultCondition.noRule ? [{name: "Chọn tất cả"}] : (conditions && conditions[1] && conditions[1].productConditions[0].sellerCodes[0] !== "" ?  conditions[1].productConditions[0].sellerCodes : [{ name: "Chọn tất cả" }]),
    productList: !conditions
      ? [""]
      : conditions[1] && conditions[1].type == defaultCondition.noRule
        ? [""]
        : conditions[1] && conditions[1].productConditions?.map(() => ""),
    item: {},
    minQuantity: conditions  && conditions[1].type === defaultCondition.noRule ? defaultCondition.noRule : (conditions && conditions[1] && conditions[1].productConditions[0].minQuantity ? conditions[1].productConditions : 0),
  });

  const [rewardObject, setRewardObject] = useState({
    selectField: rewards && rewards[0].type ? rewards[0].type : "",
    percentageDiscount: "",
    maxDiscount: rewards && rewards[0].maxDiscount ? rewards[0].maxDiscount : 0,
    absoluteDiscount: rewards && rewards[0].absoluteDiscount ? rewards[0].absoluteDiscount : 0,
    attachedProduct:
      rewards && rewards[0]?.type == defaultReward.gift
        ? rewards[0].gifts.map(() => "")
        : {
          product: "",
          number: 0,
        },
    pointValue: ""
  });

  const handleChangeTextField = (key) => (event) => {
    setTextField({ ...textField, [key]: event.target.value });
  };

  const handleAddAttachedProduct = () => {
    rewardObject.attachedProduct.push("");
    setRewardObject({ ...rewardObject });
  };

  const handleRemoveAttachedProduct = (index) => {
    let value = getValues();
    for (let i = index; i < rewardObject.attachedProduct.length - 1; i++) {
      setValue("gift" + i, value["gift" + (i + 1)]);
      setValue("quantity" + i, value["quantity" + (i + 1)]);
    }
    rewardObject.attachedProduct.splice(index, 1);
    setRewardObject({ ...rewardObject });
  };

  const handleChangeRewardField = (key) => (event) => {
    if (event.target.value == defaultReward.gift) {
      rewardObject.attachedProduct = [""];
      setRewardObject({ ...rewardObject });
    }
    setRewardObject({ ...rewardObject, [key]: event.target.value });
  };

  const handleChangeConditionField = (key) => (event) => {
    conditionObject.productList = [""];
    conditionObject.seller = [{name: "Chọn tất cả"}]
    conditionObject.quantityType = "ALL"
    setConditionObject({ ...conditionObject, [key]: event.target.value });
  };

  const handleAddProductOfProductList = () => {
    conditionObject.productList.push("");
    setConditionObject({ ...conditionObject, seller: [{name: "Chọn tất cả"}] });
  };

  const handleRemoveProductOfProductList = (index) => {
    let value = getValues();
    for (let i = index; i < conditionObject.productList.length - 1; i++) {
      setValue("seller" + i, value["seller" + (i + 1)]);
      setValue("product" + i, value["product" + (i + 1)]);
      setValue("minQuantity" + i, value["minQuantity" + (i + 1)]);
      setValue("minTotalValue" + i, value["minTotalValue" + (i + 1)]);
    }
    conditionObject.productList.splice(index, 1);
    setConditionObject({ ...conditionObject });
  };

  const fillDefaultData = async () => {
    setIsLoadingPage(true);
    //---------- Scope ---------
    // ** CustomerLevel
    if (scopes[0].quantityType == "ALL") {
      setValue("customerLevel", [{ name: "Chọn tất cả" }]);
    } else {
      let arr = [];
      let res = await getListLevelClient();
      if (res?.status == "OK") {
        scopes[0].customerLevelCodes.map((code) =>
          arr.unshift(res.data.find((v) => v.code == code))
        );
        scopeObject[0].list = arr;
      }
    }

    // ** Area
    if (scopes[1].quantityType == "ALL") {
      setValue("area", [{ name: "Chọn tất cả" }]);
    } else {
      let arr = [];
      const res = await getListAreaClient();
      const resProvince = await getListProvinceClient()

      const data = (res?.data || []).concat(resProvince?.data || [])
      if (data) {
        scopes[1].areaCodes.map((code) =>
          arr.unshift(data.find((v) => v.code == code))
        );
        scopeObject[1].list = arr;
      } 
    }

    setScopeObject([...scopeObject]);
    //---------- Condition ---------
    conditions.map(async (o, index) => {
      if (o.type != defaultCondition.noRule && index != 0) {
        let res;
        o.productConditions.map(async (ob, i) => {
          // Handle Sellers, Quantity, Value
          if (ob.sellerQuantityType == "ALL") {
            setValue("seller" + i, [{ name: "Chọn tất cả" }]);
          } else {
            let response = await getListSellerByCodesClient(ob.sellerCodes);
            if (response?.status == "OK") {
              setValue("seller" + i, response.data);
            }
          }
          setValue("minQuantity" + i, ob.minQuantity);
          ob.minTotalValue ? setValue("minTotalValue" + i, ob.minTotalValue) : setValue("minTotalValue" + i, 0)

          // Handle Item
          switch (o.type) {
            case defaultCondition.product:
              res = await getListProductByIdsClient([ob.productId]);
              if (res?.status == "OK") {
                setValue("product" + i, res.data[0]);
              }
              break;
            case defaultCondition.productTag:
              res = await getProductTagByCodeClient([ob.productTag]);
              if (res?.status == "OK") {
                setValue("productTag" + i, res.data[0]);
              }
              break;
            case defaultCondition.productCategory:
              res = await getListCategoryByCodesClient([ob.categoryCode]);
              if (res?.status == "OK") {
                setValue("productCategory" + i, res.data[0]);
              }
              break;
            case defaultCondition.ingredient:
              res = await getListIngredientByCodesClient([ob.ingredientCode]);
              if (res?.status == "OK") {
                setValue("ingredient" + i, res.data[0]);
              }
              break;
            case defaultCondition.producer:
              res = await getListProducerByCodesClient([ob.producerCode]);
              if (res?.status == "OK") {
                setValue("producer" + i, res.data[0]);
              }
              break;
            default:
              break;
          }
        });
      }
    });

    //---------- Reward ---------
    /////////////////////////////
    if (rewards[0].type == defaultReward.gift) {
      rewards[0].gifts.map(async (gift, index) => {
        setValue("quantity" + index, gift.quantity);
        let res = await getProductClient().getSku({ q: JSON.stringify({ code: gift.sku }) });
        if (res.status != "OK") return;
        const sku = res.data[0];
        const productResp = await getProductClient().getProduct({ code: sku.productCode });
        const data = {
          code: sku.code,
          name: `${productResp.data?.[0]?.name} - ${sku.sellerCode}`,
        };
        setValue("gift" + index, data);
      });
    }
    setIsLoadingPage(false);
    return;
  };

  const parseCurrencyToInt = (currency) => {
    return parseInt(currency.slice(0, currency.length - 1).replaceAll('.',''))
  }
  const validateValues = (promotionObj) => {
    if (promotionObj.reward === "PERCENTAGE" && promotionObj.maxDiscount && parseCurrencyToInt(promotionObj.maxDiscount) < 1000) {
      return false
    }
    if (promotionObj.reward === "ABSOLUTE" && promotionObj.absoluteDiscount && parseCurrencyToInt(promotionObj.absoluteDiscount) < 1000) {
      return false
    }
    return true
  }

  const onSubmitUpdate = async () => {
    const isValid = validateValues(getValues())
    if (isValid) {
        setIsLoading(true);
        const hasChanges = Object.keys(dirtyFields).length > 0;
        if (!hasChanges) {
          toast.error("Không có thay đôi");
          setIsLoading(false);
          return
        }
        await onSubmitPromotion(
          getValues,
          toast,
          router,
          conditionObject,
          rewardObject,
          false,
          promotionId,
        );
      setIsLoading(false);
    }
  };

  const onSubmitCreate = async () => {
    const isValid = validateValues(getValues())
    if (isValid) {
      setIsLoading(true);
      let res = await onSubmitPromotion(
        getValues,
        toast,
        router,
        conditionObject,
        rewardObject,
        true,
        null,
      );
      if (res && res.status == "OK") {
        if (getValues().promotionType == defaultPromotionType.VOUCHER_CODE) {
          setPromotionId(res.data[0].promotionId);
          setOpenModal(true);
        } else {
          router.push("/marketing/promotion");
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (edit) fillDefaultData();
  }, []);

  const handleCopyData = async() => {
    const res = await getPromoClient().copyPromotion(promotionId);
		setOpenCopyDialog(false)
		if (res.status === "OK") {
		  toast.success("Nhân bản chương trình khuyến mãi thành công");
      window.location.href = `/marketing/promotion/edit?promotionId=${res.data[0].promotionId}`
		  return
		} 
		if(res?.message) toast.error(res.message || "Đã có lỗi xảy ra khi nhân bản");
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
        name: edit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi",
    },
]

  return (
    <AppMarketing select="/marketing/promotion" breadcrumb={breadcrumb}>
      <Head>
        <title>{edit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi"}</title>
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
        closeText = "Đóng"
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
              title={edit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi"}
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
          <MyCard>
            <FormGroup style={{ width: "100%" }}>
              <MyCardHeader
                small={true}
                title={edit ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi"}
              ></MyCardHeader>
              <MyCardContent>
                <InfomationFields
                  status={status}
                  disabled={disabled}
                  useForm={form}
                  textField={textField}
                  handleChangeTextField={handleChangeTextField}
                  createdBy={createdBy}
                />
              </MyCardContent>
            </FormGroup>
          </MyCard>
          <ConditionFields
            disabled={disabled}
            useForm={form}
            object={{ scopeObject, conditionObject, rewardObject }}
            handleSetConditionObject={setConditionObject}
            handleAddAttachedProduct={handleAddAttachedProduct}
            handleRemoveAttachedProduct={handleRemoveAttachedProduct}
            handleChangeTextField={handleChangeTextField}
            handleChangeConditionField={handleChangeConditionField}
            handleChangeRewardField={handleChangeRewardField}
            handleAddProductOfProductList={handleAddProductOfProductList}
            handleRemoveProductOfProductList={
              handleRemoveProductOfProductList
            }
          />
        </>
      )}
      {!isLoadingPage && (
        // <MyCardActions>
          <ButtonGroup>
            {edit &&
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
            ) : edit ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmitUpdate)}
                style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
              >
                Cập nhật
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmitCreate)}
                style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
              >
                Thêm chương trình khuyến mãi
              </Button>
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
				title="Thông báo"
				primaryText="Đồng ý"
				closeText="Thoát"
				open={openCopyDialog}
				onExcute={handleCopyData}
				onClose={() => {
					setOpenCopyDialog(false)
				}}
			>
				<Typography>Bạn xác nhận muốn nhân bản thông tin này qua phiếu mới không ?</Typography>
			</ModalCustom>
    </AppMarketing>
  );
};

export default PromotionForm;
