import { Typography, Grid, Button, FormHelperText, makeStyles, Chip, TextField, Tooltip, CircularProgress, InputAdornment, TableContainer, TableBody, Table, TableHead, TableCell, TableRow, IconButton, Checkbox } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card'
import { getCustomerClient } from 'client/customer'
import ModalCustom from '@thuocsi/nextjs-components/simple-dialog/dialogs'
import { useToast } from '@thuocsi/nextjs-components/toast/useToast'
import XLSX from 'xlsx';
import moment from 'moment'
import { FileCopy } from "@material-ui/icons";
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple'
import readXlsxFile from 'read-excel-file'
import LabelBox from '@thuocsi/nextjs-components/editor/label-box'
import PublishIcon from '@material-ui/icons/Publish';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { getVoucherClient } from 'client/voucher'
import { UserPromotionStatusValue } from 'components/promotion-voucher/constant'
import ApplicableCustomerItem from './ApplicableCustomerItem'
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single'
import { getOrderClient } from 'client/order'
import MyTablePagination from '@thuocsi/nextjs-components/my-pagination/my-pagination'

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

export async function searchCustomer(customerName) {
    return getCustomerClient().getCustomerFromClient(0, 10, JSON.stringify({ search: customerName }));
}

export default function ApplicableCustomer(props) {
    const classes = useStyles();

    const {
        voucher,
        listCustomerDefault = [],
        handleSearchCustomer,
        isViewOnly
    } = props;

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [isErrorExcel, setIsErrorExcel] = useState(false);
    const [listError, setListError] = useState([]);

    const [isLoading, setIsLoading] = useState(false)
    const [listUser, setListUser] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [total, setTotal] = useState(0)

    const [openModalImport, setOpenModalImport] = useState(false)
    const [file, setFile] = useState();
    const [listContent, setListContent] = useState([]);
    const [message, setMessage] = useState("")

    const [isChooseAll, setIsChooseAll] = useState(false)

    const [ids, setIds] = useState([]);
    const [count, setCount] = useState(0)

    let label = listUser?.length

    const toast = useToast()
    const { control, errors, getValues, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            customer: [],
            search: null
        }
    })

    const onSubmit = (formData) => {
        if (formData.customer?.length > 0) {
            let customerIds = formData.customer.map(item => (item.customerID))
            handleAddCustomer(customerIds)
            setValue("customer", [])
            setOpenModalAdd(false)
        }
    }

    const handleAddCustomer = async (customerIds, isImport = false) => {
        if (customerIds.length > 0) {
            const resp = await getVoucherClient().createUserVoucher({
                customerIds,
                voucherCode: voucher.code,
                status: UserPromotionStatusValue.ACTIVE,
            })
            if (resp.status === "OK") {
                toast.success(isImport ? "Import file thành công" : "Cập nhật khách hàng được sử dụng thành công")
                setPage(0)
                setValue("search", null)
                getListUserVoucher(null, limit, 0, true)
            } else if (resp.status === "EXISTED") {
                let customerIds = resp.data?.map(item => item.customerId)
                if (isImport && customerIds.length > 0) {
                    let newList = listError.concat(customerIds)
                    setListError(newList)
                    setIsErrorExcel(true);
                }
                toast.error(`Khách hàng ${customerIds.length > 20 ? customerIds.slice(0, 19).join(", ") : customerIds.join(", ")}... đã tồn tại`)
            } else {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại sau")
            }
        }
    };

    const handleDeteleAllCustomer = async (status) => {
        const resp = await getVoucherClient().updateUserVoucher({
            voucherCode: voucher.code,
            status,
            prevStatus: UserPromotionStatusValue.ACTIVE,
            isUpdateAll: true
        })
        if (resp.status === "OK") {
            toast.success("Cập nhật khách hàng được sử dụng thành công")
            setPage(0)
            setIsChooseAll(false)
            setIds([])
            setValue("search", null)
            getListUserVoucher(null, limit, 0, true)
        }
    }

    const handleUpdateCustomer = async (customerIds, status) => {
        let listCustomerIds = customerIds.length > 0 ? customerIds : (customerIds ? [customerIds] : [])
        if (listCustomerIds.length > 0) {
            const resp = await getVoucherClient().updateUserVoucher({
                customerIds: listCustomerIds,
                voucherCode: voucher.code,
                prevStatus: UserPromotionStatusValue.ACTIVE,
                status,
            })
            if (resp.status === "OK") {
                toast.success("Cập nhật khách hàng được sử dụng thành công")
                setPage(0)
                setIsChooseAll(false)
                setIds(ids.filter(item => !listCustomerIds.includes(item)))
                setValue("search", null)
                getListUserVoucher(null, limit, 0, true)
            }
        }
    }

    const handleCloseModalImport = () => {
        setOpenModalImport(false)
        setFile()
        setListContent([])
        setMessage()
    }

    const exportExample = () => {
        const fileName = `MauImportKhachHang.xlsx`

        var wb = XLSX.utils.book_new();

        const data = [
            { "ID": 4 },
            { "ID": 8 },
            { "ID": 7 },
            { "ID": 1 },
            { "ID": 49 },
        ]

        const new_sheet = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, new_sheet, "ID khach hang")
        XLSX.writeFile(wb, fileName);
    }

    const handleDocumentFile = async (event) => {
        const fileObj = event.target.files[0];
        setFile({ name: fileObj.name })
        let list = []
        let msg = ""

        let flag = 0
        await readXlsxFile(fileObj).then((rows) => {
            for (let row of rows) {
                if (flag !== 0) {
                    if (isNaN(row[0]) === true) {
                        msg = "File không đúng định dạng. ID phải là số lớn hơn 0";
                        break;
                    }
                    list.push(parseInt(row[0]))
                }
                if (flag === 0) flag++
            }
        })

        if (msg !== "") {
            setMessage(msg)
            return
        }

        setListContent(list)
    }

    const handleImport = async () => {
        if (listContent.length > 0) {
            let numbersFromExcel = [];
            let listIdFromExcel = [];
            let validDatas = [];
            let inValidDatas = [];
            let errors = [];

            var pattern = /^\d+$/;
            //Get numbers only
            listContent.map((id) => {
                if (!pattern.test(id)) {
                    errors.push(id);
                } else {
                    validDatas.push(id);
                    numbersFromExcel.push(id);
                }
            });
            const handleValidCusRes = async () => {
                const validCusRes = await getCustomerClient().getListByCustomerIds(
                    numbersFromExcel
                );

                if (validCusRes.status === 'OK') {
                    inValidDatas = await numbersFromExcel.filter(
                        (number) =>
                            !validCusRes.data.some(
                                ({ customerID: customerID }) => customerID === number
                            )
                    );
                    return inValidDatas;
                } else if (validCusRes.status === 'NOT_FOUND') {
                    numbersFromExcel.map((id) => {
                        errors.push(id);
                    });
                }
            };
            handleValidCusRes().then((result) => {
                if (result) {
                    result.forEach((invalidId) => {
                        errors.push(invalidId);
                    });
                    if (errors.length > listError.length) {
                        setListError(errors);
                        setIsErrorExcel(true);
                    }

                    validDatas.map((newId) => {
                        if (!errors.includes(newId)) listIdFromExcel.push(newId);
                    });

                    const dataImport = [...new Set(listIdFromExcel)]

                    handleAddCustomer(dataImport, true)
                } else {
                    toast.error("Import file không thành công");

                    setListError(errors);
                    setIsErrorExcel(true);
                }
            });

            handleCloseModalImport()
        }
    }

    const handleDownloadErrorFile = () => {
        const excelData = Array.from(new Set(listError)).map((id) => {
            let obj = {
                ID: id,
            };
            return obj;
        });

        let wb = XLSX.utils.book_new();
        wb.SheetNames.push(`data`);

        let ws = XLSX.utils.json_to_sheet(excelData);
        wb.Sheets[`data`] = ws;
        XLSX.writeFile(wb, `Danh sách id lỗi - ${moment().format('DD-MM-YYYY')}.xlsx`);
    };

    const getListUserVoucher = async (customerId = null, _limit = limit, _page = page, isDefault = false) => {
        if (voucher.customerApplyType === "ALL") return
        setIsLoading(true)
        const resp = await getVoucherClient().getUserVoucherList(_limit, _page * _limit, {
            voucherCode: voucher.code,
            customerId
        }, true)
        if (resp.status !== "OK") {
            setListUser([])
            setTotal(0)
            setIsLoading(false)
            if (isDefault) setCount(0)
            return
        }

        let customerIds = resp.data?.map(item => item.customerId)
        const customerResp = await getCustomerClient().getListByCustomerIds(customerIds)
        let customerMap = {}
        if (customerResp.status === "OK") {
            customerResp.data.forEach(item => {
                customerMap[item.customerID] = item
            })
        }
        let customers = resp.data?.map(item => ({
            ...item,
            name: customerMap[item.customerId]?.name || "",
            phone: customerMap[item.customerId]?.phone || "",
            code: customerMap[item.customerId]?.code || ""
        }))

        setListUser(customers)
        setTotal(resp?.total || 0)
        setIsLoading(false)
        if (isDefault) setCount(resp?.total || 0)

    }

    const handleChangePage = (page, rowsPerPage) => {
        setPage(page)
        setLimit(rowsPerPage)
        getListUserVoucher(getValues("search")?.value || null, rowsPerPage, page)
    }

    const handleReset = async () => {
        getListUserVoucher(null, 5, 0, true)
        setPage(0)
        setLimit(5)
        setIsErrorExcel(false)
        setListError([])
        reset()
    }

    useEffect(() => {
        getListUserVoucher(null, limit, page, true)
    }, [])

    useEffect(() => {
        if (ids.length > 0) {
            const dataCode = listUser.map(item => (item.customerId))
            let duplicate = ids.filter(item => {
                return dataCode.indexOf(item) !== -1
            })
            if (duplicate.length === limit) setIsChooseAll(true)
        }
    }, [listUser])

    return (
        <MyCard style={{ width: "100%" }}>
            <MyCardHeader title="Khách hàng được sử dụng" style={{
                textTransform: "uppercase",
                alignItems: "center"
            }} small>
                {voucher.customerApplyType !== "ALL" && (
                    <div style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center"
                    }}>

                        <Button
                            size="small"
                            variant="contained"
                            component="label"
                            style={{ marginRight: '8px' }}
                            onClick={handleReset}>
                            Làm mới
                        </Button>

                        {isErrorExcel && (
                            <>
                                <Button
                                    size="small"
                                    variant="contained"
                                    component="label"
                                    style={{ marginRight: '8px' }}
                                    onClick={handleDownloadErrorFile}
                                >
                                    Xuất file lỗi
                                </Button>
                            </>
                        )}

                        {!isViewOnly && (
                            <>
                                <Button
                                    size="small"
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    style={{ marginRight: '8px' }}
                                    onClick={() => setOpenModalAdd(true)}>
                                    Thêm khách hàng
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    onClick={() => setOpenModalImport(true)}
                                >
                                    Thêm khách hàng hàng loạt
                                </Button>

                            </>
                        )}

                    </div>
                )}
            </MyCardHeader>


            <MyCardContent>
                <Grid container spacing={2} style={{
                    justifyContent: "space-between",
                    alignItems: "end"
                }}>
                    {count > 0 && (
                        <React.Fragment>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    Tìm kiếm khách hàng trong danh sách
                                </Typography>

                                <MuiSingleAuto
                                    id="search"
                                    options={listCustomerDefault}
                                    name="search"
                                    onFieldChange={handleSearchCustomer}
                                    placeholder="Nhập ID/tên/số điện thoại khách hàng để tìm kiếm"
                                    control={control}
                                    errors={errors}
                                    message="Vui lòng chọn khách hàng"
                                    onValueChange={(value) => {
                                        setPage(0)
                                        getListUserVoucher(value?.customerID || null, limit, 0)
                                    }}
                                />
                            </Grid>

                            <Grid item>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Button variant='outlined' color="secondary" onClick={() => {
                                            setOpenModalDelete(true)
                                        }}>
                                            Xóa tất cả khách hàng
                                        </Button>
                                    </Grid>
                                    {
                                        ids?.length > 0 && (
                                            <Grid item>
                                                <Button variant='outlined' color="secondary" onClick={() => {
                                                    handleUpdateCustomer(ids, UserPromotionStatusValue.DELETED)
                                                }}>
                                                    Xóa khách hàng
                                                </Button>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Grid>

                        </React.Fragment>
                    )}

                    <Grid item xs={12}>
                        <TableContainer>
                            <Table size='small'>
                                <colgroup>
                                    <col width="10%" />
                                    <col width="20%" />
                                </colgroup>
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="left">
                                            <Tooltip title={`Chọn tất cả khách hàng (${label})`}>
                                                <Checkbox checked={isChooseAll} onChange={(e) => {
                                                    setIsChooseAll(e.target.checked)
                                                    let list = listUser.map(item => (item.customerId)) ?? []
                                                    if (e.target.checked === true) {
                                                        let newList = new Set(list.concat(ids))
                                                        setIds([...newList])
                                                    }
                                                    else {
                                                        let newList = ids?.filter(id => list.indexOf(id) === -1)
                                                        setIds(newList)
                                                    }

                                                }} />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">Khách hàng</TableCell>
                                        <TableCell align="left">Số lần đã sử dụng</TableCell>
                                        <TableCell align="left">Số lần sử dụng tối đa/khách hàng</TableCell>
                                        <TableCell align="left">Trạng thái</TableCell>
                                        <TableCell align="left">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <React.Fragment>
                                            {
                                                listUser.length > 0 && listUser.map((user, index) => {
                                                    return (
                                                        <ApplicableCustomerItem
                                                            key={user.customerId}
                                                            isChooseAll={isChooseAll}
                                                            setIds={setIds}
                                                            ids={ids}
                                                            user={user}
                                                            handleUpdateCustomer={handleUpdateCustomer}
                                                            voucher={voucher}
                                                            isViewOnly={isViewOnly}
                                                        />
                                                    )
                                                })
                                            }


                                            {
                                                (!listUser || listUser.length === 0) && (
                                                    <TableRow>
                                                        <TableCell align="center" colSpan={7}>
                                                            {getValues("search") ? "Không tìm thấy khách hàng" : (voucher.customerApplyType !== "ALL" ? "Chưa có khách hàng được sử dụng" : "Tất cả khách hàng thỏa mãn điều kiện của voucher đều có thể áp dụng")}

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </React.Fragment>
                                    )}



                                </TableBody>

                                <MyTablePagination
                                    labelUnit="khách hàng"
                                    count={total}
                                    rowsPerPage={limit}
                                    page={page}
                                    onChangePage={(e, page, rowsPerPage) => {
                                        setIsChooseAll(false)
                                        handleChangePage(page, rowsPerPage)
                                    }}
                                />
                            </Table>


                        </TableContainer>
                    </Grid>
                </Grid>


                <ModalCustom
                    title="Thêm khách hàng"
                    open={openModalAdd}
                    onClose={() => setOpenModalAdd(false)}
                    onExcute={handleSubmit(onSubmit)}
                    closeText="Đóng"
                    primaryText="Thêm"
                    maxWidth="md"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography gutterBottom>
                                Khách hàng:
                            </Typography>

                            <MuiMultipleAuto
                                id="customer"
                                options={[]}
                                name="customer"
                                onFieldChange={handleSearchCustomer}
                                placeholder="Nhập ID/tên/số điện thoại khách hàng để tìm kiếm"
                                control={control}
                                errors={errors}
                                message="Vui lòng chọn khách hàng"
                            // required
                            />
                        </Grid>
                    </Grid>
                </ModalCustom>


                <ModalCustom
                    title="Thêm khách hàng hàng loạt"
                    open={openModalImport}
                    onClose={handleCloseModalImport}
                    onExcute={handleImport}
                    closeText="Đóng"
                    primaryText="Thêm khách hàng"
                    maxWidth="md"
                >
                    <Grid container>
                        <Grid item md={12}>
                            <FormHelperText  >Chọn file danh sách ID khách hàng muốn thêm (định dạng .xlsx) <span>
                                <span onClick={exportExample} style={{
                                    textDecoration: "none",
                                    color: 'darkblue',
                                    cursor: 'pointer'
                                }}>(Tải file mẫu tại đây)</span>
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

                        <FormHelperText style={{ color: "red" }}>{message}</FormHelperText>
                    </Grid>
                </ModalCustom>

                <ModalCustom
                    title="Thông báo"
                    open={openModalDelete}
                    onClose={setOpenModalDelete}
                    onExcute={() => handleDeteleAllCustomer(UserPromotionStatusValue.DELETED)}
                    closeText="Đóng"
                    primaryText="Đồng ý"
                    maxWidth="xs"
                >
                    Bạn có chắc muốn xóa tất cả khách hàng được sử dụng?
                </ModalCustom>
            </MyCardContent>
        </MyCard>
    )
}
