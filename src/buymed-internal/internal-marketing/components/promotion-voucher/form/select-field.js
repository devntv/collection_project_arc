import React from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

const SelectField = (props) => {
  const {
    title,
    value,
    options,
    name,
    control,
    errors,
    required = true,
    disabled,
  } = props;

  const { handleChange } = props;

  return (
    <FormControl
      fullWidth
      required={required}
      error={errors[name] && !!errors[name]}
      disabled={disabled}
    >
      <InputLabel
        shrink
        style={{
          color: "#353434",
          fontSize: "20px",
        }}
      >
        {title}
      </InputLabel>
      {/* <div style={{ height: 30 }}></div> */}
      <Controller
        render={(props) => (
          <NativeSelect
            placeholder=""
            value={props.value}
            onChange={(event) => {
              handleChange(event);
              props.onChange(event);
            }}
          >
            {options.map((o, index) => (
              <option key={index} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        )}
        rules={{
          validate: (v) => {
            if (v == "") return `Chưa chọn ` + title.toLowerCase();
          },
        }}
        name={name}
        control={control}
        defaultValue={value}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
