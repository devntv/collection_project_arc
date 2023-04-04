import React from 'react';
import { Button } from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.module.css';

export const ExportCSV = ({ csvData, fileName, loading, color = "primary", text = "Xuất file" }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csv, name) => {
        csv().then((res) => {
            const ws = XLSX.utils.json_to_sheet(res);
            const wb = { Sheets: { 'Danh sách': ws }, SheetNames: ['Danh sách'] };

            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, name + fileExtension);
        });
    };

    return (
        <div className={styles.wrapper}>
            <Button variant="contained" color={color} disabled={loading} onClick={() => exportToCSV(csvData, fileName)}>
                {text}
            </Button>
            {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
        </div>
    );
};

export default { ExportCSV };
