import { Collapse, Divider, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(-90deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
  root: {
    padding: '12px !important',
    borderRadius: '50% !important',
  },
}));
const InvoiceList = ({ invoiceData: invoiceObject = {}, orderId }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  if (!invoiceObject) {
    return null;
  }

  const { invoiceData = [], source = '', vatType = '' } = invoiceObject;
  const fileList = [];
  invoiceData?.forEach((item) => {
    if (item?.pdfUrl) fileList.push(item?.pdfUrl);
  });

  let name = 'Chứng Từ Hóa Đơn';
  if (vatType === 'VAT_ALL') {
    name += ' MedX 5%,8%,10%';
  } else if (source === 'MEDX') {
    name += ' MedX 5%,10%';
  } else if (source === 'MEDX-8') {
    name += ' MedX 8%';
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    fileList?.length > 0 && (
      <>
        <Divider className={styles.divider} />
        <div className={styles.head_popup}>
          <Typography className={styles.title_popup}>
            {fileList.length} {name}{' '}
          </Typography>
          {fileList.length > 0 && (
            <IconButton
              className={clsx(classes.root, classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {fileList.map((file, i) => (
            <div className={styles.item} key={uuidv4()}>
              <Typography className={styles.fileName}>
                VAT - {orderId} - {i + 1}
              </Typography>
              <a href={file} target="blank">
                <Tooltip title="Xem và tải xuống">
                  <IconButton className={classes.root} aria-label="pdf">
                    <CloudDownloadIcon />
                  </IconButton>
                </Tooltip>
              </a>
            </div>
          ))}
        </Collapse>
      </>
    )
  );
};

export default InvoiceList;
