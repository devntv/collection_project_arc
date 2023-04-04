import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const ModalCustom = ({
  children,
  name,
  title,
  open,
  onClose,
  onExcute,
  closeText,
  primaryText,
}) => {
  if (typeof primaryText === "undefined" || primaryText === "") {
    primaryText = "Lưu";
  }
  function handleClose() {
    // TODO
  }

  function handleBtnClose() {
    onClose(false);
    handleClose();
  }

  function handleExcute(data) {
    onExcute(data);
  }

  function fnK(event) {
    if (event.keyCode == 27) {
      onClose(false);
    }
  }

  return (
    <div>
      <Dialog open={open} scroll="body" fullWidth={true} onKeyDown={fnK}>
        <DialogTitle id={name + "-dialog-title"} onClose={handleClose}>
          <Typography variant="h6">{title}</Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={handleBtnClose}
              style={{ position: "absolute", top: "1px", right: "1px" }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleBtnClose}>Đóng</Button>
          <Button autoFocus onClick={handleExcute} color="primary">
            {primaryText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalCustom;
