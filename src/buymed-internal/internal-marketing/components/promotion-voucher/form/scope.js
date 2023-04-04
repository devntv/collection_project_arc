import {
  Grid,
  FormGroup
} from "@material-ui/core";

import React from "react";
import { displayLabelBasedOnScope, displayNameBasedOnScope } from "components/promotion-voucher/util";
import AutoCompleteField from "./autocomplete-field";
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";

const Scope = (props) => {
  const { scopeObject, useForm, disabled } = props;

  return (
    <MyCard>
      <FormGroup style={{ width: "100%" }}>
          <MyCardHeader
            small={true}
            title="Phạm vi áp dụng"
          >
          </MyCardHeader>
          <MyCardContent>
            <Grid item container spacing={4}>
              {scopeObject.map(
                ({ selectField, list }, index) =>
                  selectField != "" && (
                    <Grid
                      item
                      container
                      justify="space-between"
                      alignItems="flex-end"
                      xs={6}
                      key={index}
                    >
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                          <AutoCompleteField
                            name={displayNameBasedOnScope(selectField)}
                            label={displayLabelBasedOnScope(selectField)}
                            placeholder=""
                            sellerQuantityType={list[0]?.name || ""}
                            multiple
                            required
                            defaultValue={list}
                            options={[{ name: "" }]}
                            type={selectField}
                            useForm={useForm}
                            // disabled={disabled}
                          />
                        </Grid>
                      </Grid>
                      {/* {selectField == defaultScope.customerLevel && (
                        <></>
                        // <Grid
                        //   container
                        //   item
                        //   xs={6}
                        //   spacing={3}
                        //   justify="space-between"
                        // >
                        //   <Grid item xs={6}>
                        //     <TextField
                        //       name={"registeredAfter"}
                        //       label="Được kích hoạt từ ngày"
                        //       placeholder=""
                        //       defaultValue=""
                        //       helperText={errors.registeredAfter?.message}
                        //       type="datetime-local"
                        //       {...textfieldProps}
                        //       InputProps={{
                        //         readOnly: disabled,
                        //       }}
                        //       fullWidth
                        //       error={!!errors.registeredAfter}
                        //       inputRef={register()}
                        //     />
                        //   </Grid>
                        //   <Grid item xs={6}>
                        //     <TextField
                        //       name={"registeredBefore"}
                        //       label="Được kích hoạt đến ngày"
                        //       placeholder=""
                        //       defaultValue=""
                        //       helperText={errors.registeredBefore?.message}
                        //       type="datetime-local"
                        //       {...textfieldProps}
                        //       InputProps={{
                        //         readOnly: disabled,
                        //       }}
                        //       fullWidth
                        //       error={!!errors.registeredBefore}
                        //       inputRef={register({
                        //         min: {
                        //           value: getValues("registeredAfter"),
                        //           message:
                        //             "Thời gian sau phải lớn hơn thời gian trước",
                        //         },
                        //       })}
                        //     />
                        //   </Grid>
                        //</Grid>
                      )} */}
                    </Grid>
                  )
              )}
            </Grid>

          </MyCardContent>
      </FormGroup>
    </MyCard>
  );
};

export default Scope;
