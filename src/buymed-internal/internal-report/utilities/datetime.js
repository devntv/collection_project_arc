export const getFormattedTime = (date) => date.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' }).toLowerCase();

export const ddmmyyyy = (date) => {
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let yy = date.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (yy < 10) yy = '0' + yy;

    return `${dd}/${mm}/${yy}`;
}
export const convertDateToDDMMYYYY = (date, defaultDisplay) => {
    date = new Date(date)
    if (!date) {
        return "" || defaultDisplay
    }

    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()

    if (dt < 10) {
        dt = "0" + dt
    }
    if (month < 10) {
        month = "0" + month
    }
    if (hour < 10) {
        hour = "0" + hour
    }
    if (min < 10) {
        min = "0" + min
    }

    return `${dt}/${month}/${year}`
}
export const yyyymmdd = (date, defaultDisplay) => {
    date = new Date(date)
    if (!date) {
        return "" || defaultDisplay
    }

    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()

    if (dt < 10) {
        dt = "0" + dt
    }
    if (month < 10) {
        month = "0" + month
    }
    if (hour < 10) {
        hour = "0" + hour
    }
    if (min < 10) {
        min = "0" + min
    }

    return `${year}/${month}/${dt}`
}

export const ddmmyyHHMM = (date) => {
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let yy = date.getFullYear() % 100;
    let hh = date.getHours();
    let MM = date.getMinutes();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (yy < 10) yy = '0' + yy;
    if (hh < 10) hh = '0' + hh;
    if (MM < 10) MM = '0' + MM;

    return `${dd}/${mm}/${yy} ${hh}:${MM}`;
}

export const ddmmyyyyHHMM = (date) => {
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let MM = date.getMinutes();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (MM < 10) MM = '0' + MM;

    return `${dd}/${mm}/${yyyy} ${hh}:${MM}`;
}

export const ddmmyyyyHHMMSS = (date) => {
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let MM = date.getMinutes();
    let ss = date.getSeconds();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (MM < 10) MM = '0' + MM;
    if (ss < 10) ss = '0' + ss;

    return `${dd}/${mm}/${yyyy} ${hh}:${MM}:${ss}`;
}

export const isLeapYear = (y) => {
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)
        return true;
    return false;
}

export const isBetween = (mid, start, end) => {
    return mid.getTime() > start.getTime() && mid.getTime() < end.getTime();
}

export const isEqualDate = (d1, d2) => {
    if (!d1 || !d2) {
        return false;
    }
    return (d1.date === d2.date && d1.year === d2.year && d1.month === d2.month)
}

export const getNDayFromNow = (n, utc) => {
    let today = new Date();
    const OFFSET_TIMEZONE = today.getTimezoneOffset();
    today.setDate(today.getDate() - n);
    if (utc) {
        today = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0)) // 15:01 1/11 UTC+7 --> 00:00 1/11 UTC+7 --> 17:00 31/10 UTC
                                                                    // 02:00 1/11 UTC --> 00:00 1/11 UTC --> 17:00 31/10 UTC
        today.setHours(today.getHours() - utc)
    } else {
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    return today;
}

export const getNDayFromNowInVN = (n) => {
    let today = new Date();
    const OFFSET_TIMEZONE = today.getTimezoneOffset() / 60;
    today.setDate(today.getDate() - n);
    today.setHours(today.getHours() + OFFSET_TIMEZONE + 7)
    today = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 1, 17,0,0,0))
    return today;
}


export const getDayNow = () => {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17);
    return today;
}

export const newDateWithoutLocation = (date = new Date(), UTC) => {
    const OFFSET_TIMEZONE = date.getTimezoneOffset()
    date.setHours(date.getHours() + OFFSET_TIMEZONE/60 + UTC)
    return date
}

export const newDateWithLocation = (date = new Date(), UTC) => {
    const OFFSET_TIMEZONE = date.getTimezoneOffset()
    date.setHours(date.getHours() - OFFSET_TIMEZONE/60 - UTC)
    return date
}

export const diffMins = (end, start) => {
    if (new Date(start).getTime() == 0) {
        return 0
    }
    let diffMs = (new Date(end).getTime() - new Date(start).getTime());
    if (diffMs <= 0) {
        diffMs = 0  
    }
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins;
}

export const isLessThan = (d1, d2) => {
    const date1 = {
        date: d1.getDate(),
        month: d1.getMonth(),
        year: d1.getFullYear()
    }
    const date2 = {
        date: d2.getDate(),
        month: d2.getMonth(),
        year: d2.getFullYear()
    }
    return new Date(date1.year, date1.month, date1.date).getTime() < new Date(date2.year, date2.month, date2.date).getTime();
}

export const isGreaterThan = (d1, d2) => {
    const date1 = {
        date: d1.getDate(),
        month: d1.getMonth(),
        year: d1.getFullYear()
    }
    const date2 = {
        date: d2.getDate(),
        month: d2.getMonth(),
        year: d2.getFullYear()
    }
    return new Date(date1.year, date1.month, date1.date).getTime() > new Date(date2.year, date2.month, date2.date).getTime();
}


export const getStartOfDate = (data) => {
    const result = new Date(data);
    result.setMilliseconds(0);
    result.setSeconds(0);
    result.setMinutes(0)
    result.setHours(0);
    return result;
}

export const getEndOfDate = (data) => {
    const result = new Date(data);
    result.setMilliseconds(999);
    result.setSeconds(59);
    result.setMinutes(59)
    result.setHours(23);
    return result;
}