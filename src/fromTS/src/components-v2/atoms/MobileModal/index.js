import { Backdrop, Grid, IconButton, Modal, Slide, Tooltip, Typography } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ICON_MOBILE_ICON_BACK } from 'constants/Images/mobile/Icons';
import { useNotify } from 'context';
import { memo } from 'react';
// import CartModal from './CartModal'; //temporary hide
import NotifyModal from './NotificationModal';
import styles from './styles.module.css';

const style = {
  position: 'absolute',
  top: 0,
  transform: 'translate(-50%, 0)',
  width: '100%',
  height: '100%',
};
const NoPaddingIconBtn = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(IconButton);

const MobileModal = (restProps) => {
  const {
    isShowModal,
    closeModal,
    layout = [1, 10, 1],
    title,
    rightIcon,
    isNotify,
    onClick,
    disabled = false,
    titleTooltip,
    isAvatar,
    children,
  } = restProps;

  const { notification, markAll } = useNotify();

  const RenderHeaderModal = () => (
    <div>
      <div className={clsx(styles.search_wrap)}>
        <Grid container className={styles.gridContainer}>
          <Grid item xs={layout[0]}>
            <IconButton className={styles.btnBack} onClick={closeModal}>
              <ICON_MOBILE_ICON_BACK />
            </IconButton>
          </Grid>
          <Grid item xs={layout[1]}>
            <Typography variant="h5" className={styles.pageTitle}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={layout[2]}>
            <Tooltip title={isNotify ? 'Read all' : titleTooltip}>
              <NoPaddingIconBtn
                disabled={(isNotify && notification && notification.length === 0) || disabled}
                onClick={() => (isNotify ? markAll() : onClick())}
                p={0}
                className={clsx(isNotify && styles.markAll)}
              >
                {isNotify ? <DoneAllIcon /> : rightIcon}
              </NoPaddingIconBtn>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
      <ModalContent />
    </div>
  );
  const ModalContent = () => {
    if (isNotify) {
      return (
        <div className={styles.modalContent_container}>
          <NotifyModal />
        </div>
      );
    }
    return <div className={styles.modalContent_container}>{children}</div>;
  };

  return (
    <div>
      <Modal
        aria-labelledby="mobile-search-modal"
        open={isShowModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Slide direction={isAvatar ? 'right' : 'down'} in={isShowModal}>
          <div style={style}>
            <RenderHeaderModal />
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default memo(MobileModal);
