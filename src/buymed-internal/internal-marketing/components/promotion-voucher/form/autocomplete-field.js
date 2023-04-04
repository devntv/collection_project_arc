import { makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getAreaClient } from "client/area";
import { getCategoryClient } from "client/category";
import { getCustomerClient } from "client/customer";
import { getProducerClient } from "client/producer";
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";
import { getTagClient } from "client/tag";
import { getMasterDataClient } from "client/master-data";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { defaultCondition, defaultReward, defaultScope } from "components/promotion-voucher/constant";
import { displayNameBasedOnCondition } from "components/promotion-voucher/util";

async function searchProductList(q) {
  return await getProductClient().searchProductListFromClient(q, "");
}

async function searchCustomerList() {
  return await getCustomerClient().getLevel();
}

async function searchCategoryList(q) {
  return await getCategoryClient().getListCategoryFromClient(0, 20, q);
}

async function searchTagList(q) {
  return await getTagClient().getListTagClient(0, 50, "", q.trim());
}

async function searchGiftList(q) {
  const client = getProductClient();
  const productResp = await client.getProductList({ search: q });
  const productMap = productResp.data?.reduce((acc, cur) => {
    acc[cur.code] = cur;
    return acc;
  }, {}) ?? {};
  const skuResp = await client.getSkuList({ productCodes: Object.keys(productMap), q: JSON.stringify({ status: "GIFT" }) });
  skuResp.data?.forEach(({ code, productCode, sellerCode }, i) => {
    skuResp.data[i] = {
      code,
      name: `${productMap[productCode]?.name ?? productCode} - ${sellerCode}`
    };
  })
  return skuResp;
}

async function searchAreaList(q) {
  return await getAreaClient().getListArea(q);
}

async function getListProvinceClient(q) {
  return getMasterDataClient().getProvinceFromClient(0, 20, q);
}

async function searchProducerList(q) {
  return await getProducerClient().getProducerClient(q);
}

async function searchSellerList(q) {
  return await getSellerClient().getSellerClient(0, 50, JSON.stringify({ search: q.trim() }), "ACTIVE");
}

async function searchIngredientList(q) {
  return await getProductClient().getIngredientList(q);
}

const useStyles = makeStyles({
  inputRoot: {
    marginTop: "30px !important",
  },
});

