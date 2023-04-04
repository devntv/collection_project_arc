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
    Select,
    MenuItem,
    FormControl,
    IconButton,
    Checkbox,
    DialogContent,
    DialogActions,
    Card,
} from "@material-ui/core";
import styles from "./promotion.module.css";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import {defaultPromotionScope} from "components/promotion-voucher/constant";
import {limitText} from "components/promotion-voucher/util";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RenderTableListCategory = (props) => {
    const {
        promotionScope,
        open,
        register,
        listCategoryPromotion,
        listCategoryDefault,
    } = props;

    const {
        handleAddCategoryPromotion,
        handleClickOpen,
        handleClose,
        handleRemoveCategoryPromotion,
    } = props;

    const [stateCategory, setStateCategory] = useState({
        listCategoryAction: listCategoryDefault,
    });

    useEffect(() => {
        setStateCategory({...stateCategory,listCategoryAction: listCategoryDefault})
    },[promotionScope])

    const handleActiveCategory = (category, event) => {
        let listCategoryAction = stateCategory.listCategoryAction;
        listCategoryAction.forEach((o) => {
            if (o.category.categoryID === category.categoryID) {
                return (o.active = event.target.checked);
            }
        });
        setStateCategory({
            ...stateCategory,
            listCategoryAction: listCategoryAction,
        });
    };

    const resetItem = () => {
        let {listCategoryAction} = stateCategory
        listCategoryAction?.forEach(item => item.active = false)
        setStateCategory({...stateCategory,listCategoryAction: listCategoryAction})
    }

    const handleClickButton = () => {
        let {listCategoryAction} = stateCategory
        listCategoryAction?.forEach(item => item.active = listCategoryPromotion.find(p => p.categoryID === item.category.categoryID))
        setStateCategory({...stateCategory,listCategoryAction: listCategoryAction})
        handleClickOpen()
    }

    const handleCloseModal = () => {
        let listCategoryAction = stateCategory.listCategoryAction;
        listCategoryAction?.map((o, index) => {
            let bool = false;
            listCategoryPromotion?.map((promotion) => {
                if (o.category.categoryID === promotion.categoryID) {
                    bool = true;
                }
            });
            o.active = bool;
        });
        setStateCategory({
            ...stateCategory,
            listCategoryAction: listCategoryAction,
        });
        handleClose();
    };

    return (
        <div style={{paddingLeft: "1rem"}}>
            {
                promotionScope === defaultPromotionScope.CATEGORY && (
                    <Button variant="contained" color="primary" style={{margin: "1rem 0"}} onClick={handleClickButton}>Chọn danh mục</Button>
                )
            }
            <Modal open={open} onClose={handleClose} className={styles.modal}>
                <div className={styles.modalBody}>
                    <h1 className={styles.headerModal}>Danh mục sản phẩm</h1>
                    <DialogContent className={styles.modalContent}>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Chọn</TableCell>
                                        <TableCell align="left">Tên danh mục</TableCell>
                                    </TableRow>
                                </TableHead>
                                {stateCategory.listCategoryAction?.length > 0 &&
                                stateCategory.listCategoryAction?.map(
                                    ({category, active}) => (
                                        <TableRow key={category?.categoryID}>
                                            <TableCell align="left">
                                                <input
                                                    style={{transform: "scale(1.5)"}}
                                                    checked={open === true ? active : false}
                                                    type="checkbox"
                                                    name="listTicketChecked"
                                                    color="primary"
                                                    onChange={(e) => handleActiveCategory(category, event)}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {limitText(category?.name, 50) || ""}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} variant="contained">
                            Hủy
                        </Button>
                        <Button onClick={() => {
                            handleAddCategoryPromotion(stateCategory.listCategoryAction)
                            resetItem()
                        }} color="primary" variant="contained" autoFocus>
                            Thêm
                        </Button>
                    </DialogActions>
                </div>
            </Modal>
            {promotionScope === defaultPromotionScope.CATEGORY ? (
                <Card>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tên danh mục</TableCell>
                                    <TableCell align="left">Hành Động</TableCell>
                                </TableRow>
                            </TableHead>
                            {listCategoryPromotion?.map((category) => (
                                <TableRow key={category?.code}>
                                    <TableCell align="center">{category.name}</TableCell>
                                    <TableCell align="left">
                                        <IconButton color="secondary" component="span" onClick={() => handleRemoveCategoryPromotion(category)}>
                                            <HighlightOffOutlinedIcon/>
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

export default RenderTableListCategory;
