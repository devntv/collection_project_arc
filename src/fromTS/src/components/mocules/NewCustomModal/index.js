import { Avatar, Box, Grid, IconButton, Typography } from '@material-ui/core';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import clsx from 'clsx';
import { Modal, ModalButton } from 'components/atoms';
import React, { memo } from 'react';
import styles from './styles.module.css';

const NewCustomModal = memo(
  ({
    icon,
    children,
    onClose,
    onClickOk,
    visible,
    className,
    restProps,
    title,
    content,
    infoCompany,
    infoPromotion,
    btnOk,
    btnOnClose,
    btnCloseRender = (
      <ModalButton className={styles.no_btn} onClick={onClose} data-test="btn-new-custom-modal-cancel">
        {btnOnClose}
      </ModalButton>
    ),
    btnOkRender = (
      <ModalButton className={styles.yes_btn} onClick={onClickOk} data-test="btn-ok-modal">
        {btnOk}
      </ModalButton>
    ),
    customBtnRender,
  }) => (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={clsx(`${styles.confirm_modal_wrap}  ${title && content && styles.fixed_width_wrapper}`, className)}>
        <div>
          {icon && (
            <div className={styles.warning_icon}>
              <Typography className={styles.text_icon}>{icon}</Typography>
            </div>
          )}
          {title && <Typography className={styles.modal_title}>{title}</Typography>}
          {content && (
            <Typography className={styles.modal_content} data-test="new-custom-modal-content">
              {content}
            </Typography>
          )}
          <div className={styles.children}>{children}</div>

          {infoCompany && (
            <div className={styles.infor_container}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={3}>
                  <Avatar className={styles.infor_img} />
                </Grid>
                <Grid item xs={9}>
                  <Typography className={styles.infor_name}>{infoCompany?.name}</Typography>
                </Grid>
              </Grid>
              <ModalButton startIcon={<AddCircleOutlineIcon />} className={styles.infor_btnfollow}>
                Theo Dõi
              </ModalButton>
              <Box>
                <Box style={{ marginTop: '0' }} className={styles.infor_box}>
                  <ListAltOutlinedIcon />
                  <Typography className={styles.infor_title}>Sản phẩm</Typography>
                  <Typography className={styles.infor_content}>{infoCompany?.product}</Typography>
                </Box>
                <Box className={styles.infor_box}>
                  <PersonOutlineOutlinedIcon />
                  <Typography className={styles.infor_title}>Người theo dõi</Typography>
                  <Typography className={styles.infor_content}>{infoCompany?.followers}</Typography>
                </Box>
                <Box className={styles.infor_box}>
                  <StarBorderOutlinedIcon />
                  <Typography className={styles.infor_title}>Đánh giá</Typography>
                  <Typography className={styles.infor_content}>
                    {infoCompany?.rate} ({infoCompany?.numberRate} Đánh giá)
                  </Typography>
                </Box>
                <Box className={styles.infor_box}>
                  <AccessTimeOutlinedIcon />
                  <Typography className={styles.infor_title}>Tham gia</Typography>
                  <Typography className={styles.infor_content}>{infoCompany?.join}</Typography>
                </Box>
                <Box className={styles.infor_box}>
                  <VisibilityOutlinedIcon />
                  <Typography className={styles.infor_title}>Lượt xem shop</Typography>
                  <Typography className={styles.infor_content}>{infoCompany?.view}</Typography>
                </Box>
              </Box>
            </div>
          )}

          {infoPromotion && (
            <div style={{ width: '30rem' }} className={styles.infor_container}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={11} className={styles.infor_mainTitle}>
                  mã giảm giá
                </Grid>
                <Grid item xs={1}>
                  <IconButton aria-label="close" onClick={onClose}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Box style={{ marginTop: '40px' }}>
                <Box style={{ gap: '20px' }} className={styles.infor_box}>
                  <Typography className={styles.infor_titlePromotion}>Mã giảm giá</Typography>
                  <Typography className={styles.infor_content}>{infoPromotion?.promotionCode}</Typography>
                </Box>
                <hr className={styles.hr} />
                <Box style={{ gap: '20px' }} className={styles.infor_box}>
                  <Typography className={styles.infor_titlePromotion}>Hạn sử dụng</Typography>
                  <Typography className={styles.infor_contentPromotion}>{infoPromotion?.expDate}</Typography>
                </Box>
                <hr className={styles.hr} />
                <Box style={{ flexDirection: 'column', alignItems: 'flex-start' }} className={styles.infor_box}>
                  <Typography className={styles.infor_titlePromotion}>điều kiện sử dụng</Typography>
                  <Typography className={styles.infor_contentPromotion}>{infoPromotion?.cond}</Typography>
                </Box>
              </Box>
            </div>
          )}
        </div>
        <Box className={styles.btn_container}>
          {btnOnClose && btnCloseRender}
          {btnOk && btnOkRender}
          {customBtnRender && btnOkRender}
        </Box>
      </div>
    </Modal>
  ),
);

export default React.memo(NewCustomModal);
