import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.module.css';

export const CustomExportCSV = ({loading, color = "primary", text = "Xuất file", exportFile }) => {

    return (
        <div className={styles.wrapper}>
            <Button variant="contained" color={color} disabled={loading} onClick={() => exportFile()}>
                {text}
            </Button>
            {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
        </div>
    );
};

export default { CustomExportCSV };
