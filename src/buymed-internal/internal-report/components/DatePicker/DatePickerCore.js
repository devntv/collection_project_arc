import React, { useEffect, useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { isEqualDate, isLeapYear } from '../../utilities/datetime';
import DateItem from './DateItem';
import { Box } from '@material-ui/core';

const row = 6;
const col = 7;
const CELL_SIZE = 45;

const DatePickerCore = ({
    month, 
    year, 
    onChange, 
    selectedRange,
    startDate,
    endDate,
    minDate,
    maxDate,
    fontWeight
}) => {
    const [months, setMonths] = useState([31,28,31,30,31,30,31,31,30,31,30,31]);
    const [headers] = useState([...[...Array(6).keys()].map(item => `Thứ ${item + 2}`), "CN"])
    const [selectedDate, setSelectedDate] = useState(null);

    const listDate = useMemo(()=>{
        const now = new Date();
        const today = now.getDate();
        const today_month = now.getMonth()+1;
        const today_year = now.getFullYear();
        const d = new Date();
        d.setFullYear(year,month,1);
        const dow = d.getDay() || 7; //1
        const last_month = (month-1) >= 0 ? month-1:11;
        const begin = months[last_month] - (dow - 1);
        let dem = begin;
        let present = false;

        let monthIndex = last_month;
        let yearIndex = year;
        return [...Array(row*col).keys()].map((item) => {
            dem = dem + 1;
            let result = {}
            if(dem > months[last_month] && present === false)
            {
                
                monthIndex = monthIndex === last_month ? month : monthIndex;
                dem = 1;
                present = true;
            }
            else if(dem > months[month] && present === true)
            {
                dem = 1;
                monthIndex = (month + 1) > 11 ? 0 : (month + 1);
                yearIndex = (month + 1) > 11 ? (year + 1) : year;
                present = false;
            }
            if(dem === today && month+1 === today_month && today_year === year && present === true)
            {
                result.isToday = true;
            }
            else
            {
                result.isToday = false;
            }
            if(!present)
            {
                result.isOtherMonth = true;
            }else{
                result.isOtherMonth = false;
            }
            if(minDate){
                if(new Date(yearIndex, monthIndex, dem).getTime() < minDate.getTime()){
                    result.isOtherMonth = true;
                }
            }
            if(maxDate){
                if(new Date(yearIndex, monthIndex, dem).getTime() > maxDate.getTime()){
                    result.isOtherMonth = true;
                }
            }
            result = {
                ...result, 
                ...({
                    date: dem,
                    month: monthIndex,
                    year: yearIndex
                })
            }
            return result;
        })
    },[month, year, maxDate, minDate, months]) 

    useEffect(()=>{
        if(isLeapYear(year)){
            setMonths(prev => {
                const copy = [...prev];
                copy[1] = 29;
                return copy;
            })
        }else{
            setMonths(prev => {
                const copy = [...prev];
                copy[1] = 28;
                return copy;
            })
        }
    },[year])

    useEffect(()=>{
        if(!isEqualDate(selectedDate, startDate) && !isEqualDate(selectedDate, endDate)){
            setSelectedDate(null);
        }
    },[startDate, endDate])

    return (
        <Box
            columns={7}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                width: `${CELL_SIZE*col}px`,
				height: `${CELL_SIZE*(row + 1)}px`,
            }}
        >
            {headers.map((item, index)=>{
                return (
                    <Box
                        xs="auto"
                        key={index}
                        style={{
                            gridColumn: "span 1",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                        }}
                    >
                        {item}
                    </Box>
                )
            })}
            {listDate.map((item, index) => {
                return (
                    <Box
                        xs={"2"}
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                        }}
                    >
                        <DateItem 
                            dateData={item}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            onChange={onChange}
                            selectedRange={selectedRange}
                            startDate={startDate}
                            endDate={endDate}
                            fontWeight={fontWeight}
                        />
                    </Box>
                    
                )
            })}
        </Box>
    )
}

export default DatePickerCore