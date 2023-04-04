import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        allowNegative={false}
        decimalSeparator={"."}
        thousandSeparator={","}
        suffix={"đ"}
        isNumericString
      />
    );
  }

NumberFormatCustom.propTypes = {
inputRef: PropTypes.func.isRequired,
name: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
};
