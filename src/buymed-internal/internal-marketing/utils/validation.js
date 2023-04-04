export const validateSpace = (value) => {
    const validators = [
        {
            value: /^(.*[ ]{2})|^ /,
            message: "Tên không hợp lệ (dư ký tự khoảng trắng).",
        }
    ]
    for (let i = 0; i < validators.length; i++) {
        if (validators[i].value?.test(value)) {
            return validators[i].message;
        }
    }
}
