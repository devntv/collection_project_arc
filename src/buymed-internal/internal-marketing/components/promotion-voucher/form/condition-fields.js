import React from "react";
import { CardContent, Grid, TextField } from "@material-ui/core";

import styles from "./promotion.module.css";

import Scope from "./scope";
import Condition from "./condition";
import Reward from "./reward";

const ConditionFields = (props) => {
  const { object, useForm, disabled } = props;

  const {
    handleChangeConditionField,
    handleChangeRewardField,
    handleAddProductOfProductList,
    handleRemoveProductOfProductList,
    handleAddAttachedProduct,
    handleRemoveAttachedProduct,
    handleSetConditionObject
  } = props;

  const { errors, register } = useForm;

  const { scopeObject, conditionObject, rewardObject } = object;

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Grid
            container
            className={styles.marginLine}
            direction="column"
          >
            <Scope
              scopeObject={scopeObject}
              disabled={disabled}
              useForm={useForm}
            />
          </Grid>
          <Grid
            container
            className={styles.marginLine}
            direction="column"
          >
            <Condition
              condition={conditionObject}
              disabled={disabled}
              useForm={useForm}
              handleAddProductOfProductList={handleAddProductOfProductList}
              handleRemoveProductOfProductList={
                handleRemoveProductOfProductList
              }
              handleSetConditionObject={handleSetConditionObject}
              handleChangeConditionField={handleChangeConditionField}
            />
          </Grid>
          <Grid
            container
            className={styles.marginLine}
            direction="column"
          >
            <Reward
              reward={rewardObject}
              disabled={disabled}
              useForm={useForm}
              handleChangeRewardField={handleChangeRewardField}
              handleAddAttachedProduct={handleAddAttachedProduct}
              handleRemoveAttachedProduct={handleRemoveAttachedProduct}
            />
          </Grid>

          <Grid
            container
            className={styles.marginLine}
            direction="column"
          >
              <Grid container direction="column">
                <Grid item>
                  <h4>Mô tả</h4>
                </Grid>
                <Grid item>
                  <TextField
                    name="description"
                    multiline
                    rows={4}
                    placeholder="Nhập mô tả"
                    defaultValue=""
                    variant="outlined"
                    helperText={errors.description?.message}
                    fullWidth
                    error={!!errors.description}
                    inputRef={register({
                    })}
                  />
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ConditionFields;
