import * as XLSX from 'xlsx/xlsx.mjs'
import { getFormattedDate } from './DateTimeUtil';
import { exportOption, usedOption } from './ems/data';

export const exportExcel = (data, nameSheet, nameFile, template, multiType) => {
    return new Promise((resolve, reject) => {
        let newData = [];
        let widthCols = [];

        if (multiType) {
            data.forEach(item => {
                let itemData = {};
                template.forEach(row => {
                    if (row.idSub) {
                        itemData[row.label] = (item[row.id] && item[row.id][row.idSub]);
                    }
                    else if (row.idExtra) {
                        itemData[row.label] = item[row.id] && item[row.id] !== '' ? item[row.id] : (item[row.idExtra] && item[row.idExtra][row.idExtraSub]);
                    }
                    else if (row.type === 'time') {
                        itemData[row.label] = item[row.id] && getFormattedDate((new Date(item[row.id])), "DD/MM/YYYY");
                    }
                    else if (row.type === 'status') {
                        itemData[row.label] = item[row.id] ? usedOption[1].name : usedOption[0].name;
                    }
                    else if (row.type === 'stock') {
                        itemData[row.label] = item[row.id] ? exportOption[1].name : exportOption[0].name;
                    }
                    else {
                        itemData[row.label] = item[row.id];
                    }
                })
                newData.push(itemData);
                widthCols.push({ wch: 20, color: 'red' })
            })
        }
        else {
            data.forEach(item => {
                let itemData = {};
                template.forEach(item2 => {
                    itemData[item2.label] = item[item2.id];
                })
                newData.push(itemData);
            })
        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(newData, { cellDates: true, dateNF: 'DD/MM/YYYY HH:mm' });
        if (multiType) {
            ws['!cols'] = widthCols;
        }
        XLSX.utils.book_append_sheet(wb, ws, nameSheet);
        XLSX.writeFile(wb, `${nameFile}.xlsx`);
        resolve('Export Excel Successfully!');
    })
}