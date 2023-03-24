import { Dialog, Grid, Slide } from '@material-ui/core';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import React from 'react';
import styles from './styles.module.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />);

function ModalRanking({ open, onClose, dataInfoRank }) {
  const handleRankIcon = (codeRank) => {
    switch (codeRank) {
      case 'LEVEL_SILVER':
        return 'Bạc';
      case 'LEVEL_GOLD':
        return 'Vàng';
      case 'LEVEL_PLATINUM':
        return 'Bạch kim';
      case 'LEVEL_DIAMOND':
        return 'Kim cương';
      default:
        return '';
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose} TransitionComponent={Transition} className={styles.wrapDiablog}>
      <Grid className={styles.wrapRank} item>
        <Grid container item xs={12} className={styles.headerRank}>
          <div>Quyền lợi cấp bậc {handleRankIcon(dataInfoRank?.levelCode)}</div>
        </Grid>
        <Grid item xs={12} className={styles.contentRank}>
          <div dangerouslySetInnerHTML={{ __html: dataInfoRank?.desc }} />
        </Grid>

        <Grid item className={styles.wrapBtn}>
          <ButtonV2 onClick={onClose} className={styles.btnV2}>
            Đóng
          </ButtonV2>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ModalRanking;
