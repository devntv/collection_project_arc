import { Tooltip } from '@material-ui/core';
import { ButtonDefault } from 'components/atoms';
import { getPathProductBySlugWithDomain } from 'constants/Paths';
import * as FileSaver from 'file-saver';
// import dynamic from 'next/dynamic';
import { DateTimeUtils, NotifyUtils } from 'utils';
import * as XLSX from 'xlsx';

// const XLSX = dynamic(() => import('xlsx'), { ssr: false });

const convertDataProductList = (products) => {
  const items = products?.map((item) => {
    const { name, totalQuantity, totalPrice } = item || {};
    return { 'Tên sản phẩm': name, 'Số lượng': totalQuantity, 'Tổng tiền': totalPrice, 'Link sản phẩm': 'Link sản phẩm' };
  });
  return items;
};

// const FORMATED_HOUR = 'YYYY-MM-DD';
const ExportDataAnalytics = ({ data, fromDate, toDate, formatedFromDate, formatedToDate }) => {
  // const diffDate = DateTimeUtils.diffDate(new Date(toDate), new Date(fromDate));
  // const isGreaterThan45day = diffDate > 45;
  const tooltip = 'Xuất thông tin thống kê';
  const downloadFileOrderDetail = ({ products }) => {
    try {
      // if (isGreaterThan45day) {
      //   NotifyUtils.error('Không thể xuất dữ liệu quá 45 ngày');
      //   return;
      // }
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `Thông tin thống kê ${fromDate} - ${toDate}`;
      const sheetName = `${'thống kê '}${fromDate}-${toDate}`;
      const wb = XLSX.utils.book_new();
      wb.SheetNames.push(sheetName);
      const wsData = [
        ['Danh sách sản phẩm đã mua'],
        [
          `Từ ngày ${DateTimeUtils.getFormattedDate(new Date(formatedFromDate), 'DD/MM/YYYY')} đến ngày ${DateTimeUtils.getFormattedDate(
            new Date(formatedToDate),
            'DD/MM/YYYY',
          )}`,
        ],
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
      ];
      XLSX.utils.sheet_add_json(ws, [{ A: 'Tên sản phẩm', B: 'Số lượng', C: 'Tổng tiền', D: 'Link sản phẩm' }], {
        skipHeader: true,
        origin: 'A4',
      });
      const dataSorted = convertDataProductList(products);

      XLSX.utils.sheet_add_json(ws, dataSorted, {
        skipHeader: true,
        origin: 'A5',
      });
      products?.forEach((item, index) => {
        if (item?.slug) ws[`D${index + 5}`].l = { Target: getPathProductBySlugWithDomain(item.slug), Tooltip: `Mua sản phẩm ${item?.name}` };
      });
      wb.Sheets[sheetName] = ws;
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const dataExport = new Blob([excelBuffer], { type: fileType });

      FileSaver.saveAs(dataExport, fileName + fileExtension);
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  return (
    <Tooltip title={tooltip}>
      <ButtonDefault onClick={() => downloadFileOrderDetail({ products: data })} style={{ width: '100px' }} className="my-order__button--orange">
        Xuất File
      </ButtonDefault>
    </Tooltip>
  );
};

export default ExportDataAnalytics;
