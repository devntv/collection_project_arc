import React, { useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Card,
  List,
  ListItem,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  DialogActions,
  InputBase,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";

import styles from "./promotion.module.css";

import SearchIcon from "@material-ui/icons/Search";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

const RenderTableProductGift = (props) => {
  const [stateProductGift, setStateProductGift] = useState({
    listProductGiftSearch: [],
    listProductGiftAction: [],
    listProductGiftNew: [],
  });

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const handleSearchProductGift = async (productName) => {
    let categoryGiftResponse = await getListGift();
    if (categoryGiftResponse.status === "OK") {
      let giftResponse = await searchGift(categoryGiftResponse.data[0].code);
      if (giftResponse.status === "OK") {
        setStateProductGift({
          ...stateProductGift,
          listProductGiftSearch: giftResponse.data,
        });
      }
    }
  };

  const handleRemoveProductGift = (gift) => {
    let { listProductGiftAction } = stateProductGift;
    listGiftAction.remove(
      (giftAction) => giftAction.gift.productId === gift.productId
    );
    setStateProductGift({
      ...stateProductGift,
      listProductGiftAction: listGiftAction,
    });
  };

  const handleChangeQuantityProductGift = (giftId, quantity) => {
    let { listProductGiftNew } = stateProductGift;
    listGiftNew.forEach((giftNew) => {
      if (giftNew.gift.productId === giftId) {
        giftNew.quantity = quantity;
      }
    });
    setStateProductGift({
      ...stateProductGift,
      listProductGiftNew: listGiftNew,
    });
  };

  const handleActiveProductGift = (gift, active) => {
    let { listProductGiftNew } = stateProductGift;
    listGiftNew.forEach((giftNew) => {
      if (giftNew.gift.productId === giftId) {
        giftNew.active = active;
      }
    });
    setStateProductGift({
      ...stateProductGift,
      listProductGiftNew: listGiftNew,
    });
  };

  const handleAddProductGiftNew = (e, value) => {
    let { listProductGiftNew } = stateProductGift;
    if (value) {
      listGiftNew.push({
        gift: value,
        quantity: 0,
      });
    }
    setStateProductGift({
      ...stateProductGift,
      listProductGiftNew: listGiftNew,
    });
  };

  return (
    <Card  style={{ marginTop: "10px" }}>
      <div>
        <ButtonGroup
          color="primary"
          size="small"
          aria-label="contained primary button group"
          className={styles.btnDialog}
          onClick={props.handleClickOpen}
        >
          <Button variant="contained" size="small" color="primary">
            Thêm sản phẩm
          </Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Hình ảnh</TableCell>
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="left">Số lượng</TableCell>
                <TableCell align="left">Đơn vị</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            {stateProductGift.listProductGiftAction.map(
              ({ gift, quantity, active }) => (
                <TableRow>
                  <TableCell align="left">Balo</TableCell>
                  <TableCell align="left">{gift.name}</TableCell>
                  <TableCell align="left">quantity</TableCell>
                  <TableCell align="left">quantity</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      component="span"
                      onClick={() => handleRemoveGift(gift)}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </Table>
        </TableContainer>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Chọn sản phẩm"}</DialogTitle>
          <DialogContent>
            <Paper
              component="form"
              className={styles.search}
              style={{ marginBottom: "10px" }}
            >
              <InputBase
                id="q"
                name="q"
                className={styles.input}
                onChange={props.handleChange}
                inputRef={props.register}
                placeholder="Tìm kiếm sản phẩm"
                inputProps={{ "aria-label": "Tìm kiếm sản phẩm" }}
              />
              <IconButton className={styles.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Hình ảnh</TableCell>
                    <TableCell align="left">Tên sản phẩm</TableCell>
                    <TableCell align="left">Đơn vị</TableCell>
                    <TableCell align="left" style={{ width: "25%" }}>
                      Số lượng
                    </TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                {stateProductGift.listProductGiftNew.map(({ gift, active }) => (
                  <TableRow>
                    <TableCell align="left">Ảnh</TableCell>
                    <TableCell align="left">{gift.name}</TableCell>
                    <TableCell align="left">
                      <TextField
                        size="small"
                        style={{
                          height: "40%",
                        }}
                        type="number"
                        onChange={(e, value) =>
                          handleChangeQuantityProductGift(gift, value)
                        }
                        id="outlined-adornment-weight"
                        aria-describedby="outlined-weight-helper-text"
                        labelWidth={0}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        size="small"
                        style={{
                          height: "40%",
                        }}
                        type="number"
                        onChange={(e, value) =>
                          handleChangeQuantityProductGift(gift, value)
                        }
                        id="outlined-adornment-weight"
                        aria-describedby="outlined-weight-helper-text"
                        labelWidth={0}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={active}
                        style={{ color: "green" }}
                        onChange={(e, value) =>
                          handleActiveProductGift(gift, value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="secondary">
              Hủy
            </Button>
            <Button onClick={props.handleClose} color="primary" autoFocus>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Card>
  );
};

export default RenderTableProductGift;
