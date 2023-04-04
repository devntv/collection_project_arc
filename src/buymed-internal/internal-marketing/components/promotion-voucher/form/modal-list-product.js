import React, {useEffect, useState} from "react";
import {
  Button,
  Modal,
  Paper,
  InputLabel,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Checkbox,
  DialogContent,
  DialogActions,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./promotion.module.css";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { getProductClient } from "client/product";
import { defaultPromotionScope } from "components/promotion-voucher/constant";
import { limitText } from "components/promotion-voucher/util";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 400,
    marginTop: 60,
  },
}));

async function searchProductList(q, categoryCode) {
  return await getProductClient().searchProductListFromClient(q, categoryCode);
}

const RenderTableListProduct = (props) => {
  const {
    listProductDefault,
    listCategoryDefault,
    register,
    listCategoryDefaultProduct,
    open,
    listProductPromotion,
    promotionScope,
  } = props;

  const {
    handleClose,
    handleClickOpen,
    handleAddProductPromotion,
    handleRemoveProductPromotion,
  } = props;

  const classes = useStyles();


  const [stateProduct, setStateProduct] = useState({
    listProductAction: listProductDefault,
    listCategoryDefault: listCategoryDefault || listCategoryDefaultProduct,
    categorySearch: {},
    productNameSearch: "",
  });

  useEffect(() => {
      setStateProduct({...stateProduct,listProductAction: listProductDefault})
  },[promotionScope])

  const handleChangeProductSearch = (event) => {
    setStateProduct({ ...stateProduct, productNameSearch: event.target.value });
  };

  const handleChangeCategory = (event) => {
    setStateProduct({ ...stateProduct, categorySearch: event.target.value });
  };

  const handleActiveProduct = (product, active) => {
    let { listProductAction } = stateProduct;
    listProductAction.forEach((productAction) => {
      if (productAction.product.productID === product.productID) {
        productAction.active = active;
      }
    });
    setStateProduct({ ...stateProduct, listProductAction: listProductAction });
  };


  const resetItem = () => {
    let {listProductAction} = stateProduct
    listProductAction?.forEach(item => item.active = false)
    setStateProduct({...stateProduct,listProductAction: listProductAction})
  }

  const handleOnSearchProductCategory = async () => {
    let seachProductResponse = await searchProductList(
      stateProduct.productNameSearch,
      stateProduct.categorySearch.code
    );
    if (seachProductResponse && seachProductResponse.status === "OK") {
      let listProductAction = [];
      seachProductResponse.data?.forEach((searchProduct, index) => {
        if (index < 5) {
          listProductAction.push({
            product: searchProduct,
            active:
              listProductPromotion.find(
                (productPromotion) =>
                  productPromotion.productID === searchProduct.productID
              ) || false,
          });
        }
      });
      setStateProduct({
        ...stateProduct,
        listProductAction: listProductAction,
      });
    } else {
      setStateProduct({ ...stateProduct, listProductAction: [] });
    }
  };

  const handleClickButton = () => {
    let {listProductAction} = stateProduct
    listProductAction?.forEach(item => item.active = listProductPromotion.find(p => p.productID === item.product.productID))
    setStateProduct({...stateProduct,listProductAction: listProductAction,productNameSearch: "",categorySearch: {}})
  }

  const handleCloseModal = () => {
    let listProductAction = stateProduct.listProductAction;
    listProductAction?.map((o, index) => {
      let bool = false;
      listProductPromotion?.map((product) => {
        if (o.product.productID === product.productID) {
          bool = true;
        }
      });
      o.active = bool;
    });
    setStateProduct({
      ...stateProduct,
      listProductAction: listProductAction,
    });
    handleClose();
  };

  return (
    <div style={{paddingLeft: "1rem"}}>
      {
        promotionScope === defaultPromotionScope.PRODUCT && (    <Button
            variant="contained"
            color="primary"
            style={{ margin: "1rem 0" }}
            onClick={() => {
              handleClickOpen();
              handleClickButton();
            }}>
          Chọn sản phẩm
        </Button>)
      }
      <Modal open={open} onClose={handleCloseModal} className={styles.modal}>
        <div className={styles.modalBody}>
          <h1 className={styles.headerModal}>Danh sách sản phẩm</h1>
          <div style={{ margin: "1.25rem" }}>
            <Grid sx={12} item direction="row" container>
              <Grid item sx={12} sm={5} md={5}>
                <TextField
                  placeholder="Tên sản phẩm"
                  label="Tên sản phẩm"
                  name="searchProduct"
                  variant={"filled"}
                  onChange={handleChangeProductSearch}
                  fullWidth={true}
                  inputRef={register}
                />
              </Grid>
              <Grid item sx={12} sm={5} md={5} className={styles.blockSearch}>
                <FormControl className={styles.select}>
                  <InputLabel
                    id="category-select-outlined-label"
                    variant={"filled"}
                  >
                    Chọn danh mục
                  </InputLabel>
                  <Select
                    autoWidth={false}
                    style={{ width: "100% !important" }}
                    labelId="category-select-outlined-label"
                    id="category-select-outlined"
                    variant={"filled"}
                    onChange={handleChangeCategory}
                    label="Chọn danh mục"
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {stateProduct.listCategoryDefault?.map((category) => (
                      <MenuItem value={category} key={category.categoryID}>
                        {limitText(category.name, 20) || "...Không xác định"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={12} sm={2} md={2} style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnSearchProductCategory}
                  className={styles.buttonSearch}
                  startIcon={<SearchIcon />}>
                  Tìm kiếm
                </Button>
              </Grid>
            </Grid>
          </div>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Thao tác</TableCell>
                    <TableCell align="left">Ảnh</TableCell>
                    <TableCell align="left">Tên sản phẩm</TableCell>
                  </TableRow>
                </TableHead>
                {stateProduct.listProductAction?.map(({ product, active }) => (
                  <TableRow key={product?.productID}>
                    <TableCell align="left">
                      <input
                          style={{transform: "scale(1.5)"}}
                          checked={active}
                          type="checkbox"
                          name="listTicketChecked"
                          color="primary"
                          onChange={(e) => handleActiveProduct(product, e)}
                      />
                    </TableCell>
                    <TableCell align="left">
                      {product.imageUrls?.length > 0 ? (
                        <Image src={product.imageUrls[0] || ""} height={50} width={50} />
                      ) : (
                        <div></div>
                      )}
                    </TableCell>
                    <TableCell align="left">{product.name}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="contained">
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleAddProductPromotion(stateProduct.listProductAction)
                resetItem()}
              }
              color="primary"
              variant="contained"
              autoFocus
            >
              Thêm
            </Button>
          </DialogActions>
        </div>
      </Modal>
      {promotionScope === defaultPromotionScope.PRODUCT ? (
        <Card>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Ảnh</TableCell>
                  <TableCell align="left">Tên sản phẩm</TableCell>
                  <TableCell align="left">Hành Động</TableCell>
                </TableRow>
              </TableHead>
              {listProductPromotion.map((product) => (
                <TableRow key={product?.productID}>
                  <TableCell align="left">
                    {product.imageUrls?.length > 0 ? (
                      <Image src={product.imageUrls[0] || ""} height={50} width={50}/>
                    ) : (
                      <div></div>
                    )}
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      color="secondary"
                      component="span"
                      onClick={() => handleRemoveProductPromotion(product)}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RenderTableListProduct;
