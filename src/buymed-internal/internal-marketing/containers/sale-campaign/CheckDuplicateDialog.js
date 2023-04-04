import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Table,
    TableCell,
    Tab,
    Card
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import XLSX from "xlsx"

const CheckDuplicateDialog = ({
    open,
    onClose,
    list
}) => {

    const exportData = async () => {
        const dataExport = []
        list.map((item, index) => {
            dataExport.push({
                "STT": index + 1,
                "ID sản phẩm": item.product.productID,
                "Tên sản phẩm": item.product.name,
                "SKU": item.sku,
                "Lý do": item.message
            })
        })

        var ws = XLSX.utils.json_to_sheet(dataExport);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách sản phẩm");
        XLSX.writeFile(wb, "Danh_sach_san_pham_khong_hop_le.xlsx");
    }

    return (
        <Dialog open={open} scroll="body" fullWidth={true} onClose={onClose} maxWidth={"md"}>
            <DialogTitle id={"product-dialog-title"}>
                <Typography variant="h6" color="primary">Danh sách sản phẩm của CTKM không hợp lệ</Typography>
                <IconButton
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "1px",
                        right: "1px",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Card bordered={false} style={{ overflow: 'auto', maxHeight: '70vh', height: "auto" }}>
                <DialogContent dividers>
                    <TableContainer>
                        <Table>
                            <colgroup>
                                <col width="5%" />
                                <col />
                                <col />
                                <col />
                                <col width="30%" />

                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">STT</TableCell>
                                    <TableCell align="left" >Hình ảnh</TableCell>
                                    <TableCell align="left">ID - Tên sản phẩm</TableCell>
                                    <TableCell align="left">SKU</TableCell>
                                    <TableCell align="left">Lý do</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {list?.map((item, index) => (
                                    <TableRow key={item}>
                                        <TableCell align="left">{index + 1}</TableCell>
                                        <TableCell align="left">
                                            {item.product?.imageUrls?.length > 0 && (
                                                <img src={item.product?.imageUrls[0] || ""} width={70} height={70} style={{ objectFit: "contain" }} />
                                            )}
                                        </TableCell>
                                        <TableCell align="left">{item.product.productID} - {item.product.name}</TableCell>
                                        <TableCell align="left">{item.sku}</TableCell>
                                        <TableCell align="left">{item.message ?? ""}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Card>

            <DialogActions>
                <Button color="primary" variant="contained" onClick={() => exportData()}>Xuất file</Button>
                <Button onClick={onClose} variant="contained">Đóng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckDuplicateDialog;
