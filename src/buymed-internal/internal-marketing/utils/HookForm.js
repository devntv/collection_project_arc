/* eslint-disable no-unused-vars */
import { SetValueConfig, UseFormMethods } from "react-hook-form";
/**
 * @param {object} valueObject New values object
 * @param {Array<string|object>} keys Key
 * @param {string} keys[].name
 * @param {Function} keys[].resolver
 * @param {UseFormMethods['setValue']} setter 
 * @param {SetValueConfig} config
 */
export const formSetter = (valueObject = {}, keys = [], setter, config = {}) => {
    keys.forEach(key => {
        if (typeof key === "string" && key) {
            setter(key, valueObject[key]);
        } else if (typeof key === "object" || key.name) {
            setter(key.name, key.resolver?.(valueObject[key.name]) ?? valueObject[key.name]);
        }
    });
}

export const filterChangedField = (values, defaultValues, ignoreFields = []) => {
    const ignoreKeyMap = ignoreFields.reduce((acc, cur) => { acc[cur] = true; return acc; }, {});
    const keys = Object.keys(values);
    const filteredObject = {};
    keys.forEach((key) => {
        if (ignoreKeyMap[key] || (JSON.stringify(values[key]) !== JSON.stringify(defaultValues[key]))) {
            filteredObject[key] = values[key];
        }
    });
    return filteredObject;
}

export const FormCommonValidator = {
    noDecimal: (value) => {
        if (value.toString().indexOf(".") >= 0) {
            return "Vui lòng không nhập số thập phân."
        }
    },
    name: (value) => {
        const validators = [
            {
                value: new RegExp("[\\p{P}\\p{S}]", "ug"),
                message: "Vui lòng nhập tên không bao gồm ký tự đặc biệt."
            },
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

}