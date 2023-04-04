export function formatNumber(number) {
    return Object(number).toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
}

export function getTotay() {
    let d = new Date()
    return d.getDate() + "/" + (d.getMonth() + 1)
}

export function getThisMonth() {
    let d = new Date()
    return (d.getMonth() + 1) + "/" + d.getFullYear()
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

export function displayDate(date, defaultDisplay) {
    date = new Date(date)
    if (!(date instanceof Date && !isNaN(date))) {
        return "" || defaultDisplay
    }

    let h = date.getHours()
    if (h < 10) {
        h = "0" + h
    }

    let m = date.getMinutes()
    if (m < 10) {
        m = "0" + m
    }

    let s = date.getSeconds()
    if (s < 10) {
        s = "0" + s
    }

    let d = date.getDate()
    if (d < 10) {
        d = "0" + d
    }

    let M = date.getMonth() + 1
    if (M < 10) {
        M = "0" + M
    }


    return `${d}-${M}-${date.getFullYear()} ${h}:${m}:${s}`
}

export function roundToDecimal(number, decimalPlaces) {
    if (isNaN(number) || isNaN(decimalPlaces)) {
      return NaN;
    }
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }