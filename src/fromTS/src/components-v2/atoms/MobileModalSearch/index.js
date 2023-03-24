import { Backdrop, Box, Modal, Slide } from '@material-ui/core';
import MobileSearchInput from 'components-v2/mocules/MobileSearchInput';
import { memo } from 'react';
import styles from './styles.module.css';

const MobileModalSearch = memo(({ isSearch }) => (
  <Modal
    aria-labelledby="mobile-search-modal"
    open={isSearch}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 200,
      classes: {
        root: styles.mobileModalSearch_root,
      },
    }}
    className={styles.boxModal}
  >
    <Slide direction="down" in={isSearch}>
      <Box className={styles.boxInput}>
        <MobileSearchInput />
      </Box>
    </Slide>
  </Modal>
));

export default memo(MobileModalSearch);
