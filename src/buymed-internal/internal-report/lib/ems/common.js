export const checkRole = (loggedInUserInfo, permission) => {
    let isPermissions = loggedInUserInfo?.roles?.find((item) => {
        return item.permissions?.find((itemPer) => {
            return itemPer === permission;
        });
    });
    return isPermissions;
};

export const getStatusDevice = (status) => {
    switch (status) {
        case 'DAMAGED':
            return 'Hư hỏng';
        case 'REPAIRING':
            return 'Đang sửa chữa';
        case 'SENDING_WARRANTY':
            return 'Đang bảo hành';
        case 'LOST':
            return 'Mất';
        default:
            return 'Tốt';
    }
}

export const getTypeDevice = (status) => {
    switch (status) {
        case 'DAMAGED':
            return 'fail';
        case 'REPAIRING':
            return 'fix';
        case 'SENDING_WARRANTY':
            return 'insurance';
        case 'LOST':
            return 'lost';
        default:
            return 'good';
    }
}

export const trimAllValues = (objField) => {
    if ((!Array.isArray(objField) && typeof objField !== 'object') || objField === null) {
        return objField;
    }
    return Object.keys(objField).reduce(
        (acc, key) => {
            acc[key] = typeof objField[key] === 'string' ? (objField[key]).trim() : trimAllValues(objField[key]);
            return acc;
        },
        Array.isArray(objField) ? [] : {},
    );
};

export const getTimeWareHouse = (value) => {
    if(!value) {
        return null;
    }

    const currentDate = new Date();
    let hour = currentDate.getUTCHours();;
    let fixedHour = hour ? ("0" + hour).slice(-2) : '00';
    let minute = currentDate.getUTCMinutes();
    let fixedMinute = minute ? ("0" + minute).slice(-2) : '00';
    let second = currentDate.getUTCSeconds();
    let fixedSecond = second ? ("0" + second).slice(-2) : '00';
    const defaultDate = value;
    let year = defaultDate?.getFullYear() ?? '0000';
    let month = defaultDate?.getMonth() ? defaultDate?.getMonth() + 1 : '0';
    let fixedMonth = month ? ("0" + month).slice(-2) : '00';
    let date = defaultDate?.getDate();
    let fixedDate = date ? ("0" + date).slice(-2) : '00';

    let currentTime;
    if(defaultDate) {
        currentTime = `${year}-${fixedMonth}-${fixedDate}T${fixedHour}:${fixedMinute}:${fixedSecond}.000Z`
    }

    return currentTime;
};

export const getFilterTimeWareHouse = (value, type) => {
    if(!value) {
        return null;
    }

    const defaultDate = value;
    let year = defaultDate?.getFullYear() ?? '0000';
    let month = defaultDate?.getMonth() ? defaultDate?.getMonth() + 1 : '0';
    let fixedMonth = month ? ("0" + month).slice(-2) : '00';
    let date = defaultDate?.getDate();
    let fixedDate = date ? ("0" + date).slice(-2) : '00';

    let currentTime;
    if(defaultDate) {
        if(type ==='start') {
            currentTime = `${year}-${fixedMonth}-${fixedDate}T00:00:00.000Z`;
        }
        else {
            currentTime = `${year}-${fixedMonth}-${fixedDate}T23:59:59.000Z`;
        }
    }

    return currentTime;
};