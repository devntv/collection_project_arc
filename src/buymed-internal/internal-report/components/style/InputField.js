import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { CustomTextField } from '../style/TextField';


InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, multiline, onChange } = props;
  const { errors } = form.formState;
  const hasError =  errors[name];
  // console.log(errors[name])

  // console.log("Form: ",form)
  // console.log("hasError: ", !!hasError)
  // console.log("name: ", name)

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => 
      <CustomTextField 
          {...field}
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          multiline={multiline}
          error={!!hasError}
          helperText={errors[name]?.message}
          disabled={disabled}
          onChange={e => {
            if (onChange) {
              onChange(e)
            }
            field.onChange(e)
          }}
      />}
    />
  );
}

export default InputField;
