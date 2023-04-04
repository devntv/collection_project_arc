import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ClearIcon from '@material-ui/icons/Clear';
import Menu from "@material-ui/core/Menu";

import DateRangePicker from "../DateRangePicker/DateRangePicker";
import { ddmmyyyy, getEndOfDate, getStartOfDate } from "utilities/datetime";
import MyButton, { MY_BUTTON_COLOR, MY_BUTTON_TYPE } from "../../Button/MyButton";
import { Popover } from "@material-ui/core";

const useStyles = makeStyles({
	menuList: {
		padding: 0,
		background: "none",
		position: "relative",
	},
	menuPoper: {
		// top: "28% !important",
		// left: "15% !important",
	},
});

const CustomTextField = styled(TextField)(({ theme }) => ({
	cursor: "pointer",
}));

const DateRangePickerInput = (props) => {
	const classes = useStyles();
	const { onChange, value, error, helperText, height, showClearIc = false } = props;
	const propsCopy = { ...props };
	const viewPoint = useRef(null);
	const maxRange = (() => {
		if (propsCopy.maxRange) {
			const d = propsCopy.maxRange;
			delete propsCopy.maxRange;
			return d;
		}
		return null;
	})();
	const defaultValue = (() => {
		if (propsCopy.defaultValue) {
			const d = propsCopy.defaultValue;
			delete propsCopy.defaultValue;
			return d;
		}
		return null;
	})();

	const [range, setRange] = useState({
		start: null,
		end: null,
	});
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleConfirm = () => {
		if (range) {
			let newValue = { ...range };
			if (range.start && range.end) {
			} else if (range.start) {
				const start = getStartOfDate(range.start);
				const end = getStartOfDate(range.start);
				newValue = {
					start: start,
					end: end,
				};
			} else if (range.end) {
				const start = getStartOfDate(range.end);
				const end = getStartOfDate(range.end);
				newValue = {
					start: start,
					end: end,
				};
			}
			onChange({
				...newValue,
			});
		}
		handleClose();
	};

	const inputDisplay = (() => {
		if (value) {
			if (value.start && value.end) {
				return `${ddmmyyyy(value.start)} - ${ddmmyyyy(value.end)}`;
			}
			if (value.start) {
				return `${ddmmyyyy(value.start)} - ${ddmmyyyy(value.start)}`;
			} else if (value.end) {
				return `${ddmmyyyy(value.end)} - ${ddmmyyyy(value.end)}`;
			}
		}
		return "dd/mm/yyyy - dd/mm/yyyy";
	})();

	useEffect(() => {
		if (!value) {
			setRange({
				start: null,
				end: null,
			});
		} else {
			if (value.start && value.end) {
				setRange({ ...value });
			} else if (value.start) {
				setRange((prev) => {
					const start = getStartOfDate(value.start);
					const end = getStartOfDate(value.start);
					return {
						start: start,
						end: end,
					};
				});
			} else if (value.end) {
				setRange((prev) => {
					const start = getStartOfDate(value.end);
					const end = getStartOfDate(value.end);
					return {
						start: start,
						end: end,
					};
				});
			}
		}
	}, [value]);

	useEffect(() => {
		if (defaultValue) {
			setRange(defaultValue);
		}
	}, [defaultValue]);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				backgroundColor: "#fff",
				cursor: "pointer",
			}}
			ref={viewPoint}
		>
			<CustomTextField
				variant="outlined"
				{...propsCopy}
				inputProps={{
					style: {
						cursor: "pointer",
					},
				}}
				InputProps={{
					style: {
						position: "relative",
						color: value && value.start && value.end ? "#000" : "#BEBDBD",
						height: height,
						fontSize: "14px",
						cursor: "pointer",
						input: {
							cursor: "pointer",
						},
					},
					readOnly: true,
					endAdornment: (
						<InputAdornment style={{ color: "#0000008a" }} position="end">
							{value.start && value.end && showClearIc && <ClearIcon onClick={(e) => {
                            	e.preventDefault();
                            	e.stopPropagation();
                            
                            	const clearRange = {
                                	start: null,
                                	end: null
                            	}
                            
                            	setRange(clearRange)
                            	onChange(clearRange)
                        	}} />}
							<DateRangeIcon></DateRangeIcon>
						</InputAdornment>
					),
				}}
				onChange={(e) => {}}
				value={inputDisplay}
				onClick={() => {
					setAnchorEl(viewPoint.current);
				}}
				className={props.className}
			/>
			<Popover
				transitionDuration={100}
				keepMounted
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				anchorEl={anchorEl}
				open={!!anchorEl}
				onClose={handleClose}
				style={{
					padding: 0,
				}}
			>
				<Paper
					style={{
						padding: "1rem",
					}}
				>
					<DateRangePicker
						value={value}
						onChange={(range) => {
							setRange(range);
						}}
						defaultValue={range}
						maxRange={maxRange}
					/>
					<Box sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
						<MyButton
							type={MY_BUTTON_TYPE.OUTLINED}
							color={MY_BUTTON_COLOR.NORMAL}
							disableElevation
							sx={{
								color: "#676565",
								textTransform: "none",
								fontSize: "1rem",
							}}
							onClick={handleClose}
						>
							Đóng
						</MyButton>
						<MyButton
							type={MY_BUTTON_TYPE.CONTAINED}
							color={MY_BUTTON_COLOR.SUCCESS}
							disableElevation
							sx={{
								textTransform: "none",
								fontSize: "1rem",
							}}
							onClick={handleConfirm}
						>
							Đồng ý
						</MyButton>
					</Box>
				</Paper>
			</Popover>
		</Box>
	);
};

export default DateRangePickerInput;
