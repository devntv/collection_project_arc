import { Fade, Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import { Modal } from 'components/atoms';
import { VOUCHER_TITLE_BOX } from 'constants/Icons';
import React, { memo } from 'react';
import styles from './styles.module.css';

const PromotionDetailModal = memo(({ onClose, visible, className, restProps, title, listsPromo = [], loading, err }) => {
  // max 5 list promo
  // const maxPromoLists = listsPromo.slice(0, 5);
  const renderDescriptionPromo = (data) => <div dangerouslySetInnerHTML={{ __html: data }} />;

  return (
    <Modal
      className={className}
      open={visible}
      {...restProps}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={visible}>
        <Grid className={styles.confirm_modal_wrap}>
          <Grid className={styles.header} style={{ background: '#09884D', display: 'flex', justifyContent: 'space-between', padding: '8px 0px' }}>
            <Grid style={{ display: 'flex', marginLeft: '16px' }}>
              <Grid className={styles.wrapImg}>
                <VOUCHER_TITLE_BOX />
              </Grid>
              {title && <Typography className={styles.modal_title}>{title}</Typography>}
            </Grid>
            <CloseIcon className={styles.closeIcon} onClick={onClose} />
          </Grid>
          <Grid className={styles.containerPromoDiablog}>
            {loading ? (
              <Grid className={styles.wrapLoading}>
                <LoadingBM animateText />
              </Grid>
            ) : (
              <Grid className={styles.children}>
                {err && err}
                {listsPromo?.map(({ conditionDescription = '', voucherId }) => (
                  <div key={voucherId}>{renderDescriptionPromo(conditionDescription)}</div>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
});

export default React.memo(PromotionDetailModal);
