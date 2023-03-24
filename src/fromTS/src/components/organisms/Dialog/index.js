/* eslint-disable react/no-danger */
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import { ContentClient } from 'clients';
import { useEffect, useState } from 'react';
import GridLineItem from '../Skeleton/GridLineItem';
import styles from './styles.module.css';

const DialogTitle = withStyles(styles)((props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={styles.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// in-use dialog
export default function CustomizedDialogs({ url, open, maxWidth, handleClose, children, title }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await ContentClient.loadContent(url);
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <div className={styles.custom}>
      <Dialog
        scroll="body"
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {loading ? <GridLineItem counts={1} /> : title || (data?.title && data?.title)}
        </DialogTitle>
        <DialogContent dividers>
          {children}
          {loading ? (
            <GridLineItem counts={6} />
          ) : (
            <>
              <Typography className={styles.title} variant="h5">
                {data?.title && data?.title}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: data?.body }} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
