import DateFnsUtils from '@date-io/date-fns';
import { Box } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './styles.module.css';

function DateTimePickerV2({ id, name, value, className, onChange, restProps, minDate, maxDate = Date.now(), isMobileV2 = false }) {
  const [date, setDate] = useState(value);

  const handleChange = (dateCur) => {
    setDate(dateCur);
    onChange(dateCur);
  };
  return (
    <Box className={clsx(className, styles.dateTimePicker)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id={id}
          invalidDateMessage="Định dạng không hợp lệ"
          format="dd/MM/yyyy"
          value={date}
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: true }}
          name={name}
          classes={{
            root: isMobileV2 ? styles.mobileRoot_input : styles.root_input,
          }}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          minDate={minDate}
          minDateMessage="Ngày nhập không hợp lệ"
          maxDate={maxDate}
          maxDateMessage="Ngày nhập không hợp lệ"
          {...restProps}
          rifmFormatter={(str) => str}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default DateTimePickerV2;
