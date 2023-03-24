/* eslint-disable no-use-before-define */
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputV2 } from 'components/atoms';
import React from 'react';

const AutoComplete = ({ id, freeSolo = false, options, label, required = false, value, onChange, onInputChange, inputValue }) => (
  <Autocomplete
    id={id}
    freeSolo={freeSolo}
    options={options}
    getOptionLabel={(option) => option?.label || ''}
    value={value}
    onChange={onChange}
    inputValue={inputValue}
    onInputChange={onInputChange}
    renderInput={(params) => <InputV2 label={label} {...params} required={required} />}
  />
);

export default AutoComplete;
