import React, { useEffect, useState } from "react";

import { styled } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Stack from "@mui5/Stack/Stack";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Menu from "@material-ui/core/Menu";

import DatePicker from "../DatePicker/DatePicker";

import { ddmmyyyy } from "utilities/datetime";
import MyButton, { MY_BUTTON_COLOR, MY_BUTTON_TYPE } from "../../Button/MyButton";

const CustomTextField = styled(TextField)(({ theme }) => ({
	"& .MuiFormHelperText-root": {
		marginLeft: "00px",
	},
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			borderColor: theme.palette.green,
		},
	},
}));

const DatePickerInput = (props) => {
	const {
		onChange,
		value,
		error,
		helperText,
		showerror,
		defaultdate,
		maxdate,
		mindate,
		fontWeight,
		defaultValue,
	} = props;

	const [selectedDate, setSelectedDate] = useState(defaultValue ?? null);
	const [anchorEl, setAnchoEl] = useState(null);

	const handleClose = () => {
		setAnchoEl(null);
	};

	const handleSelectDate = (date) => {
		setSelectedDate(date);
	};

	const inputDisplay = (() => {
		if (selectedDate) {
			return `${ddmmyyyy(selectedDate)}`;
		}
		return "dd/mm/yyyy";
	})();

	useEffect(() => {
		if (selectedDate) {
			onChange({
				target: {
					value: selectedDate,
				},
			});
		}
		handleClose();
	}, [selectedDate]);

	useEffect(() => {
		if (!value) {
			setSelectedDate(null);
		}
	}, [value]);

	useEffect(() => {
		if (defaultdate) {
			setSelectedDate(defaultdate);
		}
	}, [defaultdate]);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
			}}
		>
			<CustomTextField
				{...props}
				InputProps={{
					readOnly: true,
					endAdornment: (
						<InputAdornment position="end">
							<DateRangeIcon></DateRangeIcon>
						</InputAdornment>
					),
					style: {
						color: selectedDate ? "#000" : "#BEBDBD",
						height: "100%",
					},
				}}
				onChange={(e) => {}}
				value={inputDisplay}
				onClick={(e) => {
					setAnchoEl(e.currentTarget);
				}}
				sx={{
					"& .MuiInputBase-root": {
						"& input": {
							cursor: "pointer",
						},
						cursor: "pointer",
					},
				}}
				className={props.className}
				error={showerror && error}
				helperText={showerror && helperText}
			/>
			<Menu
				anchorEl={anchorEl}
				open={!!anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				style={{
					"& .MuiMenu-list": {
						padding: 0,
						background: "none",
					},
				}}
				transitionDuration={100}
			>
				<Paper
					sx={{
						padding: "1rem",
					}}
				>
					<DatePicker
						value={value}
						onChange={(date) => handleSelectDate(date)}
						defaultDate={selectedDate}
						maxDate={maxdate}
						minDate={mindate}
						fontWeight={fontWeight}
					/>
					<Stack direction={"row"} spacing={1} justifyContent="flex-end">
						<MyButton
							type={MY_BUTTON_TYPE.OUTLINED}
							color={MY_BUTTON_COLOR.NORMAL}
							disableElevation
							sx={{
								color: "#676565",
								textTransform: "none",
							}}
							onClick={handleClose}
						>
							Đóng
						</MyButton>
					</Stack>
				</Paper>
			</Menu>
		</Box>
	);
};

export default DatePickerInput;
