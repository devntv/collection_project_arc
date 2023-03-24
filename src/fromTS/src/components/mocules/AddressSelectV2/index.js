import MobileInputV2 from 'components-v2/atoms/MobileModal/AccountModal/FormBussinessInfo/Input';
import InputV2 from 'components/atoms/InputV2';

const AddressSelect = ({ id, options = [], onChange, value = '', disabled, label, className, required = true, isMobileV2 = false, ...restProps }) => (
  <>
    {isMobileV2 ? (
      <MobileInputV2
        id={id}
        label={label}
        value={value}
        className={className}
        onChange={onChange}
        disabled={disabled}
        select
        required={required}
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...restProps}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </MobileInputV2>
    ) : (
      <InputV2
        id={id}
        label={label}
        value={value}
        className={className}
        onChange={onChange}
        disabled={disabled}
        select
        required={required}
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...restProps}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </InputV2>
    )}
  </>
);

export default AddressSelect;
