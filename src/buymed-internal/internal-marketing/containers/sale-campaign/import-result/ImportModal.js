import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import LabelBox from "@thuocsi/nextjs-components/editor/label-box";
import PublishIcon from '@material-ui/icons/Publish';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileCopy } from "@material-ui/icons";
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Chip, makeStyles, DialogActions, FormHelperText, TableContainer, TableHead, TableRow, TableBody, TableCell, Table } from "@material-ui/core";
import readXlsxFile from 'read-excel-file';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import XLSX from "xlsx";
import Loader from '@thuocsi/nextjs-components/loader/loader';
import router from 'next/router';
import { getSaleCampaignClient } from 'client/saleCampaign';
import { ExportCSV } from 'components/export-cvs';
import { formatNumber, formatShortDateTime } from 'components/global';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles({
    chip: {
        borderRadius: 8,
        cursor: "pointer",
        margin: 5,
    },
    info: {
        padding: "10px"
    },
    button: {
        margin: "30px 0"
    },
    text: {
        fontWeight: "bold",
        fontSize: "16px",
        marginTop: "10px",
        display: "inline-block"
    }
});


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingTop: "5px",
        width: "100%"
    },
}))(MuiDialogContent);

export default function ModalImport({ open, onClose, data, listFlashsale }) {
    const classes = useStyles();

    const { error, info } = useToast();

    const [listContent, setListContent] = useState([]);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [duplicateSkus, setDuplicateSkus] = useState([])


    const handleClose = () => {
        setFile()
        setListContent([])
        onClose()
        setMessage()
        setDuplicateSkus([])
    }

    const handleDocumentFile = async (event) => {
        const fileObj = event.target.files[0];
        setFile({ name: fileObj.name })
        let list = []
        let msg = ""
        const skuMap = {}
        let listDuplicateSku = []
        await readXlsxFile(fileObj).then((rows) => {
            for (let row of rows) {
                if (row[0] !== "SKU" && row[1]?.length < 50) {
                    if (data?.saleType === "PERCENTAGE" && row[1] !== "PERCENTAGE") {
                        msg = "*Chương trình KM có hình thức khuyến mãi mặc định là: PERCENTAGE";
                        break
                    }

                    if (data?.saleType === "ABSOLUTE" && row[1] !== "ABSOLUTE") {
                        msg = "*Chương trình KM có hình thức khuyến mãi mặc định là: ABSOLUTE";
                        break
                    }

                    if (data?.saleType === "PRICE" && row[1] !== "PRICE") {
                        msg = "*Chương trình KM có hình thức khuyến mãi mặc định là: PRICE";
                        break
                    }

                    if ((row[1] === "PERCENTAGE" || data?.saleType === "PERCENTAGE") && (Number(row[2]) < 0 || Number(row[2]) > 100)) {
                        msg = "*Phần trăm giảm giá phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100"
                        break
                    }

                    if (data?.saleType === "PERCENTAGE" && data?.reward?.percentageDiscount !== 0 && Number(row[2] ?? 0) < data?.reward?.percentageDiscount) {
                        msg = `*Phần trăm giảm giá phải lớn hơn hoặc bằng ${data?.reward?.percentageDiscount}`
                        break;
                    }

                    if (data?.saleType === "ABSOLUTE" && data?.reward?.absoluteDiscount !== 0 && Number(row[2] ?? 0) < data?.reward?.absoluteDiscount) {
                        msg = `*Số tiền giảm giá phải lớn hơn hoặc bằng ${data?.reward?.absoluteDiscount}`
                        break;
                    }

                    if (row[1] === "PRICE" && (Number(row[2] ?? 0) < 1 || Number(row[2] ?? 0) > 1000000000)) {
                        msg = `*Giá sản phẩm sau KM không được nhỏ hơn 1 và lớn hơn 1,000,000,000đ`
                        break;
                    }

                    if (isNaN(row[2]) === true) {
                        msg = "*Phần trăm giảm/Số tiền giảm/Giá sau KM phải là số và lớn hơn hoặc bằng 0";
                        break;
                    }

                    if (isNaN(row[3]) === true) {
                        msg = "*Số lượng bán ra phải là số và lớn hơn 0";
                        break;
                    }

                    if (isNaN(row[4]) === true) {
                        msg = "*Giới hạn mua phải là số và lớn hơn hoặc bằng 0";
                        break;
                    }

                    const sku = row[0] ?? null

                    const discount = Number(row[2]) === 0 ? null : Number(row[2])

                    if (!Number.isInteger(discount)) {
                        msg = "*% giảm/số tiền giảm/giá sau KM phải là số nguyên";
                        break;
                    }
                    let item = {
                        sku: row[0] ?? null,
                        saleType: data?.saleType !== "UNLIMIT" ? data.saleType : (row[1] ?? null),
                        percentageDiscount: row[1] === "PERCENTAGE" ? discount : null,
                        absoluteDiscount: row[1] === "ABSOLUTE" ? discount : null,
                        campaignPrice: row[1] === "PRICE" ? discount : null,
                        quantity: Number(row[3] ?? 0),
                        maxQuantityPerOrder: Number(row[4] ?? 0),
                        campaignCode: data?.campaignCode || "",
                        campaignID: data?.campaignID || 0,
                        chargeFee: "MARKETPLACE"
                    }

                    const new_item = data?.campaignType === "FLASH_SALE" ? {
                        ...item,
                        flashSaleTimeRefs: row[5]?.replace(/\s+/g, '')?.split(",").map(String) ?? [],
                    } : item

                    list.push(new_item)

                    if (skuMap[sku]?.sku) {
                        listDuplicateSku.push(new_item)
                        listDuplicateSku.push(skuMap[sku])
                    }
                    else {
                        skuMap[sku] = new_item
                    }
                }
            }
        })

        if (listDuplicateSku?.length > 0) {
            setDuplicateSkus(listDuplicateSku)
            setMessage("*SKU bị trùng")
            return
        }

        if (msg !== "") {
            setMessage(msg)
            return
        }
        if (list.length > 1000) {
            setMessage("*Import tối đa 1000 dòng")
            return
        }

        setListContent(list)

    }

    const handleOnSubmit = async () => {
        if (listContent.length === 0) return error(!!file ? "Vui lòng chọn file theo đúng định dạng" : "Vui lòng chọn file");
        setLoading(true)
        const res = await getSaleCampaignClient().importCampaignProduct(listContent, data?.campaignCode);
        if (res.status === "OK" && res.data?.[0]) {
            info("Import đang được xử lý");
            setLoading(false)
            handleClose()
            router.push(`/marketing/detail-import-result-sale-campaign?code=${res.data?.[0]?.code || ""}`)
        } else {
            error(res.status === "INVALID" ? "Vui lòng chọn file theo đúng định dạng" : res.message);
        }
        setLoading(false)
    }

    const exportExcel = () => {

        if (data.campaignType === "FLASH_SALE") {
            const fileName = `Ma_Khung_Gio_KM_#${data.campaignName}.xlsx`

            var wb = XLSX.utils.book_new();

            const flashsale = listFlashsale?.map(item => ({
                "Mã khung giờ": item.value,
                "Khung giờ khuyến mãi": item.label
            })) ?? []

            const new_sheet = XLSX.utils.json_to_sheet(flashsale)
            XLSX.utils.book_append_sheet(wb, new_sheet, "Khung giờ KM")
            XLSX.writeFile(wb, fileName);
        }
    }

    const csvData = async () => {

        const dataExport = duplicateSkus.map(item => ({
            'SKU': item.sku,
            'Hình thức khuyến mãi': item.saleType ?? "",
            '% giảm/số tiền giảm': item.saleType === "ABSOLUTE" ? (item.absoluteDiscount ?? "") : (item.saleType === "PERCENTAGE" ? (item.percentageDiscount ?? "") : (item.campaignPrice ?? "")),
            'Số lượng bán ra': item.quantity,
            'Giới hạn mua': item.maxQuantityPerOrder || "100000",
            'Khung giờ': item.flashSaleTimeRefs?.map(time => time)?.join(", ") ?? "",
            // 'Bên chịu phí': item.chargeFee,
        }))

        return dataExport;
    };

    const displayPrice = (row) => {
        switch (row.saleType) {
            case "PERCENTAGE":
                return row.percentageDiscount + "%"
            case "ABSOLUTE":
                return `${formatNumber(row.absoluteDiscount)} đ`
            case "PRICE":
                return `${formatNumber(row.campaignPrice)} đ`
            default:
                return "-";
        }
    }

    return (
        <Dialog onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                onClose();
            }
        }} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                THÊM SẢN PHẨM HÀNG LOẠT
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item md={9}>
                        <FormHelperText  >Chọn file danh sách sản phẩm muốn thêm (định dạng .xlsx) <span>
                            <a href='/File_Mau_Import_San_Pham.xlsx' style={{
                                textDecoration: "none",
                                color: 'darkblue',
                            }}>(Tải file mẫu tại đây)</a>
                        </span></FormHelperText>
                        <LabelBox padding={1}>
                            {file?.name ? <>
                                <Chip
                                    className={classes.chip}
                                    icon={<FileCopy fontSize="small" />}
                                    label={file.name}
                                />
                                &nbsp;&nbsp;
                                <FontAwesomeIcon style={{ color: "red", cursor: "pointer" }}
                                    onClick={
                                        () => {
                                            setListContent([])
                                            setFile();
                                            setMessage("")
                                            setDuplicateSkus([])
                                        }
                                    }
                                    icon={faTrash}
                                />
                            </> :
                                (<label htmlFor="documentFiles" style={{ fontSize: "11px" }}>
                                    <input
                                        style={{ display: "none" }}
                                        id="documentFiles"
                                        onClick={e => e.target.value = ""}
                                        onChange={handleDocumentFile}
                                        type="file"
                                        accept=".xlsx"
                                    />
                                    <Button variant="contained" component="span" style={{ marginBottom: "5px" }}>
                                        <PublishIcon fontSize="inherit" /> Chọn file
                                    </Button>
                                </label>)}

                        </LabelBox>

                    </Grid>

                    <Grid item md={3} style={{ paddingLeft: "30px" }}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleOnSubmit}>Thêm sản phẩm</Button>
                    </Grid>

                    <FormHelperText style={{ color: "red" }}>{message}</FormHelperText>

                    <Grid item xs={12}>

                        {data?.saleType !== "UNLIMIT" && (
                            <p style={{ color: "blue" }}>Chương trình khuyến mãi này có hình thức khuyến mãi mặc định là: {data?.saleType}</p>
                        )}
                        {data?.campaignType === "FLASH_SALE" && (
                            <p>Xem thông tin mã khung giờ khuyến mãi tại đây: <span style={{
                                cursor: "pointer",
                                color: 'darkblue',
                            }} onClick={exportExcel}>
                                Ma_Khung_Gio_KM
                            </span></p>
                        )}
                    </Grid>

                    {duplicateSkus.length > 0 && (
                        <Grid item xs={12}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography><strong>Danh sách SKU bị trùng</strong></Typography>
                                <ExportCSV csvData={csvData} fileName={`Danh_sach_SKU_trung#${file?.name}`} color="" />
                            </div>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">
                                                STT
                                            </TableCell>
                                            <TableCell align="left">
                                                SKU
                                            </TableCell>
                                            <TableCell align="left">
                                                Hình thức KM
                                            </TableCell>
                                            <TableCell align="left">
                                                % Giảm/
                                                <br />
                                                Số tiền giảm/
                                                <br />
                                                Giá sau KM
                                            </TableCell>
                                            <TableCell align="left">
                                                Số lượng
                                                <br />
                                                bán ra
                                            </TableCell>
                                            <TableCell align="left">
                                                Giới hạn mua
                                            </TableCell>

                                            {data.campaignType === "FLASH_SALE" && (
                                                <TableCell align="left">
                                                    Khung giờ
                                                </TableCell>
                                            )}

                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {duplicateSkus?.map((row, index) => (
                                            <TableRow>
                                                <TableCell align="left">
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell align="left">
                                                    {row.sku}
                                                </TableCell>

                                                <TableCell align="left">
                                                    {row.saleType}
                                                </TableCell>


                                                <TableCell align="left">
                                                    {displayPrice(row)}
                                                </TableCell>


                                                <TableCell align="left">
                                                    {row.quantity}
                                                </TableCell>

                                                <TableCell align="left">
                                                    {row.maxQuantityPerOrder}
                                                </TableCell>

                                                {data.campaignType === "FLASH_SALE" && (
                                                    <TableCell align="left">
                                                        {row.flashSaleTimeRefs?.map(time => time)?.join(", ") ?? ""}
                                                    </TableCell>
                                                )}

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}



                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </DialogActions>
            {loading ? <Loader show={true} /> : <></>}

        </Dialog>
    );
}