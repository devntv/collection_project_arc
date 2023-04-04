import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardDatePicker } from "@material-ui/pickers";

export const textfieldProps = {
	InputLabelProps: {
		shrink: true,
		style: {
			color: "#353434",
			fontSize: "20px",
		},
	},
};

const DatePicker = (props) => {
	const {
		name,
		control,
		helperText,
		error,
		minDate,
		minDateMessage,
		maxDate,
		maxDateMessage,
		disabled,
		handleChange,
		placeholder,
		format = "dd-MM-yyyy",
		validate,
	} = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				validate: validate || {},
				required: 'Vui lòng chọn thời gian',
			}}
			onFocus={() => {
				const inputEl = document.querySelector(
				  `input[name="${name}"]`
				);
				inputEl.focus();
			}}
			render={({ onChange, value, ref, ...rest }) => (
				<KeyboardDatePicker
					onChange={(date) => {
						onChange(date)
						if (handleChange) handleChange(date)
					}}
					format={format}
					inputVariant="outlined"
					value={value}
					placeholder={placeholder}
					helperText={helperText}
					{...textfieldProps}
					fullWidth
					error={error}
					minDate={minDate}
					minDateMessage={minDateMessage}
					maxDate={maxDate}
					maxDateMessage={maxDateMessage}
					disabled={disabled}
					size="small"
					inputRef={ref}
					{...rest}
				/>
			)}
		/>
	);
};

export default DatePicker;
