import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  DialogActions,
} from "@material-ui/core";

import styles from "./promotion.module.css";

import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

import { Autocomplete } from "@material-ui/lab";

const RenderTableGift = (props) => {
  const [stateGift, setStateGift] = useState({
    listGiftSearch: [],
    listGiftAction: [],
    listGiftNew: [],
  });

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const handleSearchProductGift = async (productName) => {
    let giftResponse = await searchGift(productName);
    if (giftResponse.status === "OK") {
      setStateGift({ ...stateGift, listGiftSearch: giftResponse.data });
    }
  };

  const handleRemoveGift = (gift) => {
    let { listGiftAction } = stateGift;
    listGiftAction.remove(
      (giftAction) => giftAction.gift.productId === gift.productId
    );
    setStateGift({ ...stateGift, listGiftAction: listGiftAction });
  };

  const handleChangeQuantityGift = (gift, quantity) => {
    let { listGiftNew } = stateGift;
    listGiftNew.forEach((giftNew) => {
      if (giftNew.gift.productId === gift.productId) {
        giftNew.quantity = quantity;
      }
    });
    setStateGift({ ...stateGift, listGiftNew: listGiftNew });
  };

  const handleActiveGift = (gift, active) => {
    let { listGiftNew } = stateGift;
    listGiftNew.forEach((giftNew) => {
      if (giftNew.gift.productId === gift.productId) {
        giftNew.active = active;
      }
    });
    setStateGift({ ...stateGift, listGiftNew: listGiftNew });
  };

  const handleAddGiftNew = (e, value) => {
    let { listGiftNew } = stateGift;
    if (value) {
      if (
        listGiftNew.find((giftnew) => giftnew.productId === value.productId)
      ) {
        listGiftNew.forEach((giftNew) => {
          if (giftNew.gift && giftNew.gift.productId === value.productId) {
            return giftNew.quantity++;
          }
        });
      } else {
        listGiftNew.push({
          gift: value,
          quantity: 0,
          active: true,
        });
      }
    }
    setStateGift({
      ...stateGift,
      listGiftNew: listGiftNew,
      listGiftSearch: [],
    });
  };

  const handleAddGiftAction = () => {
    let { listGiftAction, listGiftNew } = stateGift;
    listGiftNew.forEach((giftNew) => {
      if (giftNew.active) {
        listGiftAction.push(giftNew);
      }
    });
    props.handleClose();
  };

  return (
    <Card variant="outlined" style={{ marginTop: "4px" }}>
      <ButtonGroup
        color="primary"
        size="small"
        aria-label="contained primary button group"
        className={styles.btnDialog}
        onClick={props.handleClickOpen}
      >
        <Button variant="contained" color="primary">
          Thêm quà
        </Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Hình ảnh</TableCell>
              <TableCell align="left">Tên quà</TableCell>
              <TableCell align="left">Số lượng</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {stateGift.listGiftAction.map(({ gift, quantity, active }) => (
            <TableRow>
              <TableCell align="left">Balo</TableCell>
              <TableCell align="left">{gift.name}</TableCell>
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
          ))}
        </Table>
      </TableContainer>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Chọn quà"}</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "1rem" }}>
            <Autocomplete
              options={stateGift.listGiftSearch}
              variant="outlined"
              name="searchProductGift"
              loading={showAutoComplete}
              fullWidth
              loadingText="Không tìm thấy quà tặng"
              onOpen={() => {
                setShowAutoComplete(true);
              }}
              onClose={() => {
                setShowAutoComplete(false);
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tên quà tặng"
                  placeholder=""
                  variant="outlined"
                  onChange={(e) => handleSearchProductGift(e.target.value)}
                />
              )}
              onChange={(e, value) => handleAddGiftNew(e, value)}
            />
          </div>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Hình ảnh</TableCell>
                  <TableCell align="left">Tên quà</TableCell>
                  <TableCell align="left" style={{ width: "25%" }}>
                    Số lượng
                  </TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              {stateGift.listGiftNew.map(({ gift, active, quantity }) => (
                <TableRow>
                  <TableCell align="left">
                    {gift.imageUrls ? (
                      <image src={gift.imageUrls[0]}></image>
                    ) : (
                      <div></div>
                    )}
                  </TableCell>
                  <TableCell align="left">{gift.name}</TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="outlined"
                      size="small"
                      style={{
                        height: "40%",
                      }}
                      type="number"
                      value={quantity}
                      onChange={(e, value) =>
                        handleChangeQuantityGift(gift, value)
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
                      onChange={(e, value) => handleActiveGift(gift, value)}
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
          <Button onClick={handleAddGiftAction} color="primary" autoFocus>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RenderTableGift;
