import React, { useMemo, useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Stack from "@mui5/Stack/Stack";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { makeStyles } from "@material-ui/core/styles";

import DatePickerCore from "../DatePickerCore";
import { isEqualDate } from "utilities/datetime";

const createDate = (date) => {
	return new Date(date.year, date.month, date.date);
};

const DatePicker = ({
	onChange,
	initialMonth,
	initialYear,
	value,
	minDate,
	maxDate,
	fontWeight,
}) => {
	const [selectedDate, setSelectedDate] = useState(null);

	const [month, setMonth] = useState({
		month: initialMonth || new Date().getMonth(),
		year: initialYear || new Date().getFullYear(),
	});

	const increaseMonth = () => {
		setMonth((prev) => {
			return {
				month: prev.month + 1 > 11 ? 0 : prev.month + 1,
				year: prev.month + 1 > 11 ? prev.year + 1 : prev.year,
			};
		});
	};

	const decreaseMonth = () => {
		setMonth((prev) => {
			return {
				month: prev.month - 1 < 0 ? 11 : prev.month - 1,
				year: prev.month - 1 < 0 ? prev.year - 1 : prev.year,
			};
		});
	};

	const datePickerChange = (date) => {
		if (date && onChange) {
			setSelectedDate(date);
		}
	};

	useEffect(() => {
		if (onChange && selectedDate) {
			onChange(createDate(selectedDate));
		}
	}, [selectedDate]);

	useEffect(() => {
		if (!value) {
			setSelectedDate(null);
		}
	}, [value]);

	return (
		<Stack direction={"row"} spacing={1}>
			<Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
						fontWeight: "bold",
						fontSize: "1.2rem",
						margin: "0.5rem 0",
					}}
				>
					Tháng {month.month + 1} - {month.year}
					<Stack direction={"row"} spacing={1}>
						<IconButton
							size="small"
							onClick={decreaseMonth}
							sx={{
								transform: "rotate(-90deg)",
							}}
						>
							<ArrowForwardIosIcon sx={{ fontSize: "1rem" }}></ArrowForwardIosIcon>
						</IconButton>
						<IconButton
							size="small"
							onClick={increaseMonth}
							sx={{
								transform: "rotate(-90deg)",
							}}
						>
							<ArrowBackIosIcon sx={{ fontSize: "1rem" }}></ArrowBackIosIcon>
						</IconButton>
					</Stack>
				</Box>
				<DatePickerCore
					month={month.month}
					year={month.year}
					onChange={datePickerChange}
					startDate={selectedDate}
					minDate={minDate}
					maxDate={maxDate}
					fontWeight={fontWeight}
				></DatePickerCore>
			</Box>
		</Stack>
	);
};

export default DatePicker;
