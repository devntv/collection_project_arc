import { Button, Grid, IconButton, TextField, FormGroup } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from '@material-ui/core/InputAdornment';
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { conditions, defaultCondition } from "components/promotion-voucher/constant";
import {
  displayLabelBasedOnCondition,
  displayNameBasedOnCondition,
} from "components/promotion-voucher/util";
import AutoCompleteField from "./autocomplete-field";
import { textfieldProps } from "./infomation-fields";
import SelectField from "./select-field";
import { NumberFormatCustom } from './custom-format'
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import cssStyle from "./promotion.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
      " .MuiTextField-root": {
          margin: theme.spacing(0),
      },
  },
  ".MuiInputBase-input": {
      fontWeight: "bold",
  },
}));

const Condition = (props) => {
  const classes = useStyles();

  const { condition, useForm, disabled } = props;

  const {
    handleChangeConditionField,
    handleAddProductOfProductList,
    handleRemoveProductOfProductList,
    handleSetConditionObject
  } = props;

  const { register, errors, control, getValues, setValue } = useForm;

  let { minOrderValue, productList, item, selectField, seller } = condition;
  let length = productList.length;
  const [formattedCurrency, setFormattedCurrency] = useState(condition.minOrderValue)
  const [listMinTotalValue, setListMinTotalValue] = useState(condition.minTotalValue)

  const [isError, setIsError] = useState(false)
  const [isMinTotalError, setIsMinTotalError] = useState(false)

  const handleChange = (e) => {
    setFormattedCurrency(parseInt(e.target.value))
  }

  const handleChangeMinTotalValue = (e, index) => {
    let clonedList = listMinTotalValue.map((objectItem, i) => {
      if (i === index) {
        objectItem.minTotalValue = parseInt(e.target.value)
      }
      return objectItem
    })
    setListMinTotalValue(clonedList)
  }

  useEffect(() => {
    if (selectField !== defaultCondition.noRule) {
      listMinTotalValue && listMinTotalValue.slice().map(item => {
        //console.log('item ', item.minTotalValue)
        if (item.minTotalValue && item.minTotalValue.toString().length >= 10) {
          setIsMinTotalError(true)
        }
        else {
          setIsMinTotalError(false)
        }
      })
    }
  }, [listMinTotalValue])

  useEffect(() => {
    if (formattedCurrency.toString().length >= 10) {
      setIsError(true)
    }
    else {
      setIsError(false)
    }
  }, [formattedCurrency])

  return (
    <MyCard>
      <FormGroup style={{ width: "100%" }}>
        <MyCardHeader
          small={true}
          title="Giá trị và điều kiện theo đơn hàng"
        >
        </MyCardHeader>
        <MyCardContent>
            <Grid container spacing={4} direction="column">
              <Grid item container spacing={4}>
                  <Grid item xs={6}>
                    <label className={cssStyle.titleLabelCondition}>
                      {"Giá trị nhỏ nhất của đơn hàng"}
                    </label>
                    <TextField
                      name="minOrderValue"
                      placeholder={"0đ"}
                      {...textfieldProps}
                      fullWidth
                      value={formattedCurrency}
                      helperText={isError ? "Không được vượt quá 10 kí tự" : null}
                      onChange={handleChange}
                      error={isError}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                      inputRef={register({})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label className={cssStyle.titleLabelCondition}>
                    Số ngày không đặt hàng
                      <Tooltip title="Khách hàng không đặt đơn theo số ngày quy định kể từ thời điểm hiện tại sẽ được áp dụng mã khuyến mãi">
                        <span>
                          <FontAwesomeIcon
                              icon={faExclamationCircle}
                              fontSize={6}
                              style={{marginLeft: "6px"}}
                          />
                        </span>
                      </Tooltip>
                    </label>
                    <TextField
                      type="number"
                      name="minDaysNoOrder"
                      placeholder={"0"}
                      {...textfieldProps}
                      fullWidth
                      InputProps={{
                        className: classes[".MuiInputBase-input"],
                        endAdornment: <InputAdornment position="end">Ngày</InputAdornment>,
                      }}
                      helperText={errors.minDaysNoOrder?.message}
                      error={!!errors.minDaysNoOrder}
                      inputRef={register({
                        validate: (value) => {
                          if (value < 0) {
                            return "Số ngày không được âm";
                          }
                        },
                        maxLength: {
                          value: 6,
                          message: "Số ngày không được vượt quá 6 kí tự",
                        }
                      })}
                    />
                  </Grid>
              </Grid>
              <Grid item container spacing={4}>
                  <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabelCondition}>
                    Số đơn hàng tối thiểu
                      <Tooltip title="Khách hàng có số đơn hàng = hoặc > quy định sẽ được áp dụng">
                        <span>
                          <FontAwesomeIcon
                              icon={faExclamationCircle}
                              style={{marginLeft: "6px"}}
                          />
                        </span>
                      </Tooltip>
                    </h5>
                    <TextField
                      type="number"
                      name="minTotalOrder"
                      placeholder={"0"}
                      {...textfieldProps}
                      fullWidth
                      helperText={errors.minTotalOrder?.message}
                      error={!!errors.minTotalOrder}
                      inputRef={register({
                        validate: (value) => {
                          if (value < 0) {
                            return "Số đơn hàng tối thiểu không được âm";
                          }

                        },
                        maxLength: {
                          value: 6,
                          message: "Số đơn hàng tối thiểu không được vượt quá 6 kí tự",
                        }
                      })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabelCondition}>
                    Số đơn hàng tối đa
                      <Tooltip title="Khách hàng có số đơn hàng = hoặc < quy định sẽ được áp dụng">
                        <span>
                          <FontAwesomeIcon
                              icon={faExclamationCircle}
                              style={{marginLeft: "6px"}}
                          />
                        </span>
                      </Tooltip>
                    </h5>
                    <TextField
                      type="number"
                      name="maxTotalOrder"
                      placeholder={"0"}
                      {...textfieldProps}
                      fullWidth
                      helperText={errors.maxTotalOrder?.message}
                      error={!!errors.maxTotalOrder}
                      inputRef={register({
                        validate: (value) => {
                          if (value < 0) {
                            return "Số đơn hàng tối đa không được âm";
                          }
                          const valuesOf = getValues()
                          if (parseInt(valuesOf.minTotalOrder) > parseInt(valuesOf.maxTotalOrder)) {
                            return "Số đơn hàng tối đa không được nhỏ hơn số đơn hàng tối thiểu"
                          }
                        },
                        maxLength: {
                          value: 6,
                          message: "Số đơn hàng tối đa không được vượt quá 6 kí tự",
                        }
                      })}
                    />
                  </Grid>
              </Grid>
              <Grid item xs={6}>
                  <SelectField
                    name="condition"
                    control={control}
                    errors={errors}
                    required={false}
                    handleChange={handleChangeConditionField("selectField")}
                    options={conditions}
                    value={selectField}
                    title="Loại điều kiện"
                    disabled={disabled}
                  />
              </Grid>
            </Grid>
            {selectField != "" && selectField != defaultCondition.noRule && (
              <Grid container key={selectField} spacing={4}>
                {productList.map((o, index) => (
                  <Grid item container xs={12} alignItems="flex-end" spacing={4} key={index}>
                      <Grid item container xs={4}>
                        <AutoCompleteField
                          useForm={useForm}
                          name={"seller" + index}
                          label="Người bán"
                          placeholder=""
                          required
                          multiple
                          sellerQuantityType={condition.quantityType === defaultCondition.noRule ? "ALL" : (condition.quantityType[index] ? condition.quantityType[index].sellerQuantityType : "ALL")}
                          defaultValue={condition.seller}
                          options={[{ name: "Chọn tất cả" }]}
                          type="SELLER"
                          disabled={disabled}
                          condition
                          arr={productList}
                          index={index}
                        />
                      </Grid>
                      <Grid item container xs={3}>
                        <AutoCompleteField
                          name={displayNameBasedOnCondition(selectField) + index}
                          label={displayLabelBasedOnCondition(selectField)}
                          placeholder=""
                          required
                          defaultValue={[]}
                          sellerQuantityType={"MANY"}
                          options={[{ name: "" }]}
                          type={selectField}
                          useForm={useForm}
                          disabled={disabled}
                          condition
                          arr={productList}
                          index={index}
                        />
                      </Grid>
                      <Grid item container xs={2}>
                        <TextField
                          type="number"
                          name={"minQuantity" + index}
                          label="Số lượng yêu cầu"
                          placeholder=""
                          defaultValue={condition && condition.minQuantity[index]
                                      ? condition.minQuantity[index].minQuantity
                                      : 1}
                          helperText={errors["minQuantity" + index]?.message}
                          {...textfieldProps}
                          InputProps={{
                            readOnly: disabled,
                          }}
                          fullWidth
                          error={!!errors["minQuantity" + index]}
                          required
                          inputRef={register({
                            min: {
                              value: 1,
                              message: "Số lượng tối thiểu 1",
                            },
                            maxLength: {
                              value: 10,
                              message: "Số lượng nhập không quá 10 ký tự",
                            },
                            required: "Số lượng không được trống",
                            validate: (value) => {
                              if (value % 1 != 0) return "Số lượng là số nguyên";
                            },
                          })}
                        />
                      </Grid>
                      <Grid item container xs={2}>
                        <TextField
                          name={"minTotalValue" + index}
                          label="Giá trị yêu cầu"
                          placeholder={"0đ"}
                          {...textfieldProps}
                          InputProps={{
                            readOnly: disabled,
                            inputComponent: NumberFormatCustom,
                          }}
                          value={listMinTotalValue[index] ? listMinTotalValue[index].minTotalValue : null}
                          helperText={isMinTotalError ? "Không được vượt quá 10 kí tự" : null}
                          onChange={e => handleChangeMinTotalValue(e,index)}
                          error={isMinTotalError}
                          fullWidth
                          inputRef={register({})}
                        />
                      </Grid>{" "}
                      {!disabled && length > 1 && (
                        <Grid item xs={1} container justify="center">
                          <IconButton
                            onClick={() => handleRemoveProductOfProductList(index)}
                          >
                            <Delete color="secondary" />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                ))}
                {!disabled && (
                  <Grid item container>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      color="primary"
                      onClick={handleAddProductOfProductList}
                    >
                      Thêm
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
        </MyCardContent>
      </FormGroup>
    </MyCard>
  );
};

export default Condition;