const AutoCompleteField = (props) => {
  const classes = useStyles();
  const {
    label,
    options,
    defaultValue,
    placeholder,
    type,
    multiple,
    required,
    sellerQuantityType,
    name,
    useForm,
    disabled,
    condition,
    reward,
    arr,
    index,
  } = props;

  const { control, errors, getValues } = useForm;
  const [productList, setProductList] = useState(
    defaultValue ? defaultValue : []
  );

  const [ viewAll, setViewAll ] = useState(true)
  const validateDuplicateCondition = () => {
    let value = getValues();
    let status = "";
    let itemName = displayNameBasedOnCondition(value.condition) + index;
    if (value["seller" + index].length != 0 && value[itemName] != "") {
      let sellerString = "";
      let itemString = "";
      let objString = "";

      value["seller" + index]
        .sortBy("name")
        .map((seller) => (sellerString += JSON.stringify(seller)));
      itemString = JSON.stringify(value[itemName]);
      objString = sellerString + itemString;

      arr.map((_o, idx) => {
        let _itemName = displayNameBasedOnCondition(value.condition) + idx;

        let _sellerString = "";
        let _itemString = "";
        let _objString = "";

        if (
          value["seller" + idx].length != 0 &&
          value[_itemName] != "" &&
          idx != index
        ) {
          value["seller" + idx]
            .sortBy("name")
            .map((seller) => (_sellerString += JSON.stringify(seller)));
          _itemString = JSON.stringify(value[_itemName]);
          _objString = _sellerString + _itemString;

          if (objString == _objString) {
            status = "Điều kiện bị trùng lặp";
          }
        }
      });
    }

    return status == "" ? true : status;
  };

  const validateDuplicateGift = () => {
    let value = getValues();
    let status = "";
    if (value["gift" + index] != "") {
      let itemString = "";

      itemString = JSON.stringify(value["gift" + index]);

      arr.map((_o, idx) => {
        let _itemString = "";

        if (value["gift" + idx] != "" && idx != index) {
          _itemString = JSON.stringify(value["gift" + idx]);

          if (itemString == _itemString) {
            status = "Điều kiện bị trùng lặp";
          }
        }
      });
    }

    return status == "" ? true : status;
  };

  const fetchOptions = async (type, value) => {
    switch (type) {
      case defaultCondition.product:
        return await searchProductList(value);
      case defaultScope.area:
        const resArea = await searchAreaList(value)
        const resProvince = await getListProvinceClient(value)
        let area = []
        if (resArea && resArea.data) {
          area = resArea.data.filter(item => item.scope === "SALE_REGION")
          resArea.data = (area).concat(resProvince?.data || [])?.slice(0, 20)
        }
        return resArea;
      case defaultScope.customerLevel:
        return await searchCustomerList();
      case defaultCondition.productCategory:
        return await searchCategoryList(value);
      case defaultCondition.productTag:
        return await searchTagList(value);
      case defaultCondition.producer:
        return await searchProducerList(value);
      case defaultCondition.ingredient:
        return await searchIngredientList(value);
      case defaultReward.gift:
        return await searchGiftList(value);
      case "SELLER":
        return await searchSellerList(value);
      default:
        return { status: "ERROR" };
    }
  };

  const handleChangeTextField = async (event) => {
    let value = event.target.value;
    let res = await fetchOptions(type, value);
    if (res.status === "OK") {
      let arr = res.data;
      if (
        (multiple &&
          Array.isArray(value[name]) &&
          value[name].length > 0 &&
          value[name][0].name != "Chọn tất cả") ||
        (multiple && Array.isArray(value[name]) && value[name].length == 0)
      )
        arr.unshift({
          name: "Chọn tất cả",
        });
      setProductList(arr);
    } else {
      //setProductList([]);
    }
  };

  useEffect(() => {
    handleChangeTextField({ target: { value: "" } });
  }, [type]);

  useEffect(() => {
    if (sellerQuantityType && (sellerQuantityType === "MANY" || sellerQuantityType !== "Chọn tất cả") && sellerQuantityType !== "ALL") {
      setViewAll(false)
    }

     if (type == defaultReward.gift){
      setViewAll(false)
    }
  }, [])
  const renderOptions = () => {
    let codeList = [];
    let newArr = [];
    let _value = getValues();

    if (Array.isArray(_value[name])) {
      _value[name].map(({ code, name }) => {
        codeList.push(name == "Chọn tất cả" ? null : code);
      });
      newArr = productList.filter((val) => !codeList.includes(val.code));

      if (multiple && productList[0].name != "Chọn tất cả") {
        newArr.unshift({
          name: "Chọn tất cả",
        });
      }

      if (_value[name].length > 0 && _value[name][0].name == "Chọn tất cả") {
        newArr = newArr.filter((o) => o.name != "Chọn tất cả");
      }
      return newArr;
    }

    return productList;
  };

  const showSuggestedList = (event, value) => {
    let show = false
    //For seller
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item && item.name === "Chọn tất cả" && !item.sellerID) {
          show = true
        }
      })
      if (!show) {
        let tempObj = { target: { value: "" } }
        handleChangeTextField(tempObj)
      }
    }
    //For tagging, product,...
    else if (value && value.name !== "Chọn tất cả" && (value.tagID || value.sellerID)) {
      let tempObj = { target: { value: "" } }
      handleChangeTextField(tempObj)
    }
  }

  return (
    <Controller
      name={name}
      render={(render) => {
        return <Autocomplete
          noOptionsText="Không tìm thấy thông tin"
          disabled={disabled}
          fullWidth
          multiple={multiple}
          classes={{
            inputRoot: classes.inputRoot,
          }}
          options={productList.length > 0 ? (viewAll ? [] : renderOptions()) : options}
          onChange={(event, value) => {
            showSuggestedList(event, value)
            if (multiple) {
              let isAll = false;
              isAll = value.filter((o) => o.name == "Chọn tất cả");
              if (isAll.length > 0) {
                setViewAll(true)
                value = isAll;
              }
              else {
                setViewAll(false)
              }
            }
            render.onChange(value);
          }}
          getOptionSelected={(option, value) => option === value}
          getOptionLabel={(option) => (option?.name ? option.name : "")}
          value={render.value}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              required={required}
              {...params}
              InputLabelProps={{
                shrink: true,
                style: {
                  color: "#353434",
                  fontSize: "20px",
                },
              }}
              variant="standard"
              label={label}
              placeholder={placeholder}
              onChange={handleChangeTextField}
            />
          )}
        />
      }}
      rules={{
        validate: (d) => {
          if (required && (d == "" || (multiple && d.length == 0))) {
            return "Không được để trống";
          } else if (condition) {
            return validateDuplicateCondition();
          } else if (reward) {
            return validateDuplicateGift();
          }
        },
      }}
      control={control}
      defaultValue={defaultValue !== [] ? defaultValue : [{name: "Chọn tất cả"}]}
    />
  );
};

export default AutoCompleteField;
