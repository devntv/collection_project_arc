import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { CustomerClient, getData, isValidWithoutData } from 'clients';
import DeleteInvoiceInfoModal from 'components/mocules/InvoiceInfoDeleteModal';
import InvoiceInfoModalV2 from 'components/mocules/InvoiceInfoModalV2';
import { useModal } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { NotifyUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const CardInvoiceInfo = ({ invoiceInfo, handleReloadData }) => {
  const [open, toggle] = useModal();
  const [openDel, toggleDel] = useModal();

  const { companyAddress = '', companyName = '', taxCode = '', code = '', customerID } = invoiceInfo || {};
  const handleDelete = async () => {
    try {
      const result = await CustomerClient.deleteInvoiceInfo({ code, customerID });
      if (!isValidWithoutData(result))
        throw Error(result?.errorCode === 'INVOICE_NOT_FOUND' ? 'Không tìm thấy thông tin xuất hóa đơn' : 'Xóa thông tin không thành công');
      NotifyUtils.success('Xoá thông tin thành công');
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.wrapCard}>
        <div className={styles.cardHeader}>
          <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>Thông tin </Typography>
          <div style={{ display: 'flex' }}>
            <Tooltip title="Xóa">
              <IconButton onClick={toggleDel}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton onClick={toggle}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={styles.content}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography className={styles.subTitle}>Tên:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{companyName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={styles.subTitle}>Mã số thuế:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{taxCode}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={styles.subTitle}>Địa chỉ:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{companyAddress}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <InvoiceInfoModalV2 visible={open} onClose={toggle} invoiceInfo={invoiceInfo} handleReloadData={handleReloadData} />
      <DeleteInvoiceInfoModal visible={openDel} onClose={toggleDel} onClickOk={handleDelete} />
    </>
  );
};
const CardAddInvoiceInfo = ({ handleReloadData }) => {
  const [open, toggle] = useModal();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.addCard}>
          <IconButton onClick={toggle}>
            <AddIcon style={{ color: '#09884D' }} />
          </IconButton>
        </div>
      </div>
      <InvoiceInfoModalV2 visible={open} onClose={toggle} handleReloadData={handleReloadData} />
    </>
  );
};
const FormInvoiceInfo = () => {
  const [invoiceInfos, setInvoiceInfos] = useState([]);
  const loadData = useCallback(async () => {
    const invoiceInfoList = await CustomerClient.getListInvoiceInfo({});
    setInvoiceInfos(getData(invoiceInfoList).slice(-2));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container spacing={2}>
      {invoiceInfos.length > 0 &&
        invoiceInfos.map((item) => (
          <Grid item md={6} key={uuidv4()} style={{ width: '100%' }}>
            <CardInvoiceInfo invoiceInfo={item} handleReloadData={loadData} />
          </Grid>
        ))}
      {invoiceInfos.length < 2 && (
        <Grid item md={6} style={{ width: '100%' }}>
          <CardAddInvoiceInfo handleReloadData={loadData} />
        </Grid>
      )}
    </Grid>
  );
};
export default FormInvoiceInfo;
