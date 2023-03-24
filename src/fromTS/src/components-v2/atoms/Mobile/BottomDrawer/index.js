import { Box, IconButton, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Close } from '@material-ui/icons';
import clsx from 'clsx';
import styles from './styles.module.css';

const BottomDrawerMV2 = ({ isShow, handleClose, titleClass, title = '', offHeader = false, classContainer, classContent, children }) => (
  <Drawer classes={{ paper: clsx(styles.drawerContainer, classContainer) }} anchor="bottom" open={isShow} onClose={handleClose}>
    <Box className={styles.container}>
      {!offHeader && (
        <Box className={styles.header}>
          <IconButton
            classes={{
              root: styles.iconButton,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <Typography className={titleClass}>{title}</Typography>
        </Box>
      )}
      <Box className={clsx(styles.content, classContent)}>{children}</Box>
    </Box>
  </Drawer>
);

export default BottomDrawerMV2;
