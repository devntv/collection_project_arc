import getConfig from "next/config";
import emojiRegex from 'emoji-regex';
import { orderUrl } from "../services/OrderService";
import { ticketUrl } from "../services/TicketService";
import { TagCode } from "../services/ChatTagService";
import { convertURLtoHTML } from "./url";

const {publicRuntimeConfig} = getConfig();

const emojiHtml = (emoji)=>`<em-emoji native="${emoji}" size="20px" set="facebook">${emoji}</em-emoji>`;

export const camelCase = (string) => {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export const escapeHTML = (str) => {
    return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


export const replaceCaseInsensitive = (str, toReplace, replaceTo) => {
    const pos = str.toLowerCase().indexOf(toReplace.toLowerCase());
    return pos === -1 ? str : str.substr(0, pos) + replaceTo + str.substr(pos + toReplace.length);
}

export const replaceCaseInsensitiveAll = (str, toReplace, replaceTo) => {
    let pos = str.length;
    let result = str;
    do{
        pos = result.toLowerCase().lastIndexOf(toReplace.toLowerCase(), pos - 1);
        if(pos >= 0){
            result = result.substr(0, pos) + replaceTo + result.substr(pos + toReplace.length);
        }
    }while(pos >= 0)
    return result;
}

export const findCaseInsensitive = (str, keyword) => {
    const pos = str.toLowerCase().indexOf(keyword.toLowerCase());
    if(pos >= 0){
        return str.substr(pos, keyword.length);
    }
    return null;
}

export const splitTextMessage = (string) => {
    return string.split(/\r?\n/).filter(item => item);
}


export const messageToString = (message) => {

}

export const stringToMessage = (strMessage) => {

}

const handleMessageByCode = (code, message, text, url) => {
    let result = "";
    const copy = message.replaceAll('\n', '<br>');
    let index = 0;
    let startIndex = copy.indexOf(code + text, index);
    if(startIndex < 0){
        startIndex = copy.indexOf(code.toLowerCase() + text, index);
    }
    if (startIndex >= 0) {
        result += copy.substring(0, startIndex);
        const tagLength = (code + text).length;
        result += `<span style="color: #161FF4">${copy.substring(startIndex, startIndex + tagLength)}</span>`;
        index = startIndex + tagLength;
    }
    if(index === 0){
        startIndex = copy.indexOf(url);
        if (startIndex >= 0) {
            result += copy.substring(0, startIndex);
            const tagLength = (url).length;
            result += `<span style="color: #161FF4">${copy.substring(startIndex, startIndex + tagLength)}</span>`;
            index = startIndex + tagLength;
        }
    }
    result += copy.substring(index);
    // const regex = emojiRegex();
    // const matchs = result.matchAll(regex);
    // for(const match of matchs){
    //     const emoji = match[0];
    //     result = result.replace(emoji, `${emojiHtml(emoji)}`)
    // }
    return result;
}

export const messageObjToHTML = (message, selectedTagItem) => {
    const copy = escapeHTML(message).replaceAll('\n', '<br>');
    let result = copy;
    if (selectedTagItem) {
        const {tag, item} = selectedTagItem
        switch (tag.code) {
            case TagCode.SP:{
                result = handleMessageByCode(
                    tag.code,
                    message,
                    item.product.name,
                    `${publicRuntimeConfig.WEB_HOST}/product/${item.skuItem.slug}`
                )
                break;
            }
            case TagCode.DH:{
                result = handleMessageByCode(
                    tag.code,
                    message,
                    (item.orderId || item.orderID).toString(),
                    orderUrl(item, "CUSTOMER")
                )
                break;
            }
            case TagCode.HOTRO:{
                result = handleMessageByCode(
                    tag.code,
                    message,
                    (item.code).toString(),
                    ticketUrl(item, "CUSTOMER")
                )
                break;
            }
            default:
                break;
        }
    }
    // const regex = emojiRegex();
    // const matchs = result.matchAll(regex);
    // for(const match of matchs){
    //     const emoji = match[0];
    //     result = result.replace(emoji, `${emojiHtml(emoji)}`)
    // }
    return result;
}

export function normalizeHtml(str) {
    return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}

export function numberFormatDotSeperated(val = 0, currency = {isPrefix: false, unit: "đ"}) {
    // remove sign if negative
    if(!val){
        val = 0
    }
    let sign = 1;
    if (val < 0) {
        sign = -1;
        val = -val;
    }
    // trim the number decimal point if it exists
    let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
    let len = num.toString().length;
    let result = '';
    let count = 1;

    for (let i = len - 1; i >= 0; i--) {
        result = num.toString()[i] + result;
        if (count % 3 === 0 && count !== 0 && i !== 0) {
            result = ',' + result;
        }
        count++;
    }

    // add number after decimal point
    if (val.toString().includes('.')) {
        result = result + '.' + val.toString().split('.')[1];
    }
    if(currency.isPrefix){
        result = currency.unit.trim() + " " + result;
    }
    else{
        result = result + " " + currency.unit.trim();
    }
    // return result with - sign if negative
    return sign < 0 ? '-' + result : result;
}

export const getDisplayContentMessage = (message, option = {}) => {
    let result = escapeHTML((message.content || ""));
    if(!option.disabledLink){
        result = convertURLtoHTML(result);
    }
    if(message.isBuzz){
        if(option.smallBuzz){
            return `<div style="color: #EE4D2D; display: inline-block">BUZZ!!!</div>`
        }
        return `<div style="color: #EE4D2D; font-size: 1.5rem">BUZZ!!!</div>`
    }
    let searchMask = null;
    if (message.skuInfo) {
        searchMask = TagCode.SP + message.skuInfo.name;
        const regEx = new RegExp(searchMask, "i");
        const url = `${publicRuntimeConfig.WEB_HOST}/product/${message.skuInfo.slug}`;
        // result = replaceCaseInsensitive(result, searchMask, `<span>${TagCode.SP}${message.skuInfo.name}</span>`)
        // result = replaceCaseInsensitive(result, searchMask, ``)
        // result = trimNewLineStartEnd(result);

        // result = result.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
    }
    if(message.orderInfo){
        const order = message.orderInfo
        searchMask = TagCode.DH +  (order.orderId || order.orderID);
        const url = orderUrl(order)
        const regEx = new RegExp(searchMask, "i");
        // result = result.replace(regEx, `<span>${TagCode.DH}${ (order.orderId || order.orderID)}</span>`);

        // result = replaceCaseInsensitive(result, searchMask, ``)
        // result = trimNewLineStartEnd(result);
        // result = result.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
    }
    if(message.ticketInfo){
        const ticket = message.ticketInfo
        searchMask = TagCode.HOTRO +  (ticket.code);
        const url = ticketUrl(ticket)
        const regEx = new RegExp(searchMask, "i");
        // result = result.replace(regEx, `<span>${TagCode.HOTRO}${(ticket.code)}</span>`);

        // result = replaceCaseInsensitive(result, searchMask, ``)
        // result = trimNewLineStartEnd(result);
        // result = result.replace(url, `<a href="${url}" target="_blank">${url}</a>`)
    }
    if(option.showTag){

    }
    else{
        if(searchMask){
            result = replaceCaseInsensitive(result, searchMask, ``)
            result = trimNewLineStartEnd(result);
        }
    }
    // const regex = emojiRegex();
    // const matchs = result.matchAll(regex);
    // for(const match of matchs){
    //     const emoji = match[0];
    //     result = result.replace(emoji, emojiHtml(emoji))
    // }
    return result;
}

export const insertToString = (source, index, str) => {
    return source.slice(0, index) + str + source.slice(index);
}

export const trimNewLineStartEnd = (str) => {
    return str.replace(/^\s+|\s+$/g, '')
}

export const isString = (value) => {
    return (typeof value === 'string' || value instanceof String) 
}