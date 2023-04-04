import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";

export const textfieldProps = {
	InputLabelProps: {
		shrink: true,
		style: {
			color: "#353434",
			fontSize: "20px",
		},
	},
};

const DateTimePicker = (props) => {
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
		format = "dd-MM-yyyy HH:mm:ss",
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
			render={({ onChange, value, ...rest }) => (
				<KeyboardDateTimePicker
					ampm={false}
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
					renderInput={(params, {ref}) => (
						<TextField
							InputProps={{
								shrink: false
							}}
							inputRef={ref}
							{...params} />
					)}
					{...rest}
				/>
			)}
		/>
	);
};

export default DateTimePicker;
