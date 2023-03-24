import { NativeSelect } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InfoFormControl } from 'components/atoms';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';

const AddressSelect = ({ label, id, options = [], onChange, value = '0', disabled, className, error, dataTest, ...restProps }) => (
  <InfoFormControl xs={12} md={4} label={label} htmlFor={id} {...restProps} isRequired>
    <NativeSelect
      id={id}
      input={<InfoInput error={error} />}
      IconComponent={ExpandMoreIcon}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      data-test={dataTest}
    >
      {options.map((option) => (
        <option value={option.value} key={uuidv4()}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  </InfoFormControl>
);

const StyledAddressSelect = styled(AddressSelect)`
  & .MuiNativeSelect-select {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  & .MuiNativeSelect-icon {
    right: 5px !important;
    color: #00b46e !important;
  }
  &.MuiOutlinedInput-root {
    height: 2.4em !important;
  }
  & .MuiNativeSelect-select:focus {
    background-color: transparent !important;
  }
`;
export default StyledAddressSelect;
