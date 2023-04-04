import moment from "moment";

export function formatTime(timeFormat, utcOffset = '+0700', type = "DD-MM-YYYY HH:mm:ss") {
    return moment(timeFormat).utcOffset(utcOffset).format(type)
}

export function trimSpace(str) {
    return str.trim().replace(/\s+/g, ' ')
}

export const LevelRegios = [{
    label: 'Trung ương',
    value: 'Trung ương'
}]