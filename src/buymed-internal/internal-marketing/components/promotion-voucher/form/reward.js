import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  FormGroup
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { rewards } from "components/promotion-voucher/constant";
import AutoCompleteField from "./autocomplete-field";
import { textfieldProps } from "./infomation-fields";
import SelectField from "./select-field";
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { NumberFormatCustom } from './custom-format'

const Reward = (props) => {
  const { reward, useForm, disabled } = props;

  const {
    handleChangeRewardField,
    handleAddAttachedProduct,
    handleRemoveAttachedProduct,
  } = props;

  const { register, errors, control, getValues, setValue } = useForm;

  const { selectField, attachedProduct } = reward;

  let length = attachedProduct.length;
  const [maxDiscount, setMaxDiscount] = useState(reward.maxDiscount)
  const [absolute, setAbsolute] = useState(reward.absoluteDiscount)
  const [isMinError, setIsMinError] = useState(false)
  const [isMaxLengthError, setIsMaxLengthError] = useState(false)
  const [isRequiredError, setIsRequiredError] = useState(false)
  const [isAbsoluteMinError, setIsAbsoluteMinError] = useState(false)
  const [isAbsoluteLengthError, setIsAbsoluteLengthError] = useState(false)

  useEffect(() => {
    if (!isMinError && !isMaxLengthError && !isRequiredError && !isAbsoluteLengthError && !isAbsoluteMinError) {
      if (selectField === "PERCENTAGE") {
        setAbsolute(0)
        handleRewardError(maxDiscount, selectField)
      }
      else if (selectField === "ABSOLUTE") {
        setMaxDiscount(0)
        handleRewardError(absolute, selectField)
      }
      setIsMinError(false)
      setIsMaxLengthError(false)
      setIsRequiredError(false)
      setIsAbsoluteMinError(false)
      setIsAbsoluteLengthError(false)
    }
    else if (selectField === "PERCENTAGE") {

      setIsAbsoluteMinError(false)
      setIsAbsoluteLengthError(false)
      setIsRequiredError(false)
      handleRewardError(maxDiscount, selectField)
    }
    else if (selectField === "ABSOLUTE") {

      setIsMinError(false)
      setIsMaxLengthError(false)
      setIsRequiredError(false)
      handleRewardError(absolute, selectField)
    }
  }, [handleChangeRewardField])

  const handleChangeMaxDiscount = (e) => {
    setMaxDiscount(e.target.value)
  }
  useEffect(() => {
    if (selectField === "ABSOLUTE") return
    handleRewardError(maxDiscount, selectField)
  }, [maxDiscount])

  const onAbsoluteChange = (e) => {
    setAbsolute(e.target.value)
  }
  useEffect(() => {
    if (selectField === "PERCENTAGE") return
    handleRewardError(absolute, selectField)
  }, [absolute])

  const handleRewardError = (rewardValue, type) => {
    if (type === "ABSOLUTE") {
      if (rewardValue < 1000) {
        setIsAbsoluteMinError(true)
        setIsAbsoluteLengthError(false)
      }
      else if (rewardValue.toString().length >= 10) {
        setIsAbsoluteMinError(false)
        setIsAbsoluteLengthError(true)
      }
      else if (rewardValue >= 1000 && rewardValue.toString().length < 10) {
        setIsAbsoluteMinError(false)
        setIsAbsoluteLengthError(false)
      }
    }
    else {
      if (rewardValue < 1000) {
        setIsMinError(true)
        setIsMaxLengthError(false)
        setIsRequiredError(false)
      }
      else if (rewardValue.toString().length >= 10) {
        setIsMinError(false)
        setIsMaxLengthError(true)
        setIsRequiredError(false)
      }
      else if (rewardValue === null) {
        setIsMinError(false)
        setIsMaxLengthError(false)
        setIsRequiredError(true)
      }
      else if (rewardValue && rewardValue >= 1000 && rewardValue.toString().length < 10) {
        setIsMinError(false)
        setIsMaxLengthError(false)
        setIsRequiredError(false)
      }
    }
  }
  return (
    <MyCard>
      <FormGroup style={{ width: "100%" }}>
        <MyCardHeader
          small={true}
          title="Giá trị và điều kiện giảm giá"
        >
        </MyCardHeader>
        <MyCardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SelectField
                name="reward"
                control={control}
                disabled={disabled}
                errors={errors}
                handleChange={handleChangeRewardField("selectField")}
                options={rewards}
                value={selectField}
                title="Loại điều kiện áp dụng"
                option="reward"
              />
            </Grid>
            {selectField != "" &&
              (selectField == "ABSOLUTE" || selectField == "POINT" ? (
                selectField == "ABSOLUTE" ?
                <Grid item xs={5} key={selectField}>
                  <TextField
                    value={absolute}
                    onChange={onAbsoluteChange}
                    name="absoluteDiscount"
                    label="Giá trị giảm tuyệt đối"
                    placeholder="0đ"
                    helperText={isAbsoluteMinError ? "Giá trị giảm tuyệt đối tối thiếu 1000" : (isAbsoluteLengthError ? "Giá trị nhập không quá 10 ký tự" : null)}
                    {...textfieldProps}
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={isAbsoluteMinError ? isAbsoluteMinError : (isAbsoluteLengthError ? isAbsoluteLengthError : null)}
                    required
                    inputRef={register({})}
                  />
                </Grid> :
                <Grid item xs={5} key={selectField}>
                  <TextField
                    type="number"
                    name={"pointValue"}
                    label="Số điểm tặng"
                    placeholder=""
                    defaultValue=""
                    helperText={errors.pointValue?.message}
                    {...textfieldProps}
                    fullWidth
                    error={!!errors.pointValue}
                    required
                    inputRef={register({
                      min: {
                        value: 1,
                        message: "Số điểm tặng tối thiếu 1",
                      },
                      maxLength: {
                        value: 10,
                        message: "Giá trị nhập không quá 10 ký tự",
                      },
                    })}
                  />
                </Grid>
              ) : (
                <>
                  {selectField == "PERCENTAGE" ? (
                    <Grid item container spacing={2}>
                      <Grid item container xs={6}>
                        <TextField
                          type="number"
                          name="percentageDiscount"
                          label="Giá trị giảm giá theo %"
                          placeholder=""
                          helperText={errors.percentageDiscount?.message}
                          {...textfieldProps}
                          InputProps={{
                            readOnly: disabled,
                          }}
                          fullWidth
                          error={!!errors.percentageDiscount}
                          required
                          inputRef={register({
                            required: "Giá trị giảm giá không được trống",
                            max: {
                              value: 100,
                              message: "Giá trị lớn nhất là 100",
                            },
                            min: {
                              value: 1,
                              message: "Giá trị nhỏ nhất là 1"
                            },
                            maxLength: {
                              value: 10,
                              message: "Giá trị nhập không quá 10 ký tự",
                            },
                          })}
                        />
                      </Grid>
                      <Grid item container xs={6}>
                        <TextField
                          value={maxDiscount}
                          onChange={handleChangeMaxDiscount}
                          name="maxDiscount"
                          label="Giá trị giảm tối đa"
                          placeholder=""
                          helperText={isMinError ? "Giá trị nhập tối thiểu 1000" : (isMaxLengthError ? "Giá trị nhập không quá 10 ký tự" : (isRequiredError ? "Giá trị giảm giá tối đa không được trống" : null))}
                          {...textfieldProps}
                          InputProps={{
                            readOnly: disabled,
                            inputComponent: NumberFormatCustom,
                          }}
                          fullWidth
                          error={isMinError ? isMinError : (isMaxLengthError ? isMaxLengthError : (isRequiredError ? isRequiredError : null))}
                          required
                          inputRef={register({})}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      {attachedProduct.map((o, index) => (
                        <Grid item container spacing={2} alignItems="flex-start" key={ index }>
                            <Grid item container xs={6}>
                              <AutoCompleteField
                                name={"gift" + index}
                                label="Sản phẩm tặng kèm"
                                placeholder=""
                                required
                                defaultValue={null}
                                options={[]}
                                type={selectField}
                                useForm={useForm}
                                disabled={disabled}
                                reward
                                arr={attachedProduct}
                                index={index}
                              />
                            </Grid>
                            <Grid item container xs={5} style={{ paddingTop: 21 }}>
                              <TextField
                                type="number"
                                name={"quantity" + index}
                                label="Số lượng được tặng"
                                placeholder=""
                                helperText={errors["quantity" + index]?.message}
                                {...textfieldProps}
                                // InputProps={{
                                //   readOnly: disabled,
                                // }}
                                fullWidth
                                error={!!errors["quantity" + index]}
                                required
                                inputRef={register({
                                  min: {
                                    value: 1,
                                    message: "Số lượng tặng tối thiếu 1",
                                  },
                                  maxLength: {
                                    value: 10,
                                    message: "Số lượng nhập không quá 10 ký tự",
                                  },
                                  required: "Vui lòng chọn số lượng",
                                })}
                              />
                            </Grid>
                            {!disabled && length > 1 && (
                              <Grid item xs={1} container justify="center" style={{ paddingTop: 21 }}>
                                <IconButton
                                  onClick={() => handleRemoveAttachedProduct(index)}
                                >
                                  <Delete color="secondary" />
                                </IconButton>
                              </Grid>
                            )}
                          </Grid>
                      ))}

                      {!disabled && (
                        <Grid item xs={2}>
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            color="primary"
                            onClick={handleAddAttachedProduct}
                          >
                            Thêm sản phẩm
                          </Button>
                        </Grid>
                      )}
                    </>
                  )}
                </>
              ))}
          </Grid>
        </MyCardContent>
      </FormGroup>
    </MyCard>
  );
};

export default Reward;
