import { getPromoClient } from "client/promo";
import {
  defaultCondition,
  defaultNameRulesQuantity,
  defaultNameRulesValue,
  defaultPromotion,
  defaultPromotionRewardType,
  defaultPromotionStatus,
  defaultPromotionType,
  defaultReward,
  defaultRulePromotion,
  defaultScope,
  defaultTypeConditionsRule,
} from "./constant";

Array.prototype.sortBy = function (p) {
  return this.slice(0).sort(function (a, b) {
    return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
  });
};

export function currencyFormat(num) {
  return formatNumber(num) + "đ";
}

export function formatNumber(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function displayRule(rule) {
  let result = [];
  if (rule.field === defaultRulePromotion.MIN_QUANTITY) {
    let { conditions, field, type } = rule;
    conditions?.forEach((condition) => {
      if (type === defaultTypeConditionsRule.DISCOUNT_PERCENT) {
        result.push(
          `+ Giảm giá: ${condition.percent}% tối đa ${currencyFormat(
            condition.maxDiscountValue
          )}`
        );
        result.push(
          <div>
            &nbsp;&nbsp;&nbsp;Số lượng sản phẩm từ:{" "}
            {formatNumber(condition.minQuantity)}
          </div>
        );
      } else if (type === defaultTypeConditionsRule.DISCOUNT_ORDER_VALUE) {
        result.push(`+ Giảm giá: ${currencyFormat(condition.discountValue)}`);
        result.push(
          <div>
            &nbsp;&nbsp;&nbsp;Số lượng sản phẩm từ:{" "}
            {formatNumber(condition.minQuantity)}
          </div>
        );
      }
    });
  } else {
    let { conditions, field, type } = rule;
    conditions?.forEach((condition) => {
      if (type === defaultTypeConditionsRule.DISCOUNT_PERCENT) {
        result.push(`+ Giảm giá: ${condition.percent}%`);
        result.push(
          <div>
            &nbsp;&nbsp;&nbsp;Cho đơn hàng từ:{" "}
            {currencyFormat(condition.minOrderValue)}
          </div>
        );
      } else if (type === defaultTypeConditionsRule.DISCOUNT_ORDER_VALUE) {
        result.push(`+ Giảm giá: ${currencyFormat(condition.discountValue)}`);
        result.push(
          <div>
            &nbsp;&nbsp;&nbsp;Cho đơn hàng từ:{" "}
            {currencyFormat(condition.minOrderValue)}
          </div>
        );
      }
    });
  }

  return result;
}

export function formatTime(time) {
  if (!time || time === "") {
    return "Không giới hạn";
  }
  if (Number.isInteger(time)) {
    return new Intl.DateTimeFormat("vi", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(time * 1000));
  } else {
    if (time) {
      return new Intl.DateTimeFormat("vi", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(time));
    } else {
      return "Không xác định...";
    }
  }
}

export function formatUTCTime(time) {
  let result = "";
  let date = new Date(time);
  let year = date.getUTCFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? ("0" + (date.getMonth() + 1)).slice(-2)
      : date.getMonth() + 1;
  let day =
    date.getDate() < 10 ? ("0" + date.getDate()).slice(-2) : date.getDate();
  let hour =
    date.getHours() < 10 ? ("0" + date.getHours()).slice(-2) : date.getHours();
  let minute =
    date.getMinutes() < 10
      ? ("0" + date.getMinutes()).slice(-2)
      : date.getMinutes();
  result = year + "-" + month + "-" + day + "T" + hour + ":" + minute;
  return result;
}

export function compareTime(a, b) {
  let timeA = a.getTime();
  let timeB = b.getTime();

  if (timeA - timeB > 0) {
    return 1;
  } else if (timeB - timeA > 0) {
    return -1;
  }
  return 0;
}

export function getPromotionOrganizer(organizer) {
  let scope = "Không xác định";
  switch (organizer) {
    case defaultPromotion.COORPORATE:
      return "Chương trình hợp tác của 2 bên";
    case defaultPromotion.MARKETPLACE:
      return "Chương trình của riêng sàn";
    case defaultPromotion.SELLER:
      return "Nhà bán hàng";
  }
  return scope;
}

export function getPromotionScope(objects) {
  let scope = "Không xác định";
  objects?.forEach((obj) => {
    if (obj.scope) {
      scope = displayLabelBasedOnScope(obj.scope);
      return scope;
    }
  });
  return scope;
}

export function displayStatus(status) {
  switch (status) {
    case defaultPromotionStatus.WAITING:
      return "Chờ kích hoạt";
    case defaultPromotionStatus.ACTIVE:
      return "Đang chạy";
    case defaultPromotionStatus.FULL:
      return "Hết số lượng";
    case defaultPromotionStatus.DELETED:
      return "Đã xóa";
    case defaultPromotionStatus.EXPIRED:
      return "Hết hạn";
    default:
      return "Không xác định";
  }
}

export function displayTime(time) {
  return time?.substring(0, time.length - 4) || "";
}

export function displayPromotionType(type) {
  switch (type) {
    case defaultPromotionType.COMBO:
      return "Tự động áp dụng";
    case defaultPromotionType.FREESHIP:
      return "Miễn phí vận chuyển";
    case defaultPromotionType.VOUCHER_CODE:
      return "Thông qua mã khuyến mãi";
    default:
      return "Áp dụng cho đối tượng khách hàng";
  }
}

export function displayPromotionTypeV2(_type, promo = {}) {
  let type = _type
  if (type === "VOUCHERCODE") {
    type == "ALL"
    if (!!promo.rewards?.[0]?.type) {
      if (promo.rewards?.[0]?.type === "GIFT") {
        type = defaultPromotionRewardType.GIFT
      } else {
        type = defaultPromotionRewardType.DISCOUNT
      }
    }
  }

  switch (type) {
    case defaultPromotionRewardType.ALL:
      return "Tất cả";
    case defaultPromotionRewardType.DISCOUNT:
      return "Chương trình giảm giá";
    case defaultPromotionRewardType.GIFT:
      return "Chương trình quà tặng";
    default:
      return "Không xác định";
  }
}

export function displayLabelBasedOnScope(type) {
  switch (type) {
    case defaultScope.customerLevel:
      return "Áp dụng cho đối tượng khách hàng";
    case defaultScope.area:
      return "Khu vực áp dụng";
    default:
      return "";
  }
}

export function displayNameBasedOnScope(type) {
  switch (type) {
    case defaultScope.customerLevel:
      return "customerLevel";
    case defaultScope.area:
      return "area";
    default:
      return "";
  }
}

export function displayLabelBasedOnCondition(type) {
  switch (type) {
    case "PRODUCT_CATEGORY":
      return "Danh mục sản phẩm";
    case "PRODUCT":
      return "Tên sản phẩm";
    case "PRODUCER":
      return "Nhà sản xuất";
    case "INGREDIENT":
      return "Thành phần";
    case "PRODUCT_TAG":
      return "Tag sản phẩm";
    default:
      return "";
  }
}

export function displayNameBasedOnCondition(type) {
  switch (type) {
    case "PRODUCT_CATEGORY":
      return "productCategory";
    case "PRODUCT":
      return "product";
    case "PRODUCER":
      return "producer";
    case "INGREDIENT":
      return "ingredient";
    case "PRODUCT_TAG":
      return "productTag";
    default:
      return "";
  }
}

export function displayNameBasedOnReward(type) {
  switch (type) {
    case defaultReward.absolute:
      return "absolute";
    case defaultReward.gift:
      return "gift";
    case defaultReward.percentage:
      return "percentage";
    case defaultReward.point:
      return "point";
    default:
      break;
  }
}

export function limitText(text, size) {
  if (text?.length > size) {
    text = text.slice(0, size) + "...";
  }
  return text;
}

export const renderScopeOptionName = (option, index) => {
  let text = option + index;
  return text;
};

export const renderConditionVariableName = (option, variableName, index) => {
  let text = option + variableName + index;
  return text;
};

export function displayNameRule(promotionOption, nameValue, index) {
  switch (promotionOption) {
    case defaultRulePromotion.MIN_ORDER_VALUE:
      return defaultNameRulesValue[nameValue] + index;
    case defaultRulePromotion.MIN_QUANTITY:
      return defaultNameRulesQuantity[nameValue] + index;
  }
}

export function removeElement(array, elem) {
  let index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function displayUsage(usage) {
  if (usage === 0) {
    return "Không giới hạn";
  }
  return usage;
}

export function displayPromotionReward(type) {
  switch (type) {
    case defaultReward.absolute:
      return "Giảm giá tuyệt đối";
    case defaultReward.gift:
      return "Quà tặng";
    case defaultReward.point:
      return "Điểm thành viên";
    case defaultReward.precentage:
      return "Giảm giá theo %";
  }
}

export const checkRegisterdTime = (value) => {
  // if (value.registeredAfter != "" && value.registeredBefore != "") {
  //   console.log('registerdAfter ', value.registeredAfter)
  //   console.log('registeredBefore ', value.registeredBefore)
  //   return {
  //     registeredBefore: new Date(value.registeredBefore).toISOString(),
  //     registeredAfter: new Date(value.registeredAfter).toISOString(),
  //   };
  // }
  // if (value.registeredAfter != "") {
  //   return { registeredAfter: new Date(value.registeredAfter).toISOString() };
  // }
  // if (value.registeredBefore != "") {
  //   return {
  //     registeredBefore: new Date(value.registeredBefore).toISOString(),
  //   };
  // }
  // return;
};

export async function onSubmitPromotion(
  getValues,
  toast,
  router,
  conditionObject,
  rewardObject,
  isCreate,
  promotionId,
) {

  let value = getValues();
  if (!value.publicTime) value.publicTime = value.startTime;
  let isCustomerLevelAll =
    value.customerLevel.length == 0 ||
    value.customerLevel[0].name == "Chọn tất cả";
  let isAreaAll = value.area.length == 0 || value.area[0].name == "Chọn tất cả";
  let scopes = [
    {
      type: defaultScope.customerLevel,
      quantityType: isCustomerLevelAll ? "ALL" : "MANY",
      customerLevelCodes: isCustomerLevelAll
        ? []
        : value.customerLevel.map((o) => o.code),
      ...checkRegisterdTime(value),
    },
    {
      type: defaultScope.area,
      quantityType: isAreaAll ? "ALL" : "MANY",
      areaCodes: isAreaAll ? [] : value.area.map((o) => o.code),
    },
  ];

  const stringValue = value.minOrderValue.toString()
  let conditions = [
    {
      type: "ORDER_VALUE",
      minOrderValue: parseInt(stringValue.slice(0, stringValue.length - 1).replaceAll('.', '')),
      minTotalOrder: parseInt(value.minTotalOrder),
      maxTotalOrder: parseInt(value.maxTotalOrder),
      minDaysNoOrder: parseInt(value.minDaysNoOrder)
    },
  ];

  // if (value.condition == defaultCondition.noRule)
  //   conditions = [
  //     { type: value.condition, minOrderValue: parseInt(value.minOrderValue) },
  //   ];
  // else
  // if (value.condition != defaultCondition.noRule) {
  conditions.push({
    type: value.condition,
    productConditions:
      value.condition == defaultCondition.noRule
        ? []
        : conditionObject.productList.map((o, index) => {
          //const stringValue = conditionObject.minTotalValue[index].minTotalValue.toString() + "đ"
          //console.log('aaa ', conditionObject.minTotalValue[index].minTotalValue)
          const stringValue = value["minTotalValue" + index].toString()
          const minTotalValue = parseInt(stringValue.slice(0, stringValue.length - 1).replaceAll('.', ''))

          let sellerObject = {
            sellerCodes: value["seller" + index].map((seller) => seller.code),
            sellerQuantityType:
              value["seller" + index][0].name == "Chọn tất cả"
                ? "ALL"
                : "MANY",
            minQuantity: parseInt(value["minQuantity" + index]),
            minTotalValue: minTotalValue,
          };
          switch (value.condition) {
            case defaultCondition.ingredient:
              return {
                ...sellerObject,
                ingredientCode: value["ingredient" + index].code,
              };
            case defaultCondition.producer:
              return {
                ...sellerObject,
                producerCode: value["producer" + index].code,
              };
            case defaultCondition.product:
              return {
                ...sellerObject,
                productId: value["product" + index].productID,
              };
            case defaultCondition.productCategory:
              return {
                ...sellerObject,
                categoryCode: value["productCategory" + index].code,
              };
            case defaultCondition.productTag:
              return {
                ...sellerObject,
                productTag: value["productTag" + index].code,
              };
            default:
              break;
          }
        }),
  });
  // }

  let rewards;

  let stringValueOfReward, minTotalValueReward

  if (value.reward === defaultReward.percentage) {
    stringValueOfReward = value.maxDiscount.toString()
    minTotalValueReward = parseInt(stringValueOfReward.slice(0, stringValueOfReward.length - 1).replaceAll('.', ''))
  }
  else if (value.reward === defaultReward.absolute) {
    stringValueOfReward = value.absoluteDiscount.toString()
    minTotalValueReward = parseInt(stringValueOfReward.slice(0, stringValueOfReward.length - 1).replaceAll('.', ''))
  }
  switch (value.reward) {
    case defaultReward.absolute:
      rewards = [
        {
          type: value.reward,
          absoluteDiscount: minTotalValueReward,
        },
      ];
      break;
    case defaultReward.gift:
      rewards = [
        {
          type: value.reward,
          gifts: rewardObject.attachedProduct.map((o, index) => ({
            sku: value["gift" + index]?.code,
            quantity: parseInt(value["quantity" + index]),
          })),
        },
      ];
      break;
    case defaultReward.percentage:
      rewards = [
        {
          type: value.reward,
          percentageDiscount: parseInt(value.percentageDiscount),
          maxDiscount: minTotalValueReward,
        },
      ];
      break;
    case defaultReward.point:
      rewards = [
        {
          type: value.reward,
          pointValue: parseInt(value.pointValue),
        },
      ];
      break;
    default:
      break;
  }

  let checkTypeSubmit;
  if (!isCreate) {
    checkTypeSubmit = {
      promotionId: promotionId,
    };
  }

  let body = {
    ...checkTypeSubmit,
    promotionName: value.promotionName.trim(),
    promotionType: value.promotionType,
    promotionOrganizer: value.promotionOrganizer,
    description: value.description,
    startTime: new Date(value.startTime).toISOString(),
    publicTime: new Date(value.publicTime).toISOString(),
    endTime: new Date(value.endTime).toISOString(),
    status: value.status
      ? defaultPromotionStatus.ACTIVE
      : isCreate
        ? defaultPromotionStatus.WAITING
        : defaultPromotionStatus.HIDE,
    scopes,
    conditions,
    rewards,
  };

  let res;

  if (isCreate) res = await getPromoClient().createPromotion(body);
  else res = await getPromoClient().updatePromotion(body);

  if (res.status == "OK") {
    if (isCreate) {
      toast.success("Tạo chương trình khuyến mãi thành công");
      return res;
    } else {
      toast.success("Cập nhật chương trình khuyến mãi thành công");
      router.push("/marketing/promotion");
    }
  } else {
    toast.error(res.message);
  }
}
