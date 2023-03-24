// import dynamic from 'next/dynamic';

import * as XLSX from 'xlsx';
// const XLSX = dynamic(() => import('xlsx'), { ssr: false });

const readFileExcelByFile = (callback, f) => {
  // f = file
  // const { name } = f;
  const reader = new FileReader();
  reader.onload = (evt) => {
    // evt = on_file_select event
    /* Parse data */
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: 'binary' });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    /* Update state */

    callback(data);
  };
  reader.readAsBinaryString(f);
};

export default {
  readFileExcelByFile,
};
