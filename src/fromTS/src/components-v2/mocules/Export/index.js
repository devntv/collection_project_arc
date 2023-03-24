/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid, MenuItem, Tooltip, Typography } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useSetting } from 'context';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

export default function ExportInvoice({ data, className, isFee = false }) {
  const { invoiceData = [], source: seller = {}, vatType = '' } = data;

  const { mapSeller } = useSetting();
  const sellerInfo = mapSeller?.get(seller) || null;

  let name = '';
  if (vatType === 'VAT_ALL') {
    name = 'Chứng Từ Hoá đơn Medx 5%, 8%, 10%';
  } else if (seller === 'MEDX') {
    name = 'Chứng Từ Hóa Đơn MedX 5%,10%';
  } else if (seller === 'MEDX-8') {
    name = 'Chứng Từ Hóa Đơn MedX 8%';
  } else if (seller === sellerInfo?.code) {
    name = sellerInfo?.fullName;
  }

  if (isFee) {
    return (
      <div className={styles.headInvocie}>
        <Typography className={styles.titleSellerInvoice}>Hoá đơn phí bán hàng - người mua</Typography>
        <Grid item xs={12} className="item-divider">
          <Divider />
        </Grid>
        {invoiceData?.map((item) => (
          <MenuItem key={item?.invoiceNo}>
            <div className={className}>
              <Link href={item.pdfUrl}>
                <a target="_blank">
                  <p>{`${item.displayName}.pdf`}</p>
                  <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`}>
                    <CloudDownloadIcon />
                  </Tooltip>
                </a>
              </Link>
            </div>
          </MenuItem>
        ))}
      </div>
    );
  }

  return (
    <>
      {seller === 'MEDX' && invoiceData && (
        <div className={styles.headInvocie}>
          <Typography className={styles.titleSellerInvoice}>{name}</Typography>
          <Grid item xs={12} className="item-divider">
            <Divider />
          </Grid>
          {invoiceData?.map((item) => (
            <MenuItem key={uuidv4()}>
              <div className={className}>
                <Link href={item.pdfUrl}>
                  <a target="_blank">
                    <p>{`${item.displayName}.pdf`}</p>
                    <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`}>
                      <CloudDownloadIcon />
                    </Tooltip>
                  </a>
                </Link>
              </div>
            </MenuItem>
          ))}
        </div>
      )}
      {seller === 'MEDX-8' && seller !== 'MEDX' && invoiceData && (
        <div className={styles.headInvocie}>
          <Typography className={styles.titleSellerInvoice}>{name}</Typography>
          <Grid item xs={12} className="item-divider">
            <Divider />
          </Grid>
          {invoiceData?.map((item) => (
            <MenuItem key={uuidv4()}>
              <div className={className}>
                <Link href={item.pdfUrl}>
                  <a target="_blank">
                    <p>{`${item.displayName}.pdf`}</p>
                    <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`}>
                      <CloudDownloadIcon />
                    </Tooltip>
                  </a>
                </Link>
              </div>
            </MenuItem>
          ))}
        </div>
      )}
      {seller === sellerInfo?.code && seller !== 'MEDX' && seller !== 'MEDX-8' && invoiceData && (
        <div className={styles.headInvocie}>
          <Typography className={styles.titleSellerInvoice}>{name}</Typography>
          <Grid item xs={12} className="item-divider">
            <Divider />
          </Grid>
          {invoiceData?.map((item) => (
            <MenuItem key={uuidv4()}>
              <div className={className}>
                <Link href={item.pdfUrl}>
                  <a target="_blank">
                    <p>{`${item.displayName}.pdf`}</p>
                    <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`}>
                      <CloudDownloadIcon />
                    </Tooltip>
                  </a>
                </Link>
              </div>
            </MenuItem>
          ))}
        </div>
      )}
    </>
  );
}
