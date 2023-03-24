import { Box, Button, Collapse, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ICON_UP_INVOICE } from 'constants/Icons';
import { memo } from 'react';
import styles from './styles.module.css';

const DeliveryInfo = memo(({ open = true, toggle, user = null, address = null, handleEdit }) => (
  <div className={styles.delivery_container}>
    <Collapse
      in={open}
      collapsedSize={48}
      style={{ width: '100%', borderRadius: '10px', boxShadow: open ? '0px' : '0px 0px 6px rgba(0, 0, 0, 0.05)' }}
    >
      <Grid container className={styles.delivery_content}>
        <Grid container justifyContent="space-between" className={styles.delivery_top_content}>
          <Typography className={styles.delivery_top_content}>Thông tin giao hàng</Typography>
          <Box className={clsx(styles.btn_hidden, !open && styles.align_center)} onClick={toggle}>
            <p style={{ marginTop: '4px' }}>{open ? 'Ẩn' : 'Hiện'}</p>
            <div className={clsx(styles.toggle_ic, !open && styles.rotate_icon)}>
              <ICON_UP_INVOICE />
            </div>
          </Box>
        </Grid>
        <div>
          <ul className={styles.detail_info}>
            <li>
              <Box className={styles.content_detail}>
                <span style={{ marginRight: '12px' }}>Tên người nhận:</span>
                <span className={styles.contentValueInfo}>{address?.name || user?.name || ''}</span>
              </Box>
            </li>
            <li>
              <Box className={styles.content_detail}>
                <span style={{ marginRight: '12px' }}>Địa chỉ giao hàng:</span>
                <span className={styles.contentValueInfo}>{address?.address || ''}</span>
              </Box>
            </li>
            <li>
              <Box className={styles.content_detail}>
                <span style={{ marginRight: '12px' }}>Số điện thoại:</span>
                <span className={styles.contentValueInfo}>{address?.phone || user?.phone || ''}</span>
              </Box>
            </li>
            <li>
              <Box className={styles.content_detail}>
                <span style={{ marginRight: '12px' }}>Email:</span>
                <span className={styles.contentValueInfo} style={{ textTransform: 'lowercase' }}>
                  {user?.email || '(Chưa có)'}
                </span>
              </Box>
            </li>
          </ul>
        </div>
        <div className={styles.btn_edit_container}>
          <Button className={styles.btn_edit_export_invoice} onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        </div>
      </Grid>
    </Collapse>
  </div>
));

export default memo(DeliveryInfo);
