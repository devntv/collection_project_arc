import { getData, POST_ALL } from 'clients';
import { FUZZY_SEARCH } from 'constants/APIUriV2';
import { NotifyUtils } from 'utils';
/* eslint-disable no-nested-ternary */
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const exportAllQuickOrder = async () => {
  const allProducts = await POST_ALL({ url: FUZZY_SEARCH });

  const handleExportFile = (transformProducts) => {
    try {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `Products`;
      const sheetName = `products`;
      const mapListData = [];
      transformProducts.forEach((item) => {
        const { sku } = item;
        const { code, itemCode } = sku || {};
        const dt = {
          A: code,
          B: itemCode,
        };
        mapListData.push(dt);
      });
      const wb = XLSX.utils.book_new();
      wb.SheetNames.push(sheetName);
      const ws = XLSX.utils.aoa_to_sheet([]);
      XLSX.utils.sheet_add_json(
        ws,
        [
          {
            A: 'code',
            B: 'itemCode',
          },
        ],
        {
          skipHeader: true,
          origin: 'A1',
        },
      );
      XLSX.utils.sheet_add_json(ws, mapListData, {
        skipHeader: true,
        origin: 'A2',
      });
      wb.Sheets[sheetName] = ws;
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch {
      NotifyUtils.error('Xuất file không thành công');
    }
  };

  handleExportFile(getData(allProducts));
};

export default {
  exportAllQuickOrder,
};
