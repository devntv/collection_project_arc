export const isValidVietnamesePhoneNumber = (phone) => {
    const regex = /(0|84|\+84)(\d{9})/
    return regex.test(phone);
}


export const convertToLocalPhone = (phone) => {
    if(isValidVietnamesePhoneNumber(phone)){
        const regex = /(0|84|\+84)/
        return phone.replace(regex, 0)
    }
    return phone;
}