import React, { useMemo } from 'react'

import Box from '@material-ui/core/Box'
import { CELL_SIZE } from './config'
import { isBetween, isEqualDate } from '../../utilities/datetime'


const DateItem = ({
	dateData,
	selectedDate,
	setSelectedDate,
	selectedRange,
	startDate,
	endDate,
	onChange,
	fontWeight
}) => {

	const color = useMemo(()=>{
		if(dateData.isOtherMonth){
			return "#676565" ;
		}
		if( 
			(startDate && isEqualDate(dateData, startDate)) ||
			(endDate && isEqualDate(dateData, endDate)) 
		){
			return "#fff"
		}

		
		return "#000"
	},[dateData, selectedDate, selectedRange, endDate, startDate])

	const backgroundColor = useMemo(() => {
		if(dateData.isOtherMonth){
			return "#fff"
		}
		if(
			(startDate && isEqualDate(dateData, startDate)) ||
			(endDate && isEqualDate(dateData, endDate)) 
		){
			return "#15A959"
		}

		if(selectedRange && 
			selectedRange.start && 
			selectedRange.end && 
			!dateData.isOtherMonth &&
			isBetween(new Date(dateData.year, dateData.month, dateData.date), selectedRange.start, selectedRange.end)){
			return "#C3F5DA" ;	
		}
		return "#fff"
	},[dateData, selectedDate, selectedRange, startDate, endDate])

	return (
		<Box
			sx={{
				borderRadius: "100%",
				color: color,
				fontSize: ".9rem",
				backgroundColor,
				width: "60%",
				paddingBottom: "60%",
				position: 'relative',
				transition: '.2s',
				...(!dateData.isOtherMonth && {
					cursor: 'pointer',
					"&:hover":{
						backgroundColor: backgroundColor === "#fff" ? "#e4e4e4" : backgroundColor,
					},
					fontWeight: fontWeight
				}),
				
			}}
			onClick={()=>{
				if(!dateData.isOtherMonth){
					if(onChange){
						onChange(dateData)
					}
					setSelectedDate(dateData)
				}
			}}
		>
			<Box
				sx={{
					borderRadius: "100%",
					position: 'absolute',
					display: 'flex',
					justifyContent: 'center',
					alignItems: "center",
					width: "100%",
					height: "100%",
					...(dateData.isToday && {border: "1px solid black"}),
				}}
			>{`${dateData.date}`}</Box>
		</Box>
	)
}

export default DateItem